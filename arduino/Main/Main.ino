#include <WiFi.h>
#include <WebServer.h>
#include <string>
#include <sstream>
#include "FFT.h"
#include "FFT_signal.h"
#define BAND 115200 // Escolha a frequência

String packet;

const int RelePin = 23; // pino ao qual o Módulo Relé está conectado
const int zmptPin = 13; // pino ZMPT
const int acsPin = 12; // pino acs
const int ssrPin = 2;
const int potPin = 37;
const float vref = 3.3;
const float resolution = 4095.0;
String statusRele = "OFF"; // variavel para ler dados recebidos pela serial
String off = "OFF";

fft_config_t *real_fft_plan = fft_init(FFT_N, FFT_REAL, FFT_FORWARD, fft_input, fft_output);

float getCurrent()
{
  int adc = analogRead(acsPin);
  float voltage = adc * vref / resolution;
  float current = (voltage - 2.5) / 0.185;
  if (current < 0.16)
  {
    current = 0;
  }
  return current;
}

float getVoltage()
{
  int adc = analogRead(zmptPin);
  float voltage = adc * vref / resolution;
  return voltage;
}

int calcFTT()
{
  for (int k = 0; k < FFT_N; k++)
    real_fft_plan->input[k] = (float)fft_signal[k];
}

/*Put your SSID & Password*/
const char *ssid = "ESP32-AP-Temp"; // Enter SSID here
const char *password = "getTEMP32"; // Enter Password here (min. 8 characters)

/* Put IP Address details */
IPAddress local_ip(192, 168, 1, 1);
IPAddress gateway(192, 168, 1, 1);
IPAddress subnet(255, 255, 255, 0);

WebServer server(80);
/*
  Nome da função: sendPacket
  objetivo: envia a temperatura via LoRa armazenada na variável currentTemp.
*/

/******************* função principal (setup) *********************/
void setup()
{
  Serial.begin(BAND);
  pinMode(RelePin, OUTPUT);   // seta o pino como saída
  digitalWrite(RelePin, LOW); // seta o pino com nivel logico baixo
  pinMode(ssrPin, OUTPUT);

  ledcAttachPin(ssrPin, 0);
  ledcSetup(0, 1000, 12);

  delay(1000);

  // Setup do Servidor Web

  // Connect to Wi-Fi network with SSID and password
  Serial.print("Setting AP (Access Point)…");

  // Remove the password parameter, if you want the AP (Access Point) to be open
  WiFi.mode(WIFI_AP);
  WiFi.softAPConfig(local_ip, gateway, subnet);
  WiFi.softAP(ssid, password);

  server.on("/", handle_OnConnect);
  server.on("/rele", handle_OnRele);
  server.onNotFound(handle_NotFound);

  server.begin();
  Serial.println("HTTP server started");
}
/******************* função em loop (loop) *********************/
void loop()
{
  long int c = analogRead(zmptPin);
  long int v = analogRead(acsPin);
  long int potValue = analogRead(potPin);

  std::ostringstream string;
  string << "I:" << (float)c*(3.3/4095.0) << ", V:" << (float)v*(3.3/4095.0) << ", P:" << (float)potValue*(3.3/4095.0);
  std::string output = string.str();

  Serial.println(output.c_str());

  ledcWrite(0, potValue);

  // Codigo do Servidor
  server.handleClient();
}

void ativarRele()
{
  if (statusRele == "OFF")
  {
    Serial.println("Caiu no if do ON");
    statusRele = String("ON");
    int readStatus = digitalRead(RelePin);
    Serial.println(String(readStatus));
    digitalWrite(RelePin, HIGH);
  }

  else
  {
    Serial.println("Caiu no if do OFF");
    statusRele = String("OFF");
    int readStatus = digitalRead(RelePin);
    Serial.println(String(readStatus));
    digitalWrite(RelePin, LOW);
  }
}

void handle_OnRele()
{
  ativarRele();
  server.send(200, "text/plain", (String)statusRele);
}

void handle_OnConnect()
{
  float c = getCurrent();
  float v = getVoltage();
  std::ostringstream string;
  string << "I: " << c << ", V: " << v;
  std::string output = string.str();
  server.send(200, "text/plain", output.c_str());
}

void handle_NotFound()
{
  server.send(404, "text/plain", "Not found");
}