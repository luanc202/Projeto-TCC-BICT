<p align="center">
  <h1 align='center' style="background-color:#171717">Trabalho de Conclusão de Curso </h1>
  <h2 align='center' style="background-color:#171717">Desenvolvimento de um Multímetro com
Aplicação da Tecnologia de Internet das Coisas</h2>
  <h2 align='center' style="background-color:#171717">Universidade Federal do Maranhão - 2023</h2>
</p>

<p align="center">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="Logo React">
<img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next JS">
<img src="https://img.shields.io/badge/-TypeScript-2f74c3?style=for-the-badge&logo=typescript&logoColor=white" alt="Logo TypeScript" />
<img src="https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white" alt="Logo Chartjs" />
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Logo Tailwindcss">
<img src="https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white" alt="Logo Arduino">
<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/luanc202/Projeto-TCC-BICT?color=orange&style=for-the-badge">
</p>

<p align="center">
<img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/luanc202/Projeto-TCC-BICT">
  <a href="https://github.com/luanc202/Projeto-TCC-BICT/commits/main">
      <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/luanc202/Projeto-TCC-BICT">
   </a>
  <a href="LICENSE"><img  src="https://img.shields.io/static/v1?label=License&message=MIT&color=F7DD43&labelColor=202024" alt="License"></a>
</p>

## Resumo

Neste trabalho foi desenvolvido um sistema que mede duas grandezas elétricas, tensão e corrente, utilizando módulos sensores e tecnologia IoT. A obtenção dos valores RMS de tensão e corrente alternados foi realizada mediante a leitura dos sensores e processamento dos dados com o microcontrolador ESP32 LoRa. Para isso, os conhecimentos de Série de Fourier, Transformada Rápida de Fourier (FFT) e Eletrônica de Potência, foram utilizados. Como resultados, gráficos instantâneos dos sinais de tensão e corrente alternados e da FFT foram obtidos. Após analisar os resultados com um osciloscópio, ajustes no sensor corrigiu as distorções do sinal de tensão, resultando em um gráfico com de uma senoidal pura. As distorções no sinal de corrente são inerentes ao tipo de carga que é conectada ao multímetro. A conclusão comenta aspectos da metodologia empregada e dos principais resultados obtidos. Como proposta de trabalhos futuros, pretende-se implementar os resultados obtidos com os fundamentos teóricos relacionados ao cálculo das potências, ativar o módulo de atuadores (SSR e relé), fabricar uma placa PCB e aprimorar a calibração dos sensores a fim de melhorar a precisão e viabilizar a análise da qualidade de energia.

Palavras-chave: Medição de Tensão e Corrente Alternados. Valor RMS. FFT. ESP32.
Internet das Coisas.

## Abstract

In this work, a system was developed that measures two electrical quantities, voltage and current, using sensor modules and IoT technology. Obtaining the RMS values of alternating voltage and current was performed by reading the sensors and processing the data with the ESP32 LoRa microcontroller. For this, knowledge of Fourier Series, Fast Fourier Transform (FFT) and Power Electronics were used. As a result, instantaneous graphs of alternating voltage and current and FFT signals were obtained. Adjustments to the sensor corrected the voltage signal distortions, resulting in a graph of a pure sine wave. Distortions in the current signal are inherent to the type of load that is connected to the multimeter. In conclusion, aspects of the methodology employed and the main results obtained are commented. As a proposal for future work, it is intended to implement the results obtained with the theory of power calculation, activate the actuator module (SSR and relay), manufacture a PCB board and improve the calibration of sensors in order to improve accuracy and enable analysis of power quality. 

Keywords: Measurement of Alternating Voltage and Current. RMS Value. FFT. ESP32. Internet of Things.


## 👨‍💻 Time

- [![Perfil - Luan](https://img.shields.io/badge/Perfil-Luan-2ea44f)](https://github.com/ClaufSS)
- [![Perfil - Nerval](https://img.shields.io/badge/Perfil-Nerval-2ea44f)](https://github.com/nervaljunior)
- [![Perfil - Elpidio](https://img.shields.io/badge/Perfil-Elpidio-2ea44f)]()
<br />

## ✨ Tecnologia

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [Arduino IDE](https://www.arduino.cc/en/software)
- [NextJS](https://nextjs.org/)
- [ChartJS](https://www.chartjs.org/)

## 🚀 Como executar

Para a parte do front-end da aplicação, é preciso baixar os pacotes com o gerenciador de sua preferencia.

Entre na pasta `web` e execute o comando `yarn` ou `npm install` para baixar as dependências.

Por fim, basta usar o comando `yarn dev` para iniciar o servidor em modo de desenolvimento, ou `npm run dev` caso prefira usar o npm.

Para a parte do código Arduino, é preciso baixar a IDE do Arduino e instalar as bibliotecas necessárias. Você vai precisar das bibliotecas:

- [WiFi.h](https://www.arduino.cc/en/Reference/WiFi)
- [WebServer.h](https://www.arduino.cc/en/Reference/WebServer)
- [string.h](https://www.arduino.cc/reference/en/language/variables/data-types/string/functions/)
- [sstream.h](https://www.arduino.cc/reference/en/language/variables/data-types/string/functions/stringstream/)
- Quaisquer outras externas necessárias dependendo do modelo do seu dispositivo, neste caso foi utilizado para a placa Heltec WiFi LoRa 32 V2.

E então, basta abrir o arquivo `main.ino` e fazer o upload para o dispositivo. Neste trabalho foi utilizado o Arduino IDE para essa tarefa.

Após transferido o código, monte o circuito de acordo com o esquemático mostrado no PDF do trabalho e alimente o dispositivo microcontrolador escolhido. O arquivo do trabalho é o [`TCC-file.pdf`](./TCC-file.pdf).

## 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.