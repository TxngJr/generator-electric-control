#include <Preferences.h>
#include <WiFi.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>

WiFiServer server(80);
Preferences preferences;

TaskHandle_t taskSentData;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);

  xTaskCreate(
    taskSentDataFunction,
    "SentDataTask",
    5000,
    NULL,
    2,
    &taskSentData);
}

void taskSentDataFunction(void *pvParameters) {
  preferences.begin("GECValue", false);
  // preferences.clear();
  static String ssid = preferences.getString("ssid", "");
  static String password = preferences.getString("password", "");
  static String token = preferences.getString("token", "");
  static const String serverName = "http://swapsjobs.3bbddns.com:36889/";
  //-------------------------------------------------------
  Serial.println(ssid);
  Serial.println(password);
  Serial.println(token);
  //-------------------------------------------------------
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid.c_str(), password.c_str());
  while (WiFi.status() != WL_CONNECTED || token == "") {
    static int count = 0;
    static int previousCount = count;

    bool isLogin = token != "" ? true : false;
    bool isConnectWiFi = WiFi.status() == WL_CONNECTED ? true : false;


    //-------------------------------------------------------
    Serial.print(isConnectWiFi);
    Serial.print(isLogin);
    Serial.println("-----------------------");
    Serial.println(count);

    //-------------------------------------------------------

    vTaskDelay(1000 / portTICK_PERIOD_MS);

    //-------------------------------------------------------
    if ((count == previousCount + 8 )&& (!isConnectWiFi || !isLogin)) {
      previousCount = count;
      unsigned long currentTime = millis();
      unsigned long previousTime = currentTime;
      const long timeoutTime = 2000;
      bool isWebServer = true;
      String header;
      static const String ssidAP = "GEControl";
      static const String passwordAP = "12345678";
      WiFi.disconnect(true);
      WiFi.mode(WIFI_AP);
      WiFi.softAP(ssidAP.c_str(), passwordAP.c_str());
      server.begin();
      //-------------------------------------------------------
      IPAddress apIP = WiFi.softAPIP();
      Serial.print("AP IP address: ");
      Serial.println(apIP);
      //-------------------------------------------------------
      while (isWebServer) {
        WiFiClient client = server.available();
        if (client && isWebServer) {
          currentTime = millis();
          previousTime = currentTime;
          String currentLine = "";
          while (client.connected() && currentTime - previousTime <= timeoutTime) {
            currentTime = millis();
            if (client.available()) {
              char c = client.read();
              header += c;
              if (c == '\n') {
                if (currentLine.length() == 0) {
                  if (header.indexOf("POST /configwifi") >= 0) {
                    String data = client.readStringUntil('\r');
                    int startPos = 0;
                    int separatorPos, equalPos;
                    String microControllerName = "";
                    String usernameLogin = "";
                    String passwordLogin = "";
                    while (startPos < data.length()) {
                      separatorPos = data.indexOf('&', startPos);
                      if (separatorPos == -1) {
                        separatorPos = data.length();
                      }
                      equalPos = data.indexOf('=', startPos);
                      if (equalPos == -1 || equalPos > separatorPos) {
                        startPos = separatorPos + 1;
                        continue;
                      }
                      String key = data.substring(startPos, equalPos);
                      String value = data.substring(equalPos + 1, separatorPos);
                      value.replace("+", " ");
                      if (!isConnectWiFi) {
                        if (key == "ssid") {
                          ssid = value;
                          preferences.putString("ssid", value);
                        } else if (key == "password") {
                          password = value;
                          preferences.putString("password", value);
                        }
                      }
                      if (!isLogin) {
                        if (key == "microControllerName") {
                          microControllerName = value;
                        } else if (key == "usernameLogin") {
                          usernameLogin = value;
                        } else if (key == "passwordLogin") {
                          passwordLogin = value;
                        }
                      }
                      startPos = separatorPos + 1;
                    }
                    if (!isConnectWiFi && ssid != "" && password != "") {
                      WiFi.disconnect(true);
                      WiFi.mode(WIFI_STA);
                      WiFi.begin(ssid.c_str(), password.c_str());
                      while (WiFi.status() != WL_CONNECTED) {
                        static int count = 0;
                        count++;
                        vTaskDelay(1000 / portTICK_PERIOD_MS);
                        Serial.print(".");
                        if (count == 10) {
                          break;
                        }
                      }
                      isConnectWiFi = true;
                    }
                    if (!isLogin && isConnectWiFi && usernameLogin != "" && passwordLogin != "") {
                      const size_t capacity = JSON_OBJECT_SIZE(3);
                      DynamicJsonDocument jsonDoc(capacity);
                      jsonDoc["microControllerName"] = microControllerName;
                      jsonDoc["username"] = usernameLogin;
                      jsonDoc["password"] = passwordLogin;

                      String jsonString;
                      serializeJson(jsonDoc, jsonString);

                      HTTPClient http;

                      String serverPath = serverName + "micro_controller/register";
                      http.begin(serverPath.c_str());
                      http.addHeader("Content-Type", "application/json");

                      int httpResponseCode = http.POST(jsonString);

                      if (httpResponseCode == HTTP_CODE_OK) {
                        String response = http.getString();

                        DynamicJsonDocument jsonDoc(1);
                        DeserializationError error = deserializeJson(jsonDoc, response);

                        if (error) {
                          Serial.print("Failed to parse JSON: ");
                          Serial.println(error.c_str());
                        } else {
                          String token = jsonDoc["token"];
                          preferences.putString("token", token);
                        }
                      } else {
                        Serial.print("Error occurred while sending data: ");
                      }
                      http.end();
                    }
                    server.end();
                    isWebServer = false;
                  }
                  client.println("HTTP/1.1 200 OK");
                  client.println("Content-type:text/html");
                  client.println("Connection: close");
                  client.println();
                  client.println("<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\">");
                  client.println("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><title>ConfigWiFi</title>");
                  client.println("<style>body {padding-left: 5%;padding-right: 5%;margin: 0;box-sizing: border-box;background-color: #F5F8FF;}");
                  client.println("input[type=\"text\"] {width: 100%;height: 40px;padding: 12px 20px;margin: 8px 0;box-sizing: border-box;border-radius: 10px;border: 1px solid #ccc;font-size: 16px;}");
                  client.println("input[type=\"submit\"] {border: none;cursor: pointer;width: 100%;margin-top: 5%;height: 40px;width: 100%;box-sizing: border-box;border-radius: 10px;background-color: #73CFF6;font-size: 26px;transition: background-color 0.3s ease;}");
                  client.println("input[type=\"submit\"]:active {background-color: #51b7e2;}</style></head>");
                  client.println("<body><div style=\"display: flex;justify-content: center;align-items: center;padding-top: 10%;padding-left: 10%;padding-right: 10%;\">");
                  //-------------------------------------------------------DDDD
                  client.println("</div>");
                  client.println("<div style=\"display: flex; justify-content: flex-start;\"><span style=\"font-size: 32px;\">การตั้งค่า</span></div>");
                  client.println("<form method=\"post\" action=\"/configwifi\" style=\"display: flex;align-items: center;justify-content: center;flex-direction: column;\">");
                  if (!isConnectWiFi) {
                    client.println("<span style=\"font-size: 26px;\">เชื่อมต่อ WiFi</span>");
                    client.println("<select style=\"width: 100%;height: 48px;padding: 12px 20px;margin: 8px 0;box-sizing: border-box;border-radius: 10px;border: 1px solid #ccc;font-size: 16px;\" name=\"ssid\" id=\"ssid\" class=\"inputContainerText\">");
                    String networksList = "";
                    int numNetworks = WiFi.scanNetworks();
                    for (int i = 0; i < numNetworks; i++) {
                      client.println("<option value=\"" + WiFi.SSID(i) + "\">" + WiFi.SSID(i) + "</option>");
                    }
                    client.println("</select>");
                    client.println("<input type=\"text\" name=\"password\" id=\"password\" placeholder=\"password\" />");
                  }
                  if (!isLogin) {
                    client.println("<span style=\"font-size: 26px;\">เข้าสู่ระบบ</span>");
                    client.println("<input type=\"text\" name=\"microControllerName\" id=\"microControllerName\" placeholder=\"ตั้งชื่อเครื่อง\" />");
                    client.println("<input type=\"text\" name=\"usernameLogin\" id=\"usernameLogin\" placeholder=\"ชื่อผู้ใช้\" />");
                    client.println("<input type=\"text\" name=\"passwordLogin\" id=\"passwordLogin\" placeholder=\"รหัสผ่าน\" />");
                  }
                  client.println("<input type=\"submit\" value=\"submit\" />");
                  client.println("</form></body></html>");
                  client.println();
                  break;
                } else {
                  currentLine = "";
                }
              } else if (c != '\r') {
                currentLine += c;
              }
            }
          }
          header = "";
          client.stop();
        }
        vTaskDelay(1 / portTICK_PERIOD_MS);
      }
    }
    count++;
  }
  preferences.end();
  for (;;) {
    Serial.println("Good");
    vTaskDelay(1 / portTICK_PERIOD_MS);
  }

  // unsigned long previousMillis = 0;
  // WiFi.mode(WIFI_STA);
  // WiFiManager wm;
  // bool res;
  // res = wm.autoConnect("Test", "12345678");
  // while (!res) {
  //   Serial.println("Failed to connect");
  //   ESP.restart();
  // }
  // Serial.println("connect success");

  for (;;) {
    Serial.println("hello");


    vTaskDelay(1 / portTICK_PERIOD_MS);
  }
}

void loop() {
  // put your main code here, to run repeatedly:
}