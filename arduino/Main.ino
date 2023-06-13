#include <DHTesp.h>
#include "heltec.h"
#include <WiFi.h>
#include <WebServer.h>
#include "FFT.h"
#include "FFT_signal.h"
#define BAND 915E6 // Escolha a frequência

DHTesp dht;

String packet;

const int RelePin = 23; // pino ao qual o Módulo Relé está conectado
const int tensaoPin = 24;
const int correntePin = 25;
const int potenciaPin = 26;
String statusRele = "OFF"; // variavel para ler dados recebidos pela serial
String off = "OFF";

fft_config_t *real_fft_plan = fft_init(FFT_N, FFT_REAL, FFT_FORWARD, fft_input, fft_output);

int getCurrent()
{
  int adc = analogRead(correntePin);
  float voltage = adc * 5 / 1023.0;
  float current = (voltage - 2.5) / 0.185;
  if (current < 0.16)
  {
    current = 0;
  }
  return current;
}

int getVoltage()
{
  int adc = analogRead(correntePin);
  float voltage = adc * 5 / 1023.0;
  return voltage;
}

void sendPacket()
{
  LoRa.beginPacket();
  LoRa.print("Temperatura: ");
  LoRa.print(currentTemp);
  LoRa.endPacket();
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
  pinMode(LED, OUTPUT);       // inicializa o LED

  Heltec.begin(true /*Habilita o Display*/, true /*Heltec.Heltec.Heltec.LoRa Disable*/, true /*Habilita debug Serial*/, true /*Habilita o PABOOST*/, BAND /*Frequência BAND*/);

  Heltec.display->init();
  Heltec.display->flipScreenVertically();
  Heltec.display->setFont(ArialMT_Plain_16);
  Heltec.display->clear();
  Heltec.display->drawString(33, 5, "Iniciado");
  Heltec.display->drawString(10, 30, "com Sucesso!");
  Heltec.display->display();
  delay(1000);

  dht.setup(17, DHTesp::DHT11); // inicializa o DHT no pino 17

  currentTemp = dht.getTemperature();

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
  getTemp(); // Ler temperatura
  Heltec.display->clear();
  Heltec.display->setTextAlignment(TEXT_ALIGN_LEFT);
  Heltec.display->setFont(ArialMT_Plain_16);

  Heltec.display->drawString(30, 5, "temperatura");
  Heltec.display->drawString(33, 30, (String)currentTemp);
  Heltec.display->drawString(78, 30, "°C");
  Heltec.display->display();
  sendPacket(); // Envia temperatura

  Serial.println(currentTemp);

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
  server.send(200, "text/plain", (String)currentTemp);
}

void handle_NotFound()
{
  server.send(404, "text/plain", "Not found");
}