#include <PZEM004Tv30.h>

#define PZEM_SERIAL Serial2
#define READ_AC_RX_PIN 16
#define READ_AC_TX_PIN 17
#define CONTROL_AC_PRIMARY_LINE_PIN 32
#define CONTROL_AC_PRIMARY_NEUTRAL_PIN 34
#define CONTROL_AC_SECONDARY_LINE_PIN 33
#define CONTROL_AC_SECONDARY_NEUTRAL_PIN 35
#define CONTROL_START_SECONDARY_PIN 25
#define ON_SECONDARY_PIN 26
#define MODE_AUTO_PIN 27
#define MODE_MANUAL_PIN 14
#define MODE_AC_PRIMARY_PIN 12
#define MODE_AC_SECONDARY_PIN 13
#define POWER_OUTAGE_VALUE 200

PZEM004Tv30 readACPrimary(PZEM_SERIAL, READ_AC_RX_PIN, READ_AC_TX_PIN, 0x01);
PZEM004Tv30 readACSecondary(PZEM_SERIAL, READ_AC_RX_PIN, READ_AC_TX_PIN, 0x02);

bool isCountTime = false;
bool isACPrimary = true;
unsigned long previousMillis = 0;

TaskHandle_t taskVeriflyIsPowerOutage;

void setup() {
  Serial.begin(115200);


  pinMode(CONTROL_AC_PRIMARY_LINE_PIN, OUTPUT);
  pinMode(CONTROL_AC_PRIMARY_NEUTRAL_PIN, OUTPUT);
  pinMode(CONTROL_AC_SECONDARY_LINE_PIN, OUTPUT);
  pinMode(CONTROL_AC_SECONDARY_NEUTRAL_PIN, OUTPUT);
  pinMode(CONTROL_START_SECONDARY_PIN, OUTPUT);
  pinMode(ON_SECONDARY_PIN, OUTPUT);

  pinMode(MODE_AUTO_PIN, INPUT);
  pinMode(MODE_MANUAL_PIN, INPUT);
  pinMode(MODE_AC_PRIMARY_PIN, INPUT);
  pinMode(MODE_AC_SECONDARY_PIN, INPUT);

  // xTaskCreate(
  //   taskVeriflyIsPowerOutageFunction,
  //   "VeriflyIsPowerOutageTask",
  //   2000,
  //   NULL,
  //   1,
  //   &taskVeriflyIsPowerOutage);
}

void loop() {
  while (digitalRead(MODE_AUTO_PIN)) {
      if (isACPrimary) {
        if (readACPrimary.voltage() < POWER_OUTAGE_VALUE) {
          isCountTime = true;
          digitalWrite(ON_SECONDARY_PIN, LOW);  //????????????????????????????????
          while (readACSecondary.voltage() < POWER_OUTAGE_VALUE) {
            digitalWrite(CONTROL_START_SECONDARY_PIN, HIGH);  //????????????????????????????????
          }
          digitalWrite(CONTROL_START_SECONDARY_PIN, LOW);
          previousMillis = millis();
        }
      } else {
        if (readACPrimary.voltage() > POWER_OUTAGE_VALUE) {
          isCountTime = true;
          previousMillis = millis();
        }
      }
      while (isCountTime) {
        if ((millis() - previousMillis) >= 15000) {  //180000
          if (readACPrimary.voltage() < POWER_OUTAGE_VALUE) {
            isACPrimary = false;
          } else {
            digitalWrite(ON_SECONDARY_PIN, HIGH);  //????????????????????????????????
            while (readACSecondary.voltage() > POWER_OUTAGE_VALUE) {
              digitalWrite(CONTROL_START_SECONDARY_PIN, LOW);  //????????????????????????????????
            }
            isACPrimary = true;
          }
          isCountTime = false;
        }
      }

    if (isACPrimary) {
      digitalWrite(CONTROL_AC_PRIMARY_LINE_PIN, HIGH);
      digitalWrite(CONTROL_AC_PRIMARY_NEUTRAL_PIN, HIGH);
      digitalWrite(CONTROL_AC_SECONDARY_LINE_PIN, LOW);
      digitalWrite(CONTROL_AC_SECONDARY_NEUTRAL_PIN, LOW);
    } else {
      digitalWrite(CONTROL_AC_PRIMARY_LINE_PIN, LOW);
      digitalWrite(CONTROL_AC_PRIMARY_NEUTRAL_PIN, LOW);
      digitalWrite(CONTROL_AC_SECONDARY_LINE_PIN, HIGH);
      digitalWrite(CONTROL_AC_SECONDARY_NEUTRAL_PIN, HIGH);
    }
  }
  while (digitalRead(MODE_MANUAL_PIN)) {
    while (digitalRead(MODE_AC_PRIMARY_PIN)) {
      digitalWrite(ON_SECONDARY_PIN, HIGH);  //????????????????????????????????
      while (readACSecondary.voltage() > POWER_OUTAGE_VALUE) {
        digitalWrite(CONTROL_START_SECONDARY_PIN, LOW);  //????????????????????????????????
      }

      digitalWrite(CONTROL_AC_PRIMARY_LINE_PIN, HIGH);
      digitalWrite(CONTROL_AC_PRIMARY_NEUTRAL_PIN, HIGH);
      digitalWrite(CONTROL_AC_SECONDARY_LINE_PIN, LOW);
      digitalWrite(CONTROL_AC_SECONDARY_NEUTRAL_PIN, LOW);
    }
    while (digitalRead(MODE_AC_SECONDARY_PIN)) {
      digitalWrite(ON_SECONDARY_PIN, LOW);  //????????????????????????????????
      while (readACSecondary.voltage() < POWER_OUTAGE_VALUE) {
        digitalWrite(CONTROL_START_SECONDARY_PIN, HIGH);  //????????????????????????????????
      }
      digitalWrite(CONTROL_START_SECONDARY_PIN, LOW);

      digitalWrite(CONTROL_AC_PRIMARY_LINE_PIN, LOW);
      digitalWrite(CONTROL_AC_PRIMARY_NEUTRAL_PIN, LOW);
      digitalWrite(CONTROL_AC_SECONDARY_LINE_PIN, HIGH);
      digitalWrite(CONTROL_AC_SECONDARY_NEUTRAL_PIN, HIGH);
    }
  }
}

// void taskVeriflyIsPowerOutageFunction(void *pvParameters) {
//   unsigned long previousMillis = 0;
//   for (;;) {
//     while (digitalRead(MODE_AUTO_PIN)) {
//       if (isACPrimary) {
//         if (readACPrimary.voltage() < POWER_OUTAGE_VALUE) {
//           isCountTime = true;
//           digitalWrite(ON_SECONDARY_PIN, LOW);  //????????????????????????????????
//           while (readACSecondary.voltage() < POWER_OUTAGE_VALUE) {
//             digitalWrite(CONTROL_START_SECONDARY_PIN, HIGH);  //????????????????????????????????
//           }
//           digitalWrite(CONTROL_START_SECONDARY_PIN, LOW);
//           previousMillis = millis();
//         }
//       } else {
//         if (readACPrimary.voltage() > POWER_OUTAGE_VALUE) {
//           isCountTime = true;
//           previousMillis = millis();
//         }
//       }
//       while (isCountTime) {
//         if ((millis() - previousMillis) >= 15000) {  //180000
//           if (readACPrimary.voltage() < POWER_OUTAGE_VALUE) {
//             isACPrimary = false;
//           } else {
//             digitalWrite(ON_SECONDARY_PIN, HIGH);  //????????????????????????????????
//             while (readACSecondary.voltage() > POWER_OUTAGE_VALUE) {
//               digitalWrite(CONTROL_START_SECONDARY_PIN, LOW);  //????????????????????????????????
//             }
//             isACPrimary = true;
//           }
//           isCountTime = false;
//         }
//       }
//       vTaskDelay(1 / portTICK_PERIOD_MS);
//     }
//     vTaskDelay(1 / portTICK_PERIOD_MS);
//   }
// }
