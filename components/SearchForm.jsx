import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function SearchForm({
  query,
  onSearchSubmit,
  uniqueIngredients = [], // Default to empty array
  selectedIngredients = [], // Default to empty array
  onIngredientChange = () => {} // Default to no-op
}) {
  const [localQuery, setLocalQuery] = useState(query);

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  const handleTextChange = (event) => {
    setLocalQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchSubmit(localQuery);
  };

  const handleCheckboxChange = (ingredientName, isChecked) => {
    let newSelectedIngredients;
    if (isChecked) {
      newSelectedIngredients = [...selectedIngredients, ingredientName];
    } else {
      newSelectedIngredients = selectedIngredients.filter(item => item !== ingredientName);
    }
    onIngredientChange(newSelectedIngredients);
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white mb-6">
      <form onSubmit={handleSubmit} className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or description..."
          value={localQuery}
          onChange={handleTextChange}
          className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Search
        </button>
      </form>
      
      <div className="mb-2 text-gray-700">
        <h4 className="font-semibold text-md mb-2">Filter by Ingredients:</h4>
        <div className="flex flex-wrap gap-2">
          {uniqueIngredients.map(ingredient => (
            <label key={ingredient} className="flex items-center space-x-2 p-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200">
              <input
                type="checkbox"
                checked={selectedIngredients.includes(ingredient)}
                onChange={(e) => handleCheckboxChange(ingredient, e.target.checked)}
                className="form-checkbox h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-800 capitalize">{ingredient}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

SearchForm.propTypes = {
  query: PropTypes.string.isRequired,
  onSearchSubmit: PropTypes.func.isRequired,
  uniqueIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  onIngredientChange: PropTypes.func.isRequired,
};