"use client";
import "./styling.css";
import React, { useState } from 'react';
import SearchBar from '@/components/searchbar';
import {useRouter} from 'next/navigation';

interface CitySearchResult {
  name: string;
  
}

const Search = () => {
  const [searchResult, setSearchResult] = useState<CitySearchResult[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchCities = async (query: string) => {
    setError(''); 

    if (!query) {
      setSearchResult([]);
      return;
    }

    const apiKey = 'fe186c3b63f66a40b45f3549d7b3f22e'; 
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
      

      
      const queryString = `?name=${encodeURIComponent(data.name)}`;
  
    
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
    
      <div>
        <h1 className="weather-heading">Weather</h1>
        <SearchBar onSearch={handleSearch} />
        {error && <p className="error-message">{error}</p>}
      </div>  
    
  );
};

export default Search;
