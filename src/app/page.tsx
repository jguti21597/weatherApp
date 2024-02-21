import Graph from "@/components/Graph"
import InfoCard from "@/components/InfoCard"
import { apiUrlForecast } from "@/lib/constants";
import { WeatherData, WeatherResponse } from "@/lib/types";
import { CloudDrizzleIcon, ThermometerIcon, WindIcon } from "lucide-react"

export default async function Home() {
  const LOCATION = "London"
  const resp = await fetch(apiUrlForecast(LOCATION), {cache: "no-cache"})
  const forecasts = await resp.json() as WeatherResponse


  const resp2 = await fetch("https://api.openweathermap.org/data/2.5/weather?q=london&appid=65ad34ef51cc68f1567d459fc99efa63", {cache: "no-cache"})
  const weatherdata = await resp2.json() as WeatherData


  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-y-[8rem]">
      <div className="gap-y-10  flex flex-col items-center w-full ">
        <h1 className="text-secondary text-center text-6xl font-bold">{LOCATION}</h1>
        <div className="flex justify-between w-full">
          <InfoCard value={parseFloat((weatherdata.main.temp - 273).toFixed(0))} unit="°C" icon={ThermometerIcon}/>
          <InfoCard value={weatherdata.wind.speed} unit="mph" icon={WindIcon}/>
          <InfoCard value={weatherdata.rain ? weatherdata.rain["3h"] : 0} unit="%" icon={CloudDrizzleIcon}/>
        </div>
      </div>
      {/* Graph */}
      <div className="gap-y-10 flex flex-col items-center w-full">
        <h1 className="text-xl font-bold self-start text-white">Temperature
        <ThermometerIcon color="black" size={40} className="inline"/></h1>
        <Graph data={forecasts}/>
        <h1 className="text-xl font-bold self-start text-white">Wind
        <WindIcon color="black" size={40} className="inline"/></h1>
      </div>

    </main>
  );
}
