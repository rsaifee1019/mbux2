'use client';

import { useState } from 'react';

const SearchDropdown = ({ setSelectedStudents, selectedStudents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Mock API call - replace with your actual API endpoint
  const fetchSearchResults = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/searchStudents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsOpen(true);

    // Debounce API calls
    const timeoutId = setTimeout(() => {
      if (value.trim()) {
        fetchSearchResults(value);
      } else {
        setSearchResults([]); // Clear results if input is empty
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handleSelect = (item) => {
    console.log('item', item);
    console.log('selectedStudents', selectedStudents);
    if (!selectedStudents.includes(item)) {
      setSelectedStudents([...selectedStudents, item]);
    }
    setSearchTerm('');
    setSearchResults([]);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md ">
      {/* Search Input */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        onFocus={() => setIsOpen(true)}
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="নাম বা রোল নম্বর লিখুন..."
      />

      {/* Dropdown Results */}
      {isOpen && (searchResults.length > 0 || isLoading) && (
        <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto z-10">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : (
            searchResults.map((result) => (
              <div
                key={result._id}
                onClick={() => handleSelect(result)}
                className="p-2 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
              >
                {result.name}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;