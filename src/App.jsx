import { useState } from 'react';
import './App.css'
import { Card } from '../components/Card'
import MainLayout from '../layouts/MainLayout'
import SearchForm from '../components/SearchForm.jsx';

function App() {
  const [meals, setMeals] = useState([
    {
      id: 1,
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish.",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      title: "Chicken Curry",
      description: "A flavorful and aromatic curry.",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 3,
      title: "Vegan Burger",
      description: "A delicious plant-based burger.",
      image: "https://via.placeholder.com/150"
    }
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  const filteredMeals = meals.filter(meal =>
    meal.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <SearchForm query={searchTerm} onSearchSubmit={handleSearch} />
      <div className="flex justify-center items-center min-h-screen">
        {filteredMeals.length > 0 ? (
          filteredMeals.map(meal => (
            <Card
              key={meal.id}
              meal={meal}
            />
          ))
        ) : (
          <p>No meals found.</p>
        )}
      </div>
    </MainLayout>
  )
}

export default App
