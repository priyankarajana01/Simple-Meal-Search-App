import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MealDetailPage = ({ meals }) => {
  const { id } = useParams();
  const meal = meals.find(m => m.id === parseInt(id));

  if (!meal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-6 text-center bg-gray-50"> {/* Adjusted min-height */}
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-semibold text-red-600 mb-4">Meal Not Found</h2>
          <p className="text-gray-700 mt-2 mb-6">Sorry, we couldn't find the meal you're looking for.</p>
          <Link
            to="/"
            className="mt-4 inline-block bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 transition duration-150 text-lg font-medium"
          >
            Back to All Meals
          </Link>
        </div>
      </div>
    );
  }

  // Responsive layout: Image on left, details on right for larger screens
  return (
    <div className="bg-gray-100 min-h-screen py-8 md:py-12">
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden md:flex">
          {/* Image Section */}
          <div className="md:w-1/2">
            <img src={meal.image} alt={meal.title} className="w-full h-64 md:h-full md:min-h-[600px] object-cover" />
          </div>

          {/* Details Section */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">{meal.title}</h1>
            <p className="text-gray-600 text-md lg:text-lg mb-6">{meal.description}</p>

            {/* Details & Nutrition Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-6 border-t border-b border-gray-200 py-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Details</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li><strong>Cuisine:</strong> <span className="text-gray-600">{meal.cuisine}</span></li>
                  <li><strong>Difficulty:</strong> <span className="text-gray-600">{meal.difficulty}</span></li>
                  <li><strong>Prep Time:</strong> <span className="text-gray-600">{meal.prepTime}</span></li>
                  <li><strong>Cook Time:</strong> <span className="text-gray-600">{meal.cookTime}</span></li>
                  <li><strong>Servings:</strong> <span className="text-gray-600">{meal.servings}</span></li>
                  <li><strong>Calories:</strong> <span className="text-gray-600">{meal.calories} kcal</span></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Nutrition (per serving)</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li><strong>Protein:</strong> <span className="text-gray-600">{meal.nutrition.protein}</span></li>
                  <li><strong>Carbs:</strong> <span className="text-gray-600">{meal.nutrition.carbs}</span></li>
                  <li><strong>Fat:</strong> <span className="text-gray-600">{meal.nutrition.fat}</span></li>
                </ul>
              </div>
            </div>

            {/* Ingredients Section */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2">Ingredients</h2>
              <ul className="list-disc list-inside pl-2 space-y-1 text-gray-700 columns-1 sm:columns-2">
                {meal.ingredients.map((ingredient, index) => (
                  <li key={index} className="capitalize text-sm break-words">{ingredient}</li>
                ))}
              </ul>
            </div>

            {/* Instructions Section */}
            <div className="mb-8 flex-grow">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2">Instructions</h2>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                {meal.instructions.map((step, index) => (
                  <li key={index} className="text-sm leading-relaxed">{step}</li>
                ))}
              </ol>
            </div>

            {/* Back Button */}
            <div className="mt-auto pt-6 text-center border-t border-gray-200">
              <Link
                to="/"
                className="inline-block bg-indigo-600 text-white px-10 py-3 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 text-lg font-medium transition duration-150"
              >
                Back to All Meals
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MealDetailPage.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    prepTime: PropTypes.string.isRequired,
    cookTime: PropTypes.string.isRequired,
    servings: PropTypes.number.isRequired,
    difficulty: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    cuisine: PropTypes.string.isRequired,
    instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
    nutrition: PropTypes.shape({
      protein: PropTypes.string.isRequired,
      carbs: PropTypes.string.isRequired,
      fat: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
};

export default MealDetailPage;
