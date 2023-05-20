import Image from "next/image";
import * as Switch from "@radix-ui/react-switch";
import { Inter } from "next/font/google";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { Chart } from "react-charts";
import React from "react";

type MyDatum = { date: Date; stars: number };

const inter = Inter({ subsets: ["latin"] });

type DailyStars = {
  date: Date;

  stars: number;
};

type Series = {
  label: string;

  data: DailyStars[];
};

const data: Series[] = [
  {
    label: "React Charts",

    data: [
      {
        date: new Date(),

        stars: 202123,
      },
    ],
  },

  {
    label: "React Query",

    data: [
      {
        date: new Date(),

        stars: 10234230,
      },
    ],
  },
];

export default function Home() {
  const primaryAxis = React.useMemo(
    (): AxisOptions<DailyStars> => ({
      getValue: (datum) => datum.date,
    }),

    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<DailyStars>[] => [
      {
        getValue: (datum) => datum.stars,
      },
    ],

    []
  );
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
            <div className="w-full h-[200px]">
              <Chart
                options={{
                  data,

                  primaryAxis,

                  secondaryAxes,
                }}
              />
            </div>
          </div>
        </div>

        <div className="w-[488px] h-96 bg-card-background rounded-lg">
          <div className="p-5 w-full h-auto">
            <h3 className="text-[32px] text-white font-black mb-8">
              Corrente Elétrica (A)
            </h3>
            <div className="w-full h-[200px]">
              <Chart
                options={{
                  data,

                  primaryAxis,

                  secondaryAxes,
                }}
              />
            </div>
          </div>
        </div>

        <div className="w-[488px] h-96 bg-card-background rounded-lg">
          <div className="p-5 w-full h-auto">
            <h3 className="text-[32px] text-white font-black mb-8">
              Tensão (V)
            </h3>
            <div className="w-full h-[200px]">
              <Chart
                options={{
                  data,

                  primaryAxis,

                  secondaryAxes,
                }}
              />
            </div>
          </div>
        </div>

        <div className="w-[488px] h-96 bg-card-background rounded-lg">
          <div className="p-5 w-full h-auto flex-row">
            <h3 className="text-[32px] text-white font-black mb-8">
              Controles
            </h3>
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
                  placeholder="Valor 1"
                  className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 w-3/4"
                />
                <button className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 w-1/4">
                  Botão 2
                </button>
              </div>
            </form>
            <button className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
              Botão 3
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
                <Switch.Root className="SwitchRoot" id="airplane-mode">
                  <Switch.Thumb className="SwitchThumb" />
                </Switch.Root>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
