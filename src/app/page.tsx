import Graph from "@/components/Graph";
import InfoCard from "@/components/InfoCard";
import { apiUrl, apiUrlForecast } from "@/lib/constants";
import { WeatherData, WeatherResponse } from "@/lib/types";
import {
  CloudDrizzleIcon,
  MoveUpIcon,
  Navigation2,
  ThermometerIcon,
  WindIcon,
} from "lucide-react";

export default async function Home() {
  const LOCATION = "London";
  const resp = await fetch(apiUrlForecast(LOCATION), { cache: "no-cache" });
  const forecasts = (await resp.json()) as WeatherResponse;

  const date = new Date()
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let wday = weekday[date.getDay()];
  const day = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th", "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th","30th","31st"]
  let numday = day[date.getDate()-1];
  const month = ["January", "February", "March","April","May", "June", "July", "August", "September", "October", "November", "December"];
  let monnum = month[date.getMonth()]; 
  const year = date.getFullYear();
  const formattedDate = `${wday} ${numday} of ${monnum} ${year}`;

  const resp2 = await fetch(apiUrl("London"), { cache: "no-cache" });
  const weatherdata = (await resp2.json()) as WeatherData;

  const angle = weatherdata.wind.deg;

  return (
    <main className="flex min-h-screen flex-col items-center px-24 gap-y-[3rem]">
      <div className="gap-y-10 flex flex-col items-center justify-center">
        <h1 className="text-secondary text-center text-4xl font-bold">
          {LOCATION}
        </h1>
        <h2 className="text-secondary text-xl font-bold">{formattedDate}</h2>
        <div className="flex justify-between gap-x-10 w-full">
          <InfoCard
            value={parseFloat((weatherdata.main.temp - 273).toFixed(0))}
            unit="°C"
            icon={ThermometerIcon}
          />
          <InfoCard value={weatherdata.wind.speed} unit="mph" icon={WindIcon} />
          <InfoCard
            value={weatherdata.rain ? weatherdata.rain["3h"] : 0}
            unit="%"
            icon={CloudDrizzleIcon}
          />
        </div>
      </div>
      {/* Graph */}
      <div className="gap-y-10 flex flex-col items-center w-full">
        <h1 className="text-xl font-bold text-white">
          Temperature
          <ThermometerIcon color="white" size={40} className="inline" />
        </h1>
        <Graph data={forecasts} />
        <h1 className="text-xl font-bold text-white">
          Wind <WindIcon color="white" size={40} className="inline" />
        </h1>
        <div className="flex gap-x-[7rem] justify-between">
          <div className="text-6xl text-secondary font-bold">
            <div className="flex items-center">
              <h1>{weatherdata.wind.speed.toFixed(0)}</h1>
              <div className="flex flex-col justify-start">
                <p className="text-sm font-normal">Wind</p>
                <p className="text-xl">mph</p>
              </div>
            </div>
            <div className=" border-t flex items-center">
              <h1>{weatherdata.wind.gust ? weatherdata.wind.gust : 0}</h1>
              <div className="flex flex-col justify-start">
                <p className="text-sm font-normal">Gusts</p>
                <p className="text-xl">mph</p>
              </div>
            </div>
          </div>
          {angle > 0 ? (
            <div className="text-white flex flex-col justify-center items-center">
              <div style={{ transform: `rotate(${weatherdata.wind.deg}deg)` }}>
                <MoveUpIcon size={100} />
              </div>
              <h1 className="text-xl font-bold">{weatherdata.wind.deg}°</h1>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </main>
  );
}
