import Image from "next/image";
import * as Switch from "@radix-ui/react-switch";
import { Inter } from "next/font/google";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { api } from "../services/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const inter = Inter({ subsets: ["latin"] });

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    backgroundColor: string;
    borderColor: string;
  }[];
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([] as number[]);
  const [isRelayOn, setIsRelayOn] = useState(false);
  const [powerArray, setPowerArray] = useState([] as number[]);
  const [currentArray, setCurrentArray] = useState([] as number[]);
  const [voltageArray, setVoltageArray] = useState([] as number[]);

  async function handleGetRelay() {
    try {
      setIsLoading(true);

      const response = await api.get("/rele");

      setIsRelayOn(response.data == "ON" ? true : false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGetData() {
    try {
      setIsLoading(true);

      const response = await api.get("http://localhost:3333/data");
      const data: number[] = response.data;

      let newPowerArray: number[] = [...powerArray, data[0]];
      setPowerArray(newPowerArray);
      let newCurrentArray: number[] = [...currentArray, data[1]];
      setCurrentArray(newCurrentArray);
      let newVoltageArray: number[] = [...voltageArray, data[2]];
      setVoltageArray(newVoltageArray);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const labels = ["15:34", "15:37", "15:39", "15:42", "15:45", "15:48"];

  const powerData: ChartData = {
    labels: labels,
    datasets: [
      {
        label: "Potência(W)",
        data: powerArray,
        fill: false,
        backgroundColor: "#fff",
        borderColor: "#1eddff",
      },
    ],
  };

  const currentData: ChartData = {
    labels: labels,
    datasets: [
      {
        label: "Corrente(A)",
        data: currentArray,
        fill: false,
        backgroundColor: "#fff",
        borderColor: "#ff1e1e",
      },
    ],
  };

  const voltageData: ChartData = {
    labels: labels,
    datasets: [
      {
        label: "Tensão(V)",
        data: voltageArray,
        fill: false,
        backgroundColor: "#fff",
        borderColor: "#1eff3c",
      },
    ],
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-4 ${inter.className} bg-background`}
    >
      <div className="max-w-[1344px] flex flex-col w-full my-8 ml-32">
        <h1 className="text-4xl text-white font-black">Monitor ESP32</h1>
      </div>

      <div className="grid grid-cols-2 gap-x-20 gap-y-12 my-6">
        <div className="w-[488px] h-96 bg-card-background rounded-lg">
          <div className="p-5 w-full h-auto">
            <h3 className="text-[32px] text-white font-black mb-8">
              Gráfico de Potência
            </h3>
            <Line options={options} data={powerData} />
            <div className="w-full h-[200px]"></div>
          </div>
        </div>

        <div className="w-[488px] h-96 bg-card-background rounded-lg">
          <div className="p-5 w-full h-auto">
            <h3 className="text-[32px] text-white font-black mb-8">
              Corrente Elétrica (A)
            </h3>
            <Line options={options} data={currentData} />
            <div className="w-full h-[200px]"></div>
          </div>
        </div>

        <div className="w-[488px] h-96 bg-card-background rounded-lg">
          <div className="p-5 w-full h-auto">
            <h3 className="text-[32px] text-white font-black mb-8">
              Tensão (V)
            </h3>
            <Line options={options} data={voltageData} />
            <div className="w-full h-[200px]"></div>
          </div>
        </div>

        <div className="w-[488px] h-96 bg-card-background rounded-lg">
          <div className="p-5 w-full h-auto">
            <h3 className="text-[32px] text-white font-black mb-8">
              Controles
            </h3>
            <div className="flex-col flex items-center gap-4">
              <form
                className="mt-8 flex flex-col gap-4"
                onSubmit={() => {
                  console.log("submit");
                }}
              >
                <div className="flex flex-row gap-2">
                  <label htmlFor="valor1"></label>
                  <input
                    name="value1"
                    id="value1"
                    type="text"
                    placeholder="Valor"
                    className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 w-3/4"
                  />
                  <button className="bg-zinc-500 text-center px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 w-1/4">
                    Enviar
                  </button>
                </div>
              </form>
              <button
                className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 "
                onClick={handleGetData}
              >
                Atualizar
              </button>
              <form>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label
                    className="Label"
                    htmlFor="airplane-mode"
                    style={{ paddingRight: 15 }}
                  >
                    <p className="text-xl text-white font-bold">Status</p>
                  </label>
                  <Switch.Root
                    className="SwitchRoot"
                    id="airplane-mode"
                    onChange={handleGetRelay}
                  >
                    <Switch.Thumb className="SwitchThumb" />
                  </Switch.Root>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
