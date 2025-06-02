import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Sidebar = ({
  query,
  onSearchSubmit,
  // Props for existing filters
  uniqueIngredients = [],
  selectedIngredients = [],
  onIngredientChange = () => {},
  // Props for new filters
  uniqueCuisines = [],
  selectedCuisines = [], // Controlled by App.jsx
  onCuisineChange = () => {},
  uniqueDifficulties = [],
  selectedDifficulty = [], // Controlled by App.jsx (renamed from selectedDifficulties in App to avoid confusion)
  onDifficultyChange = () => {},
  calorieRange = { min: '', max: '' }, // Controlled by App.jsx
  onCalorieChange = () => {},
  prepTimeOptions = [],
  selectedPrepTime = '', // Controlled by App.jsx
  onPrepTimeChange = () => {}
}) => {
  const [localQuery, setLocalQuery] = useState(query);

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  // Text Search handlers remain the same
  const handleTextChange = (event) => {
    setLocalQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchSubmit(localQuery);
  };

  // Ingredient checkbox handler remains the same (calls prop)
  const handleIngredientCheckboxChange = (ingredientName, isChecked) => {
    // This logic is now in App.jsx, Sidebar just calls the prop
    // For consistency, let App.jsx manage the array update logic.
    // Sidebar's role is to inform App of the user's intent.
    // The prop onIngredientChange should expect the ingredient and its checked state,
    // or expect the new array. App.jsx's handleIngredientFilterChange expects the new array.
    // So, the existing logic in Sidebar for this is fine.
    let newSelectedIngredients;
    if (isChecked) {
      newSelectedIngredients = [...selectedIngredients, ingredientName];
    } else {
      newSelectedIngredients = selectedIngredients.filter(item => item !== ingredientName);
    }
    onIngredientChange(newSelectedIngredients); // This prop is correctly named in App.jsx
  };

  // New handlers now call props passed from App.jsx
  const handleCuisineCheckboxChange = (cuisine, isChecked) => {
    onCuisineChange(cuisine); // App.jsx's handleCuisineChange toggles based on the cuisine value
  };

  const handleDifficultyCheckboxChange = (difficultyValue, isChecked) => {
    onDifficultyChange(difficultyValue); // App.jsx's handleDifficultyChange toggles
  };

  const handleMinCalInputChange = (e) => {
    onCalorieChange('min', e.target.value);
  };
  const handleMaxCalInputChange = (e) => {
    onCalorieChange('max', e.target.value);
  };

  const handlePrepTimeSelectChange = (e) => {
    onPrepTimeChange(e.target.value);
  };

  // Duplicated handleTextChange and handleSubmit were here and are now removed.

  return (
    <aside
      className="w-full md:w-72 bg-gray-100 p-5 border-r border-gray-200 shadow-md space-y-6" // Adjusted width and spacing
      aria-label="Sidebar with filters"
    >
      {/* Text Search Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Search Meals</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="By name or description..."
            value={localQuery}
            onChange={handleTextChange}
            className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition duration-150"
          >
            Search
          </button>
        </form>
      </div>

      {/* Ingredient Filter Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3 pt-4 border-t border-gray-300">Filter by Ingredients</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {uniqueIngredients.length > 0 ? uniqueIngredients.map(ingredient => (
            <label key={ingredient} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-200 transition duration-150 shadow-sm">
              <input
                type="checkbox"
                checked={selectedIngredients.includes(ingredient)}
                onChange={(e) => handleIngredientCheckboxChange(ingredient, e.target.checked)}
                className="form-checkbox h-5 w-5 text-indigo-600 rounded border-gray-400 focus:ring-indigo-500 transition duration-150"
              />
              <span className="text-sm text-gray-700 capitalize">{ingredient}</span>
            </label>
          )) : (
            <p className="text-sm text-gray-500">No ingredients available for filtering.</p>
          )}
        </div>
      </div>

      {/* Cuisine Filter Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3 pt-4 border-t border-gray-300">Filter by Cuisine</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {uniqueCuisines.length > 0 ? uniqueCuisines.map(cuisine => (
            <label key={cuisine} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-200 transition duration-150 shadow-sm">
              <input
                type="checkbox"
                checked={selectedCuisines.includes(cuisine)} // Use prop
                onChange={(e) => handleCuisineCheckboxChange(cuisine, e.target.checked)}
                className="form-checkbox h-5 w-5 text-indigo-600 rounded border-gray-400 focus:ring-indigo-500 transition duration-150"
              />
              <span className="text-sm text-gray-700 capitalize">{cuisine}</span>
            </label>
          )) : (
             <p className="text-sm text-gray-500">No cuisines available for filtering.</p>
          )}
        </div>
      </div>

      {/* Difficulty Filter Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3 pt-4 border-t border-gray-300">Filter by Difficulty</h3>
        <div className="space-y-2">
          {uniqueDifficulties.length > 0 ? uniqueDifficulties.map(difficulty => (
            <label key={difficulty.value || difficulty} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-200 transition duration-150 shadow-sm">
              <input
                type="checkbox"
                name="difficulty"
                value={difficulty.value || difficulty} // Assuming difficulty might be string or {value, label}
                checked={selectedDifficulty.includes(difficulty.value || difficulty)} // Use prop
                onChange={(e) => handleDifficultyCheckboxChange(difficulty.value || difficulty, e.target.checked)}
                className="form-checkbox h-5 w-5 text-indigo-600 rounded border-gray-400 focus:ring-indigo-500 transition duration-150"
              />
              <span className="text-sm text-gray-700 capitalize">{difficulty.label || difficulty}</span> {/* Display label if object */}
            </label>
          )) : (
            <p className="text-sm text-gray-500">No difficulties available for filtering.</p>
          )}
        </div>
      </div>

      {/* Calories Filter Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3 pt-4 border-t border-gray-300">Filter by Calories</h3>
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-2 sm:items-center">
          <input
            type="number"
            placeholder="Min"
            value={calorieRange.min} // Use prop
            onChange={handleMinCalInputChange}
            className="w-full sm:w-1/2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm text-sm"
            min="0"
          />
          <span className="hidden sm:inline text-gray-500">-</span>
          <input
            type="number"
            placeholder="Max"
            value={calorieRange.max} // Use prop
            onChange={handleMaxCalInputChange}
            className="w-full sm:w-1/2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm text-sm"
            min="0"
          />
        </div>
      </div>

      {/* Prep Time Filter Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3 pt-4 border-t border-gray-300">Filter by Max Prep Time</h3>
        <select
          value={selectedPrepTime} // Use prop
          onChange={handlePrepTimeSelectChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-sm"
        >
          <option value="">Any</option>
          {prepTimeOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

    </aside>
  );
};

Sidebar.propTypes = {
  query: PropTypes.string.isRequired,
  onSearchSubmit: PropTypes.func.isRequired,
  uniqueIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  onIngredientChange: PropTypes.func.isRequired,

  uniqueCuisines: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCuisines: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCuisineChange: PropTypes.func.isRequired,

  uniqueDifficulties: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
    ])
  ).isRequired,
  selectedDifficulty: PropTypes.arrayOf(PropTypes.string).isRequired, // Expecting an array of strings
  onDifficultyChange: PropTypes.func.isRequired,

  calorieRange: PropTypes.shape({
    min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  onCalorieChange: PropTypes.func.isRequired,

  prepTimeOptions: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
  ).isRequired,
  selectedPrepTime: PropTypes.string.isRequired,
  onPrepTimeChange: PropTypes.func.isRequired,
};

export default Sidebar;
