"use client";
import React, { useEffect, useState } from 'react';
import { apiUrl, apiUrlForecast } from "@/lib/constants"; 
import { WeatherData, WeatherResponse } from "@/lib/types"; 
import { CloudDrizzleIcon, MoveUpIcon, ThermometerIcon, WindIcon } from "lucide-react";
import InfoCard from "@/components/InfoCard";
import Graph from "@/components/Graph";

const WeatherDashboard: React.FC = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecasts, setForecasts] = useState<WeatherResponse | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const LOCATION = params.get('name') || 'DefaultLocation'; 
    setLocation(LOCATION);

    const fetchData = async () => {
      try {
        const resp = await fetch(apiUrlForecast(LOCATION), { cache: "no-cache" });
        const forecastsData = await resp.json() as WeatherResponse;
        setForecasts(forecastsData);

        const resp2 = await fetch(apiUrl(LOCATION), { cache: "no-cache" });
        const weatherData = await resp2.json() as WeatherData;
        setWeatherData(weatherData);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };

    fetchData();
  }, []);

  if (!weatherData || !forecasts) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-24 gap-y-[3rem]">
      <div className="gap-y-10 flex flex-col items-center justify-center">
        <h1 className="text-secondary text-center text-4xl font-bold">
          {location}
        </h1>
        <div className="flex justify-between gap-x-10 w-full">
          <InfoCard
            value={parseFloat((weatherData.main.temp - 273).toFixed(0))}
            unit="°C"
            icon={ThermometerIcon}
          />
          <InfoCard value={weatherData.wind.speed} unit="mph" icon={WindIcon} />
          <InfoCard
            value={weatherData.rain ? weatherData.rain["3h"] : 0}
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
              <h1>{weatherData.wind.speed.toFixed(0)}</h1>
              <div className="flex flex-col justify-start">
                <p className="text-sm font-normal">Wind</p>
                <p className="text-xl">mph</p>
              </div>
            </div>
            <div className=" border-t flex items-center">
              <h1>{weatherData.wind.gust ? weatherData.wind.gust : 0}</h1>
              <div className="flex flex-col justify-start">
                <p className="text-sm font-normal">Gusts</p>
                <p className="text-xl">mph</p>
              </div>
            </div>
          </div>
          {angle > 0 ? (
            <div className="text-white flex flex-col justify-center items-center">
              <div style={{ transform: `rotate(${weatherData.wind.deg}deg)` }}>
                <MoveUpIcon size={100} />
              </div>
              <h1 className="text-xl font-bold">{weatherData.wind.deg}°</h1>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </main>
  );
};

export default WeatherDashboard;
