import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function SearchForm({ query, onSearchSubmit }) {
  const [localQuery, setLocalQuery] = useState(query);

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  const handleChange = (event) => {
    setLocalQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchSubmit(localQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-4">
      {/* Input Field */}
      <input
        type="text"
        placeholder="Search for meals..."
        value={localQuery}
        onChange={handleChange}
        className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {/* Search Button */}
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Search
      </button>
    </form>
  )
}

SearchForm.propTypes = {
  query: PropTypes.string.isRequired,
  onSearchSubmit: PropTypes.func.isRequired
};