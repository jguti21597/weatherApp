// Enables strict usage of client-side imports ensuring Next.js optimizes for client-side only packages
"use client";

// Importing CSS for styling
import "./styling.css";
// React import for managing component state
import React, { useState } from "react";
// Importing the SearchBar component
import SearchBar from "@/components/searchbar";
// Hook for navigating programmatically in a Next.js application
import { useRouter } from "next/navigation";

// Interface defining the structure of city search results
interface CitySearchResult {
  name: string;
}

const Search = () => {
  // State for storing search results
  const [searchResult, setSearchResult] = useState<CitySearchResult[]>([]);
  // State for storing any error messages
  const [error, setError] = useState("");
  // useRouter hook for navigation
  const router = useRouter();

  // Function to fetch cities based on the search query
  const fetchCities = async (query: string) => {
    setError(""); // Resetting error state

    // Clear search results if the query is empty
    if (!query) {
      setSearchResult([]);
      return;
    }

    // API key for OpenWeatherMap API
    const apiKey = "fe186c3b63f66a40b45f3549d7b3f22e";
    // Constructing the API request URL
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        setSearchResult([]);
        setError("City not found");
        return;
      }
      const data = await response.json();

      // Redirecting to the SearchResults page with the city name as a query parameter
      const queryString = `?name=${encodeURIComponent(data.name)}`;
      router.push(`/SearchResults${queryString}`);
    } catch (error) {
      console.error("Error fetching city:", error);
      setError("Failed to fetch city data");
    }
  };

  // Function to handle search action
  const handleSearch = (location: string) => {
    fetchCities(location);
  };

  // Component rendering
  return (
    <div>
      <h1 className="weather-heading">Weather</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Search;
