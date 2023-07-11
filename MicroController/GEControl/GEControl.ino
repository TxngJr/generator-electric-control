#include <ZMPT101B.h>
#include <WiFi.h>
#include <WiFiManager.h>

#define READ_AC_PRIMARY_PIN 34
#define READ_AC_SECONDARY_PIN 35
#define CONTROL_AC_PRIMARY_PIN 32
#define CONTROL_AC_SECONDARY_PIN 33
#define CONTROL_START_SECONDARY_PIN 25
#define MODE_AUTO_PIN 27
#define MODE_MANUAL_PIN 14
#define MODE_AC_PRIMARY_PIN 12
#define MODE_AC_SECONDARY_PIN 13
#define SENSITIVITY 500.0f
#define POWER_OUTAGE_VALUE 200

ZMPT101B readACPrimary(READ_AC_PRIMARY_PIN, 50.0);
ZMPT101B readACSecondary(READ_AC_SECONDARY_PIN, 50.0);

bool isCountTime = false;
bool isACPrimary = true;
const int taskDelay = 1000;
TaskHandle_t taskHandle = NULL;

void setup() {
  Serial.begin(115200);

  readACPrimary.setSensitivity(SENSITIVITY);
  readACSecondary.setSensitivity(SENSITIVITY);

  pinMode(CONTROL_AC_PRIMARY_PIN, OUTPUT);
  pinMode(CONTROL_AC_SECONDARY_PIN, OUTPUT);
  pinMode(CONTROL_START_SECONDARY_PIN, OUTPUT);

  pinMode(MODE_AUTO_PIN, INPUT);
  pinMode(MODE_MANUAL_PIN, INPUT);
  pinMode(MODE_AC_PRIMARY_PIN, INPUT);
  pinMode(MODE_AC_SECONDARY_PIN, INPUT);

  xTaskCreate(
    taskVeriflyIsPowerOutage,
    "VeriflyIsPowerOutageTask",
    2000,
    NULL,
    1,
    &taskHandle);
  xTaskCreate(
    taskSentData,
    "SentDataTask",
    5000,
    NULL,
    2,
    &taskHandle);
}

void loop() {
  while (!digitalRead(MODE_AUTO_PIN)) {
    if (isACPrimary) {
      digitalWrite(CONTROL_AC_PRIMARY_PIN, HIGH);
      digitalWrite(CONTROL_AC_SECONDARY_PIN, LOW);
    } else {
      digitalWrite(CONTROL_AC_PRIMARY_PIN, LOW);
      digitalWrite(CONTROL_AC_SECONDARY_PIN, HIGH);
    }
  }
  while (!digitalRead(MODE_MANUAL_PIN)) {
    while (!digitalRead(MODE_AC_PRIMARY_PIN)) {
      // while (readACSecondary.getRmsVoltage() > POWER_OUTAGE_VALUE) {}
      digitalWrite(CONTROL_START_SECONDARY_PIN, LOW);  //????????????????????????????????
      digitalWrite(CONTROL_AC_PRIMARY_PIN, HIGH);
      digitalWrite(CONTROL_AC_SECONDARY_PIN, LOW);
    }
    while (!digitalRead(MODE_AC_SECONDARY_PIN)) {
      // while (readACSecondary.getRmsVoltage() < POWER_OUTAGE_VALUE) {}
      digitalWrite(CONTROL_START_SECONDARY_PIN, HIGH);  //????????????????????????????????
      digitalWrite(CONTROL_AC_PRIMARY_PIN, LOW);
      digitalWrite(CONTROL_AC_SECONDARY_PIN, HIGH);
    }
  }
}

void taskVeriflyIsPowerOutage(void *pvParameters) {
  unsigned long previousMillis = 0;
  while (1) {
    while (!digitalRead(MODE_AUTO_PIN)) {
      if (isACPrimary) {
        if (readACPrimary.getRmsVoltage() < POWER_OUTAGE_VALUE) {
          isCountTime = true;
          // while (readACSecondary.getRmsVoltage() < POWER_OUTAGE_VALUE) {}
          digitalWrite(CONTROL_START_SECONDARY_PIN, HIGH);  //????????????????????????????????????????????????????
        }
      } else {
        if (readACPrimary.getRmsVoltage() > POWER_OUTAGE_VALUE) {
          isCountTime = true;
        }
      }
      while (isCountTime) {
        if ((millis() - previousMillis) >= 180000) {
          if (readACPrimary.getRmsVoltage() < POWER_OUTAGE_VALUE) {
            isACPrimary = false;
          } else {
            // while (readACSecondary.getRmsVoltage() > POWER_OUTAGE_VALUE) {}
            digitalWrite(CONTROL_START_SECONDARY_PIN, LOW);  //????????????????????????????????????????????????????
            isACPrimary = true;
          }
          isCountTime = false;
          previousMillis = millis();
          return;
        }
      }
    }
  }
}

void taskSentData(void *pvParameters) {
  unsigned long previousMillis = 0;
  WiFi.mode(WIFI_STA);
  WiFiManager wm;
  bool res;
  res = wm.autoConnect("Test", "12345678");
  while (!res) {
    Serial.println("Failed to connect");
    ESP.restart();
  }
  Serial.println("connect success");

  while (1) {
    Serial.println("hello");


    vTaskDelay(taskDelay / 2);
  }
}
