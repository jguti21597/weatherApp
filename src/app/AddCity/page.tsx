"use client";
import "./styling.css";
import React, { useState } from 'react';
import SearchBar from '@/components/searchbar';
import {useRouter} from 'next/navigation';

interface CitySearchResult {
  name: string;
  temperature: number;
  windSpeed: number; // Added to interface
  windGust: number; // Added to interface
  windAngle: number; // Added to interface
}

const Search = () => {
  const [searchResult, setSearchResult] = useState<CitySearchResult[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchCities = async (query: string) => {
    setError(''); // Clear error message

    if (!query) {
      setSearchResult([]);
      return;
    }

    const apiKey = '65ad34ef51cc68f1567d459fc99efa63'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        setSearchResult([]);
        setError('City not found');
        return;
      }
      const data = await response.json();
      
      const temperature = data.main.temp; 
      const windSpeed = data.wind.speed; 
      const windGust = data.wind.gust || 0; 
      const windAngle = data.wind.deg; 

      
      const queryString = `?name=${encodeURIComponent(data.name)}&temperature=${encodeURIComponent(temperature)}&windSpeed=${encodeURIComponent(windSpeed)}&windGust=${encodeURIComponent(windGust)}&windAngle=${encodeURIComponent(windAngle)}`;
  
    
      router.push(`/SearchResults${queryString}`);
    
    } catch (error) {
      console.error('Error fetching city:', error);
      setError('Failed to fetch city data'); 
    }
  };
 

  const handleSearch = (location: string) => {
   
    fetchCities(location); 
  };

  return (
    <body>
      <div>
        <h1 className="weather-heading">Weather</h1>
        <SearchBar onSearch={handleSearch} />
        {error && <p className="error-message">{error}</p>}
       
        <ul>
          {searchResult.map((result, index) => (
            <li key={index}>
              <strong>{result.name}</strong> - Temperature: {result.temperature}K, Wind Speed: {result.windSpeed}m/s, 
              Wind Gust: {result.windGust}m/s, Wind Angle: {result.windAngle}°
            </li>
          ))}
        </ul>
      </div>
    </body>
  );
};

export default Search;
