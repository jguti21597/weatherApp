"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 

const SearchResults = () => {
  const [searchParams, setSearchParams] = useState({
    name: '',
    temperature: 0,
    windSpeed: 0,
    windGust: 0, 
    windAngle: 0, 
  });

  useEffect(() => {
    // Ensure this runs only in the browser
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setSearchParams({
        name: params.get('name') || '',
        temperature: parseFloat(params.get('temperature') ?? '0'), 
        windSpeed: parseFloat(params.get('windSpeed') ?? '0'), 
        windGust: parseFloat(params.get('windGust') ?? '0'), 
        windAngle: parseFloat(params.get('windAngle') ?? '0'),
      });
    }
  }, []);

  
  const convertTemperature = (kelvin: number): string => {
    const celsius = kelvin - 273.15;
    return celsius.toFixed(2);
  };
  

  return (
    <div>
      <h1 className="results-heading">Weather Details</h1>
      <div className="weather-details">
        <p>Name: {searchParams.name}</p>
        <p>Temperature: {convertTemperature(searchParams.temperature)}°C</p>
        <p>Wind Speed: {searchParams.windSpeed} m/s</p>
        <p>Wind Gust: {searchParams.windGust} m/s</p> 
        <p>Wind Angle: {searchParams.windAngle}°</p> 
      </div>
    </div>
  );
};

export default SearchResults;
