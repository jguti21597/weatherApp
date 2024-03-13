import React, { useState } from 'react';
import { cn } from '@/lib/utils';


interface SearchBarProps {
  onSearch: (location: string) => void; 
}
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSearch = () => {
    if (input) {
      onSearch(input);
      setInput(''); 
    }
  };

  return (
    <div className={cn("search-bar-container")}>
      <input
        type="text"
        placeholder="Search for a city"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={cn("search-input")}
      />
      <button onClick={handleSearch} className={cn("search-button")}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
