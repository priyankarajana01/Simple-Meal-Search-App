import { useState } from 'react';
import './App.css'
import { Card } from '../components/Card'
import MainLayout from '../layouts/MainLayout'
import SearchForm from '../components/SearchForm.jsx';
import Pagination from '../components/Pagination.jsx';

function App() {
  const [meals, setMeals] = useState([
    {
      id: 1,
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish.",
      image: "https://via.placeholder.com/150",
      ingredients: ["pasta", "eggs", "pecorino romano", "guanciale", "black pepper"]
    },
    {
      id: 2,
      title: "Chicken Curry",
      description: "A flavorful and aromatic curry.",
      image: "https://via.placeholder.com/150",
      ingredients: ["chicken", "curry powder", "coconut milk", "onions", "ginger", "garlic"]
    },
    {
      id: 3,
      title: "Vegan Burger",
      description: "A delicious plant-based burger.",
      image: "https://via.placeholder.com/150",
      ingredients: ["plant-based patty", "bun", "lettuce", "tomato", "vegan mayo"]
    },
    {
      id: 4,
      title: "Caesar Salad",
      description: "A fresh and crispy salad.",
      image: "https://via.placeholder.com/150",
      ingredients: ["romaine lettuce", "croutons", "parmesan cheese", "caesar dressing"]
    },
    {
      id: 5,
      title: "Beef Tacos",
      description: "Spicy and savory beef tacos.",
      image: "https://via.placeholder.com/150",
      ingredients: ["ground beef", "taco shells", "lettuce", "cheese", "salsa"]
    },
    {
      id: 6,
      title: "Margherita Pizza",
      description: "Classic Italian pizza with tomatoes and mozzarella.",
      image: "https://via.placeholder.com/150",
      ingredients: ["pizza dough", "tomatoes", "mozzarella", "basil", "olive oil"]
    },
    {
      id: 7,
      title: "Sushi Platter",
      description: "A selection of fresh sushi.",
      image: "https://via.placeholder.com/150",
      ingredients: ["sushi rice", "nori", "raw fish (salmon, tuna)", "avocado", "cucumber"]
    },
    {
      id: 8,
      title: "Ramen Noodles",
      description: "Comforting and flavorful Japanese noodle soup.",
      image: "https://via.placeholder.com/150",
      ingredients: ["ramen noodles", "broth", "pork belly", "soft-boiled egg", "green onions"]
    },
    {
      id: 9,
      title: "Grilled Salmon",
      description: "Healthy and delicious grilled salmon.",
      image: "https://via.placeholder.com/150",
      ingredients: ["salmon fillet", "lemon", "dill", "olive oil", "asparagus"]
    },
    {
      id: 10,
      title: "Pancakes",
      description: "Fluffy pancakes with syrup.",
      image: "https://via.placeholder.com/150",
      ingredients: ["flour", "milk", "eggs", "sugar", "baking powder", "maple syrup"]
    },
    {
      id: 11,
      title: "Chocolate Cake",
      description: "Rich and decadent chocolate cake.",
      image: "https://via.placeholder.com/150",
      ingredients: ["flour", "sugar", "cocoa powder", "eggs", "milk", "butter"]
    },
    {
      id: 12,
      title: "Fruit Smoothie",
      description: "A refreshing and healthy fruit smoothie.",
      image: "https://via.placeholder.com/150",
      ingredients: ["banana", "strawberries", " blueberries", "yogurt", "orange juice"]
    },
    {
      id: 13,
      title: "Chicken Sandwich",
      description: "A classic chicken sandwich.",
      image: "https://via.placeholder.com/150",
      ingredients: ["chicken breast", "bread", "lettuce", "tomato", "mayonnaise"]
    },
    {
      id: 14,
      title: "Vegetable Stir-fry",
      description: "A quick and healthy vegetable stir-fry.",
      image: "https://via.placeholder.com/150",
      ingredients: ["broccoli", "carrots", "bell peppers", "soy sauce", "tofu"]
    },
    {
      id: 15,
      title: "Lobster Bisque",
      description: "Creamy and rich lobster bisque.",
      image: "https://via.placeholder.com/150",
      ingredients: ["lobster meat", "heavy cream", "sherry", "onion", "celery", "carrots"]
    }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleSearch = (query) => {
    setSearchTerm(query);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleIngredientFilterChange = (newSelectedIngredients) => {
    setSelectedIngredients(newSelectedIngredients);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const filteredMeals = meals.filter(meal => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearchTerm = meal.title.toLowerCase().includes(searchTermLower) ||
                              meal.description.toLowerCase().includes(searchTermLower);

    if (selectedIngredients.length === 0) {
      return matchesSearchTerm;
    }

    const matchesIngredients = selectedIngredients.every(ingredient =>
      meal.ingredients.some(mealIngredient =>
        mealIngredient.toLowerCase().includes(ingredient.toLowerCase())
      )
    );
    return matchesSearchTerm && matchesIngredients;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMeals = filteredMeals.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const allIngredients = meals.flatMap(meal => meal.ingredients);
  const uniqueIngredients = [...new Set(allIngredients)].sort();


  return (
    <MainLayout>
      <SearchForm
        query={searchTerm}
        onSearchSubmit={handleSearch}
        uniqueIngredients={uniqueIngredients}
        selectedIngredients={selectedIngredients}
        onIngredientChange={handleIngredientFilterChange}
      />
      <div className="flex flex-col justify-center items-center min-h-screen">
        {currentMeals.length > 0 ? (
          currentMeals.map(meal => (
            <Card
              key={meal.id}
              meal={meal}
            />
          ))
        ) : (
          <p>No meals found.</p>
        )}
        {filteredMeals.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
          />
        )}
      </div>
    </MainLayout>
  )
}

export default App
