import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Card } from '../components/Card';
import MainLayout from '../layouts/MainLayout';
// SearchForm import will be removed if it's no longer used directly by App's main content route
// import SearchForm from '../components/SearchForm.jsx';
import Sidebar from './components/Sidebar.jsx'; // Import Sidebar
import Pagination from '../components/Pagination.jsx';
import MealDetailPage from './components/MealDetailPage.jsx';

function App() {
  const [meals, setMeals] = useState([
    {
      id: 1,
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
      image: "https://via.placeholder.com/150",
      ingredients: ["pasta", "eggs", "pecorino romano", "guanciale", "black pepper"],
      prepTime: "10 minutes",
      cookTime: "15 minutes",
      servings: 4,
      difficulty: "Medium",
      calories: 600,
      cuisine: "Italian",
      instructions: [
        "Cook pasta according to package directions.",
        "While pasta cooks, fry guanciale until crispy.",
        "In a bowl, whisk eggs, pecorino romano, and a pinch of black pepper.",
        "Drain pasta, reserving some pasta water.",
        "Quickly combine pasta with guanciale. Then, off heat, mix in egg mixture, adding pasta water if too thick. Serve immediately."
      ],
      nutrition: { protein: "25g", carbs: "70g", fat: "28g" }
    },
    {
      id: 2,
      title: "Chicken Curry",
      description: "A flavorful and aromatic chicken curry with coconut milk and spices.",
      image: "https://via.placeholder.com/150",
      ingredients: ["chicken breast", "curry powder", "coconut milk", "onions", "ginger", "garlic", "tomatoes"],
      prepTime: "20 minutes",
      cookTime: "30 minutes",
      servings: 4,
      difficulty: "Medium",
      calories: 450,
      cuisine: "Indian",
      instructions: [
        "Sauté onions, ginger, and garlic.",
        "Add chicken pieces and cook until browned.",
        "Stir in curry powder and tomatoes.",
        "Pour in coconut milk and simmer until chicken is cooked through and sauce has thickened."
      ],
      nutrition: { protein: "35g", carbs: "20g", fat: "25g" }
    },
    {
      id: 3,
      title: "Vegan Burger",
      description: "A delicious and hearty plant-based burger with all the fixings.",
      image: "https://via.placeholder.com/150",
      ingredients: ["plant-based patty", "burger bun", "lettuce", "tomato", "onion", "vegan mayo", "pickles"],
      prepTime: "10 minutes",
      cookTime: "10 minutes",
      servings: 2,
      difficulty: "Easy",
      calories: 500,
      cuisine: "American",
      instructions: [
        "Cook plant-based patty according to package instructions.",
        "Toast burger buns.",
        "Assemble burger with patty, lettuce, tomato, onion, vegan mayo, and pickles."
      ],
      nutrition: { protein: "20g", carbs: "55g", fat: "22g" }
    },
    {
      id: 4,
      title: "Caesar Salad",
      description: "A fresh and crispy salad with romaine lettuce, croutons, Parmesan, and Caesar dressing.",
      image: "https://via.placeholder.com/150",
      ingredients: ["romaine lettuce", "croutons", "parmesan cheese", "caesar dressing", "chicken breast (optional)"],
      prepTime: "15 minutes",
      cookTime: "0 minutes",
      servings: 2,
      difficulty: "Easy",
      calories: 350,
      cuisine: "International",
      instructions: [
        "Wash and chop romaine lettuce.",
        "If adding chicken, grill or cook chicken breast and slice.",
        "In a large bowl, combine lettuce, croutons, and Parmesan cheese.",
        "Add Caesar dressing and toss to coat. Top with chicken if desired."
      ],
      nutrition: { protein: "15g", carbs: "10g", fat: "28g" }
    },
    {
      id: 5,
      title: "Beef Tacos",
      description: "Spicy and savory beef tacos with your favorite toppings.",
      image: "https://via.placeholder.com/150",
      ingredients: ["ground beef", "taco seasoning", "taco shells", "lettuce", "tomato", "cheese", "salsa", "sour cream"],
      prepTime: "15 minutes",
      cookTime: "20 minutes",
      servings: 4,
      difficulty: "Easy",
      calories: 480,
      cuisine: "Mexican",
      instructions: [
        "Brown ground beef and drain fat.",
        "Stir in taco seasoning and water (as per seasoning instructions). Simmer.",
        "Warm taco shells.",
        "Assemble tacos with beef mixture and desired toppings."
      ],
      nutrition: { protein: "22g", carbs: "30g", fat: "28g" }
    },
    {
      id: 6,
      title: "Margherita Pizza",
      description: "Classic Italian pizza with simple yet delicious toppings: tomatoes, mozzarella, basil, and olive oil.",
      image: "https://via.placeholder.com/150",
      ingredients: ["pizza dough", "canned crushed tomatoes", "fresh mozzarella", "fresh basil", "olive oil", "salt"],
      prepTime: "20 minutes (plus dough rising if homemade)",
      cookTime: "15 minutes",
      servings: 3,
      difficulty: "Medium",
      calories: 700,
      cuisine: "Italian",
      instructions: [
        "Preheat oven to high temperature (e.g., 475°F or 245°C) with a pizza stone if available.",
        "Stretch out pizza dough.",
        "Spread a thin layer of crushed tomatoes over the dough.",
        "Distribute pieces of fresh mozzarella and basil leaves.",
        "Drizzle with olive oil and sprinkle with salt.",
        "Bake until crust is golden and cheese is bubbly."
      ],
      nutrition: { protein: "25g", carbs: "80g", fat: "30g" }
    },
    {
      id: 7,
      title: "Sushi Platter",
      description: "A beautiful and delicious assortment of fresh sushi rolls and nigiri.",
      image: "https://via.placeholder.com/150",
      ingredients: ["sushi rice", "nori (seaweed sheets)", "raw fish (salmon, tuna)", "avocado", "cucumber", "soy sauce", "wasabi", "pickled ginger"],
      prepTime: "1 hour (includes rice cooking and cooling)",
      cookTime: "20 minutes (for rice)",
      servings: 2,
      difficulty: "Hard",
      calories: 650,
      cuisine: "Japanese",
      instructions: [
        "Cook sushi rice according to package directions and season with rice vinegar mixture. Let cool.",
        "Prepare fillings: slice fish, avocado, and cucumber into thin strips.",
        "Lay a sheet of nori on a bamboo sushi mat.",
        "Spread a thin layer of cooled sushi rice on the nori, leaving a small border at the top.",
        "Arrange fillings horizontally on the rice.",
        "Roll the sushi tightly using the bamboo mat. Slice into pieces. Serve with soy sauce, wasabi, and ginger."
      ],
      nutrition: { protein: "30g", carbs: "75g", fat: "25g" }
    },
    {
      id: 8,
      title: "Ramen Noodles",
      description: "A comforting and flavorful Japanese noodle soup with rich broth, tender pork, and various toppings.",
      image: "https://via.placeholder.com/150",
      ingredients: ["ramen noodles", "pork broth", "chashu pork (braised pork belly)", "soft-boiled egg", "green onions", "nori", "bamboo shoots"],
      prepTime: "30 minutes (if broth and chashu are pre-made)",
      cookTime: "15 minutes",
      servings: 2,
      difficulty: "Medium",
      calories: 800,
      cuisine: "Japanese",
      instructions: [
        "Prepare toppings: slice chashu pork, halve soft-boiled eggs, chop green onions.",
        "Heat pork broth.",
        "Cook ramen noodles according to package directions.",
        "Drain noodles and divide into serving bowls.",
        "Ladle hot broth over noodles. Arrange chashu, egg, green onions, nori, and bamboo shoots on top."
      ],
      nutrition: { protein: "40g", carbs: "90g", fat: "35g" }
    },
    {
      id: 9,
      title: "Grilled Salmon",
      description: "Healthy and delicious grilled salmon fillets seasoned with lemon and dill.",
      image: "https://via.placeholder.com/150",
      ingredients: ["salmon fillet", "lemon", "fresh dill", "olive oil", "salt", "black pepper", "asparagus (optional side)"],
      prepTime: "10 minutes",
      cookTime: "12 minutes",
      servings: 2,
      difficulty: "Easy",
      calories: 400,
      cuisine: "International",
      instructions: [
        "Preheat grill to medium-high heat.",
        "Brush salmon fillets with olive oil and season with salt, pepper, and fresh dill.",
        "Place lemon slices on top of fillets.",
        "Grill salmon for 5-7 minutes per side, or until cooked through. Serve with grilled asparagus if desired."
      ],
      nutrition: { protein: "40g", carbs: "5g", fat: "25g" }
    },
    {
      id: 10,
      title: "Pancakes",
      description: "Fluffy American-style pancakes perfect for a weekend breakfast, served with syrup.",
      image: "https://via.placeholder.com/150",
      ingredients: ["all-purpose flour", "milk", "eggs", "sugar", "baking powder", "salt", "butter", "maple syrup"],
      prepTime: "10 minutes",
      cookTime: "15 minutes",
      servings: 4,
      difficulty: "Easy",
      calories: 300,
      cuisine: "American",
      instructions: [
        "In a large bowl, whisk together flour, sugar, baking powder, and salt.",
        "In a separate bowl, whisk together milk and eggs. Melt butter and let cool slightly.",
        "Pour wet ingredients into dry ingredients and mix until just combined. Stir in melted butter.",
        "Heat a lightly oiled griddle or pan. Pour batter to form pancakes. Cook until bubbles appear on the surface, then flip and cook until golden. Serve with maple syrup."
      ],
      nutrition: { protein: "8g", carbs: "50g", fat: "8g" }
    },
    {
      id: 11,
      title: "Chocolate Cake",
      description: "A rich and decadent chocolate cake, perfect for celebrations or satisfying a sweet tooth.",
      image: "https://via.placeholder.com/150",
      ingredients: ["all-purpose flour", "granulated sugar", "unsweetened cocoa powder", "baking soda", "baking powder", "salt", "eggs", "milk", "vegetable oil", "vanilla extract", "boiling water", "chocolate frosting"],
      prepTime: "20 minutes",
      cookTime: "35 minutes",
      servings: 12,
      difficulty: "Medium",
      calories: 450,
      cuisine: "Dessert",
      instructions: [
        "Preheat oven to 350°F (175°C). Grease and flour two 9-inch round cake pans.",
        "In a large bowl, whisk together flour, sugar, cocoa powder, baking soda, baking powder, and salt.",
        "Add eggs, milk, oil, and vanilla extract. Beat until well combined.",
        "Carefully stir in boiling water (batter will be thin).",
        "Pour batter evenly into prepared pans. Bake for 30-35 minutes, or until a wooden skewer inserted into the center comes out clean.",
        "Let cakes cool in pans for 10 minutes before inverting onto a wire rack to cool completely. Frost as desired."
      ],
      nutrition: { protein: "5g", carbs: "60g", fat: "22g" }
    },
    {
      id: 12,
      title: "Fruit Smoothie",
      description: "A refreshing and healthy smoothie packed with fruits and yogurt.",
      image: "https://via.placeholder.com/150",
      ingredients: ["banana", "strawberries", "blueberries", "greek yogurt", "orange juice", "honey (optional)"],
      prepTime: "5 minutes",
      cookTime: "0 minutes",
      servings: 1,
      difficulty: "Easy",
      calories: 250,
      cuisine: "Healthy",
      instructions: [
        "Combine banana, strawberries, blueberries, Greek yogurt, and orange juice in a blender.",
        "Blend until smooth and creamy. Add honey for extra sweetness if desired.",
        "Pour into a glass and serve immediately."
      ],
      nutrition: { protein: "15g", carbs: "45g", fat: "3g" }
    },
    {
      id: 13,
      title: "Chicken Sandwich",
      description: "A classic chicken sandwich with tender chicken, fresh lettuce, and tomato.",
      image: "https://via.placeholder.com/150",
      ingredients: ["cooked chicken breast (sliced or shredded)", "bread slices (toasted)", "lettuce leaves", "tomato slices", "mayonnaise", "salt", "pepper"],
      prepTime: "10 minutes",
      cookTime: "5 minutes (if cooking chicken)",
      servings: 1,
      difficulty: "Easy",
      calories: 420,
      cuisine: "American",
      instructions: [
        "Toast bread slices to your liking.",
        "Spread mayonnaise on one side of each bread slice.",
        "Layer lettuce, tomato slices, and cooked chicken on one slice of bread.",
        "Season with salt and pepper. Top with the other slice of bread."
      ],
      nutrition: { protein: "30g", carbs: "35g", fat: "18g" }
    },
    {
      id: 14,
      title: "Vegetable Stir-fry",
      description: "A quick, healthy, and colorful vegetable stir-fry with tofu and a savory sauce.",
      image: "https://via.placeholder.com/150",
      ingredients: ["broccoli florets", "carrot sticks", "bell pepper strips (various colors)", "soy sauce", "firm tofu (cubed)", "sesame oil", "ginger", "garlic", "rice (for serving)"],
      prepTime: "20 minutes",
      cookTime: "15 minutes",
      servings: 3,
      difficulty: "Easy",
      calories: 380,
      cuisine: "Asian",
      instructions: [
        "Press tofu to remove excess water, then cut into cubes. Pan-fry or bake tofu until golden (optional).",
        "Prepare stir-fry sauce: mix soy sauce, a bit of sesame oil, minced ginger, and garlic.",
        "Heat a wok or large skillet. Add a little oil and stir-fry broccoli, carrots, and bell peppers until tender-crisp.",
        "Add tofu to the vegetables. Pour sauce over everything and toss to combine. Serve hot over rice."
      ],
      nutrition: { protein: "18g", carbs: "40g", fat: "15g" }
    },
    {
      id: 15,
      title: "Lobster Bisque",
      description: "A creamy, rich, and elegant lobster bisque, perfect for a special occasion.",
      image: "https://via.placeholder.com/150",
      ingredients: ["cooked lobster meat", "heavy cream", "dry sherry", "onion", "celery", "carrot", "butter", "flour", "fish or vegetable broth", "tomato paste", "thyme", "bay leaf"],
      prepTime: "25 minutes",
      cookTime: "40 minutes",
      servings: 4,
      difficulty: "Hard",
      calories: 550,
      cuisine: "French",
      instructions: [
        "Melt butter in a pot. Add chopped onion, celery, and carrot; cook until softened.",
        "Stir in flour to make a roux. Gradually whisk in broth until smooth.",
        "Add tomato paste, thyme, bay leaf. Simmer for 20 minutes.",
        "Strain the soup base. Return to pot. Stir in heavy cream and sherry.",
        "Add chopped cooked lobster meat and heat through. Do not boil. Season to taste."
      ],
      nutrition: { protein: "20g", carbs: "15g", fat: "40g" }
    },
    {
      id: 16,
      title: "Beef Stroganoff",
      description: "A hearty Russian dish with tender beef and mushrooms in a creamy sour cream sauce, often served over egg noodles.",
      image: "https://via.placeholder.com/150",
      ingredients: ["beef sirloin (thinly sliced)", "mushrooms (sliced)", "onion (chopped)", "garlic (minced)", "butter", "flour", "beef broth", "sour cream", "dijon mustard", "egg noodles (for serving)"],
      prepTime: "20 minutes",
      cookTime: "30 minutes",
      servings: 4,
      difficulty: "Medium",
      calories: 650,
      cuisine: "Russian",
      instructions: [
        "Season beef slices. In a large skillet, brown beef in butter over medium-high heat; remove and set aside.",
        "In the same skillet, sauté onions until soft. Add mushrooms and garlic; cook until mushrooms are browned.",
        "Sprinkle flour over vegetables and cook for 1 minute. Gradually stir in beef broth until smooth and thickened.",
        "Return beef to skillet. Reduce heat and simmer for 10 minutes.",
        "Stir in sour cream and Dijon mustard. Heat through but do not boil. Serve over cooked egg noodles."
      ],
      nutrition: { protein: "35g", carbs: "45g", fat: "38g" }
    },
    {
      id: 17,
      title: "Pad Thai",
      description: "A popular Thai stir-fried noodle dish with shrimp, tofu, peanuts, and a tangy-sweet sauce.",
      image: "https://via.placeholder.com/150",
      ingredients: ["rice noodles", "shrimp", "firm tofu (cubed)", "eggs", "bean sprouts", "chives", "crushed peanuts", "lime wedges", "fish sauce", "tamarind paste", "sugar", "chili flakes"],
      prepTime: "30 minutes (includes noodle soaking)",
      cookTime: "15 minutes",
      servings: 3,
      difficulty: "Medium",
      calories: 580,
      cuisine: "Thai",
      instructions: [
        "Soak rice noodles according to package directions. Prepare Pad Thai sauce by mixing fish sauce, tamarind paste, sugar, and chili flakes.",
        "In a wok or large skillet, scramble eggs; set aside.",
        "Add oil to wok, then stir-fry tofu and shrimp until shrimp is pink and tofu is golden.",
        "Add drained noodles and sauce to the wok. Toss to combine and cook until noodles are tender.",
        "Stir in bean sprouts, chives, and scrambled eggs. Serve immediately, garnished with crushed peanuts and lime wedges."
      ],
      nutrition: { protein: "28g", carbs: "70g", fat: "20g" }
    },
    {
      id: 18,
      title: "Greek Salad",
      description: "A refreshing salad with cucumbers, tomatoes, olives, feta cheese, and a lemon-herb dressing.",
      image: "https://via.placeholder.com/150",
      ingredients: ["cucumber", "tomatoes", "red onion", "kalamata olives", "feta cheese", "olive oil", "lemon juice", "oregano"],
      prepTime: "20 minutes",
      cookTime: "0 minutes",
      servings: 4,
      difficulty: "Easy",
      calories: 320,
      cuisine: "Greek",
      instructions: [
        "Chop cucumbers, tomatoes, and red onion into bite-sized pieces.",
        "In a large bowl, combine chopped vegetables, kalamata olives, and crumbled feta cheese.",
        "In a small bowl, whisk together olive oil, lemon juice, and dried oregano for the dressing.",
        "Pour dressing over salad and toss gently to combine. Serve immediately or chill."
      ],
      nutrition: { protein: "8g", carbs: "15g", fat: "25g" }
    },
    {
      id: 19,
      title: "Shepherd's Pie",
      description: "A comforting British classic with a savory minced lamb filling topped with creamy mashed potatoes.",
      image: "https://via.placeholder.com/150",
      ingredients: ["ground lamb", "onion", "carrots", "celery", "peas", "corn", "beef broth", "tomato paste", "worcestershire sauce", "potatoes (for mashing)", "butter", "milk", "cheddar cheese (optional)"],
      prepTime: "30 minutes",
      cookTime: "1 hour",
      servings: 6,
      difficulty: "Medium",
      calories: 700,
      cuisine: "British",
      instructions: [
        "Cook ground lamb with chopped onion, carrots, and celery until meat is browned and vegetables are tender. Drain excess fat.",
        "Stir in peas, corn, beef broth, tomato paste, and Worcestershire sauce. Simmer until sauce thickens.",
        "Meanwhile, boil potatoes until tender. Drain and mash with butter and milk until creamy. Season.",
        "Spread meat filling in a baking dish. Top with mashed potatoes, roughing up the surface with a fork. Sprinkle with cheddar cheese if desired.",
        "Bake at 375°F (190°C) for 20-25 minutes, or until golden and bubbly."
      ],
      nutrition: { protein: "30g", carbs: "50g", fat: "40g" }
    },
    {
      id: 20,
      title: "Falafel Wrap",
      description: "Crispy falafel balls tucked into a warm pita with fresh veggies and tahini sauce.",
      image: "https://via.placeholder.com/150",
      ingredients: ["falafel balls (store-bought or homemade)", "pita bread", "lettuce", "tomato", "cucumber", "tahini sauce", "hummus (optional)"],
      prepTime: "15 minutes (if using store-bought falafel)",
      cookTime: "5-10 minutes (to heat falafel/pita)",
      servings: 2,
      difficulty: "Easy",
      calories: 550,
      cuisine: "Middle Eastern",
      instructions: [
        "Cook or heat falafel balls according to instructions.",
        "Warm pita bread.",
        "Spread hummus on pita if using. Fill with falafel balls, chopped lettuce, tomato, and cucumber.",
        "Drizzle generously with tahini sauce. Wrap and serve."
      ],
      nutrition: { protein: "18g", carbs: "65g", fat: "25g" }
    },
    {
      id: 21,
      title: "Mushroom Risotto",
      description: "A creamy and savory Italian rice dish made with Arborio rice and mushrooms.",
      image: "https://via.placeholder.com/150",
      ingredients: ["arborio rice", "mushrooms (cremini, porcini)", "vegetable broth (warmed)", "onion (finely chopped)", "white wine (dry)", "parmesan cheese (grated)", "butter", "olive oil", "parsley (chopped)"],
      prepTime: "15 minutes",
      cookTime: "45 minutes",
      servings: 4,
      difficulty: "Medium",
      calories: 520,
      cuisine: "Italian",
      instructions: [
        "In a large pan, sauté chopped onion in olive oil and a little butter until softened.",
        "Add sliced mushrooms and cook until browned and their liquid has evaporated.",
        "Add Arborio rice to the pan and toast for 1-2 minutes, stirring constantly.",
        "Pour in white wine and cook until absorbed.",
        "Add a ladleful of warm broth to the rice, stirring until absorbed. Continue adding broth, one ladleful at a time, waiting until each is absorbed before adding the next. This should take about 20-25 minutes, until rice is creamy and al dente.",
        "Stir in grated Parmesan cheese, remaining butter, and chopped parsley. Season to taste. Serve immediately."
      ],
      nutrition: { protein: "15g", carbs: "60g", fat: "22g" }
    },
    {
      id: 22,
      title: "French Onion Soup",
      description: "A classic French soup made with caramelized onions and beef broth, topped with croutons and melted Gruyère cheese.",
      image: "https://via.placeholder.com/150",
      ingredients: ["yellow onions (thinly sliced)", "beef broth", "butter", "olive oil", "flour", "dry white wine or sherry", "bay leaf", "thyme", "baguette slices (for croutons)", "gruyère cheese (grated)"],
      prepTime: "20 minutes",
      cookTime: "1 hour 30 minutes",
      servings: 4,
      difficulty: "Medium",
      calories: 480,
      cuisine: "French",
      instructions: [
        "In a large pot or Dutch oven, melt butter with olive oil. Add sliced onions and cook slowly over medium-low heat for 30-40 minutes, stirring occasionally, until deeply caramelized and sweet.",
        "Sprinkle flour over onions and cook for 1-2 minutes. Deglaze with white wine or sherry, scraping up any browned bits.",
        "Gradually stir in beef broth. Add bay leaf and thyme. Bring to a simmer and cook for at least 30 minutes.",
        "Toast baguette slices until golden. Ladle soup into oven-safe bowls. Top each with one or two baguette slices and a generous amount of Gruyère cheese.",
        "Broil until cheese is melted and bubbly. Serve carefully."
      ],
      nutrition: { protein: "20g", carbs: "35g", fat: "28g" }
    },
    {
      id: 23,
      title: "Chicken Alfredo",
      description: "Creamy pasta dish with fettuccine, chicken, and a rich Parmesan cheese sauce.",
      image: "https://via.placeholder.com/150",
      ingredients: ["fettuccine pasta", "chicken breast (sliced)", "heavy cream", "butter", "parmesan cheese (grated)", "garlic (minced)", "salt", "black pepper", "parsley (chopped, for garnish)"],
      prepTime: "15 minutes",
      cookTime: "25 minutes",
      servings: 4,
      difficulty: "Easy",
      calories: 750,
      cuisine: "Italian-American",
      instructions: [
        "Cook fettuccine according to package directions.",
        "While pasta cooks, season chicken slices with salt and pepper. Sauté chicken in a large skillet until cooked through; remove and set aside.",
        "In the same skillet, melt butter. Add minced garlic and cook for 1 minute until fragrant.",
        "Stir in heavy cream and bring to a simmer. Reduce heat and cook for 5 minutes, or until sauce starts to thicken. Stir in grated Parmesan cheese until smooth.",
        "Add cooked pasta and chicken to the skillet with the sauce. Toss to combine. Garnish with chopped parsley and serve."
      ],
      nutrition: { protein: "45g", carbs: "55g", fat: "40g" }
    },
    {
      id: 24,
      title: "Lemon Herb Roasted Chicken",
      description: "A whole chicken roasted to perfection with lemon, herbs, and garlic.",
      image: "https://via.placeholder.com/150",
      ingredients: ["whole chicken (about 3-4 lbs)", "lemon (halved)", "garlic head (halved)", "fresh herbs (rosemary, thyme, parsley)", "olive oil", "salt", "black pepper", "onion (quartered, optional)"],
      prepTime: "20 minutes",
      cookTime: "1 hour 15 minutes",
      servings: 4,
      difficulty: "Medium",
      calories: 600,
      cuisine: "International",
      instructions: [
        "Preheat oven to 400°F (200°C).",
        "Pat chicken dry. Season generously inside and out with salt and pepper.",
        "Stuff chicken cavity with halved lemon, halved garlic head, and fresh herbs. Place quartered onion around chicken in roasting pan if using.",
        "Drizzle chicken with olive oil and rub to coat.",
        "Roast for 1 hour to 1 hour 15 minutes, or until a meat thermometer inserted into the thickest part of the thigh registers 165°F (74°C) and juices run clear.",
        "Let chicken rest for 10-15 minutes before carving. Serve with pan juices."
      ],
      nutrition: { protein: "50g", carbs: "5g", fat: "40g" }
    },
    {
      id: 25,
      title: "Vegetarian Chili",
      description: "A hearty and flavorful vegetarian chili with beans, tomatoes, and spices.",
      image: "https://via.placeholder.com/150",
      ingredients: ["kidney beans (canned, rinsed)", "black beans (canned, rinsed)", "diced tomatoes (canned)", "onion (chopped)", "bell peppers (chopped)", "corn (canned or frozen)", "vegetable broth", "chili powder", "cumin", "smoked paprika", "garlic (minced)", "olive oil", "optional toppings: shredded cheese, sour cream, avocado, cilantro"],
      prepTime: "20 minutes",
      cookTime: "45 minutes",
      servings: 6,
      difficulty: "Easy",
      calories: 350,
      cuisine: "American",
      instructions: [
        "Heat olive oil in a large pot or Dutch oven. Add chopped onion and bell peppers; cook until softened.",
        "Stir in minced garlic, chili powder, cumin, and smoked paprika; cook for 1 minute until fragrant.",
        "Add diced tomatoes, kidney beans, black beans, corn, and vegetable broth. Bring to a boil, then reduce heat and simmer for at least 30 minutes, or until flavors have melded and chili has thickened.",
        "Serve hot with desired toppings."
      ],
      nutrition: { protein: "15g", carbs: "60g", fat: "5g" }
    }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Keep this if you want to control items per page via state

  // New states for additional filters
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]); // Assuming multi-select for difficulty
  const [calorieRange, setCalorieRange] = useState({ min: '', max: '' });
  const [selectedPrepTime, setSelectedPrepTime] = useState('');

  const handleSearch = (query) => {
    setSearchTerm(query);
    setCurrentPage(1);
  };

  const handleIngredientFilterChange = (newSelectedIngredients) => {
    setSelectedIngredients(newSelectedIngredients);
    setCurrentPage(1);
  };

  // Handlers for new filters
  const handleCuisineChange = (cuisine) => {
    setSelectedCuisines(prevCuisines =>
      prevCuisines.includes(cuisine)
        ? prevCuisines.filter(c => c !== cuisine)
        : [...prevCuisines, cuisine]
    );
    setCurrentPage(1);
  };

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulties(prevDifficulties =>
      prevDifficulties.includes(difficulty)
        ? prevDifficulties.filter(d => d !== difficulty)
        : [...prevDifficulties, difficulty]
    );
    setCurrentPage(1);
  };

  const handleCalorieChange = (type, value) => {
    setCalorieRange(prevRange => ({
      ...prevRange,
      [type]: value === '' ? '' : parseInt(value, 10) // Store as number or empty string
    }));
    setCurrentPage(1);
  };

  const handlePrepTimeChange = (value) => {
    setSelectedPrepTime(value);
    setCurrentPage(1);
  };

  const handleClearAllFilters = () => {
    setSearchTerm("");
    setSelectedIngredients([]);
    setSelectedCuisines([]);
    setSelectedDifficulties([]);
    setCalorieRange({ min: '', max: '' });
    setSelectedPrepTime('');
    setCurrentPage(1);
  };

  // Helper function to parse prep time string (e.g., "30 minutes") to a number
  const parsePrepTime = (prepTimeString) => {
    if (!prepTimeString || typeof prepTimeString !== 'string') return Infinity; // Or handle as error
    const numericPart = prepTimeString.match(/^(\d+)/);
    return numericPart ? parseInt(numericPart[0], 10) : Infinity;
  };

  const filteredMeals = meals.filter(meal => {
    const searchTermLower = searchTerm.toLowerCase();
    // Text Search
    if (searchTermLower && !(meal.title.toLowerCase().includes(searchTermLower) || meal.description.toLowerCase().includes(searchTermLower))) {
      return false;
    }

    // Ingredient Filter
    if (selectedIngredients.length > 0) {
      const matchesIngredients = selectedIngredients.every(ingredient =>
        meal.ingredients.some(mealIngredient =>
          mealIngredient.toLowerCase().includes(ingredient.toLowerCase())
        )
      );
      if (!matchesIngredients) return false;
    }

    // Cuisine Filter
    if (selectedCuisines.length > 0 && !selectedCuisines.includes(meal.cuisine)) {
      return false;
    }

    // Difficulty Filter
    if (selectedDifficulties.length > 0 && !selectedDifficulties.includes(meal.difficulty)) {
      return false;
    }

    // Calorie Filter
    const minCals = calorieRange.min !== '' ? parseFloat(calorieRange.min) : null;
    const maxCals = calorieRange.max !== '' ? parseFloat(calorieRange.max) : null;

    if (minCals !== null && meal.calories < minCals) {
      return false;
    }
    if (maxCals !== null && meal.calories > maxCals) {
      return false;
    }

    // Prep Time Filter
    if (selectedPrepTime) { // Assuming selectedPrepTime is a string like '15', '30' or empty
      const maxPrepTimeSelected = parseInt(selectedPrepTime, 10);
      if (!isNaN(maxPrepTimeSelected)) {
        const mealPrepTime = parsePrepTime(meal.prepTime);
        if (mealPrepTime > maxPrepTimeSelected) {
          return false;
        }
      }
    }

    return true;
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

  const allCuisines = meals.map(meal => meal.cuisine);
  const uniqueCuisines = [...new Set(allCuisines)].sort();

  const uniqueDifficulties = ['Easy', 'Medium', 'Hard']; // Fixed list or derive if data varies more

  const prepTimeOptions = [
    { value: '', label: 'Any Max Prep Time' },
    { value: '15', label: '< 15 min' },
    { value: '30', label: '< 30 min' },
    { value: '45', label: '< 45 min' },
    { value: '60', label: '< 1 hour' },
    { value: '90', label: '< 1.5 hours' },
  ];


  return (
    <MainLayout>
      <Routes>
        <Route
          path="/"
          element={
            // Parent container for Sidebar and main content area
            <div className="flex flex-col md:flex-row min-h-screen">
              <Sidebar
                query={searchTerm}
                onSearchSubmit={handleSearch}
                uniqueIngredients={uniqueIngredients}
                selectedIngredients={selectedIngredients}
                onIngredientChange={handleIngredientFilterChange}

                uniqueCuisines={uniqueCuisines}
                selectedCuisines={selectedCuisines}
                onCuisineChange={handleCuisineChange}

                uniqueDifficulties={uniqueDifficulties}
                selectedDifficulty={selectedDifficulties} // Pass the array
                onDifficultyChange={handleDifficultyChange} // Pass the handler

                calorieRange={calorieRange}
                onCalorieChange={handleCalorieChange}

                prepTimeOptions={prepTimeOptions}
                selectedPrepTime={selectedPrepTime}
                onPrepTimeChange={handlePrepTimeChange}
                onClearAllFilters={handleClearAllFilters} // Pass the new handler
              />
              {/*
                The layout of Sidebar and the meal list needs consideration.
                Typically, Sidebar would be part of MainLayout or a new page-specific layout component.
                For now, placing it directly here as a replacement for SearchForm.
                The main content (meal list + pagination) might need to be wrapped or styled
                to appear next to the Sidebar rather than below it. This will be handled in the next step.
              */}
              <main className="flex-grow p-4 md:p-6"> {/* Main content area takes remaining space */}
                {currentMeals.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"> {/* Responsive grid for cards */}
                    {currentMeals.map(meal => (
                      <Card
                        key={meal.id}
                        meal={meal}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-2xl text-gray-500">No meals found matching your criteria.</p>
                  </div>
                )}
                {filteredMeals.length > 0 && filteredMeals.length > itemsPerPage && (
                  <div className="mt-8 flex justify-center"> {/* Centered pagination */}
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onNextPage={handleNextPage}
                      onPrevPage={handlePrevPage}
                    />
                  </div>
                )}
              </main>
            </div>
          }
        />
        <Route path="/meal/:id" element={<MealDetailPage meals={meals} />} />
      </Routes>
    </MainLayout>
  )
}

export default App
