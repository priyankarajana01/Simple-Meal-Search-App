import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App'; // Assuming App.jsx is in the same directory or src/
import '@testing-library/jest-dom';

// Mock the Card component as it's not relevant to pagination logic testing
jest.mock('../components/Card', () => ({
  Card: ({ meal }) => <div data-testid="meal-card">{meal.title}</div>,
}));

describe('App Component with Pagination', () => {
  const initialMealsCount = 15; // As defined in App.jsx
  const itemsPerPage = 5; // As defined in App.jsx

  test('displays the first page of items correctly and "Previous" button is disabled', () => {
    render(<App />);
    const mealCards = screen.getAllByTestId('meal-card');
    expect(mealCards).toHaveLength(itemsPerPage);
    expect(mealCards[0]).toHaveTextContent('Spaghetti Carbonara'); // First item on page 1
    expect(screen.getByText(/Page 1 of/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Previous/i })).toBeDisabled();
  });

  test('clicking "Next" button displays the next set of items', () => {
    render(<App />);
    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);

    const mealCards = screen.getAllByTestId('meal-card');
    expect(mealCards).toHaveLength(itemsPerPage);
    expect(mealCards[0]).toHaveTextContent('Margherita Pizza'); // First item on page 2
    expect(screen.getByText(/Page 2 of/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Previous/i })).not.toBeDisabled();
  });

  test('clicking "Previous" button displays the previous set of items', () => {
    render(<App />);
    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton); // Go to page 2
    
    const prevButton = screen.getByRole('button', { name: /Previous/i });
    fireEvent.click(prevButton); // Go back to page 1

    const mealCards = screen.getAllByTestId('meal-card');
    expect(mealCards).toHaveLength(itemsPerPage);
    expect(mealCards[0]).toHaveTextContent('Spaghetti Carbonara');
    expect(screen.getByText(/Page 1 of/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Previous/i })).toBeDisabled();
  });

  test('"Next" button is disabled on the last page', () => {
    render(<App />);
    const nextButton = screen.getByRole('button', { name: /Next/i });
    const totalPages = Math.ceil(initialMealsCount / itemsPerPage);

    // Click "Next" until the last page
    for (let i = 1; i < totalPages; i++) {
      fireEvent.click(nextButton);
    }

    const mealCards = screen.getAllByTestId('meal-card');
    // The last page might have fewer items than itemsPerPage
    expect(mealCards.length).toBeGreaterThan(0); 
    expect(mealCards.length).toBeLessThanOrEqual(itemsPerPage); 

    expect(screen.getByText(`Page ${totalPages} of ${totalPages}`)).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
  });

  test('pagination resets to page 1 when a search term is applied', async () => {
    render(<App />);
    const user = userEvent.setup();
    const nextButton = screen.getByRole('button', { name: /Next/i });
    
    // Go to page 2
    fireEvent.click(nextButton);
    expect(screen.getByText(/Page 2 of/i)).toBeInTheDocument();

    // Target the search input within the main content area to avoid conflicts with a potential global search in a header
    const mainElement = screen.getByRole('main');
    const searchForm = mainElement.querySelector('form'); // Assuming the search form is the first form in main
    const searchInput = searchForm.querySelector('input[placeholder="Search by name or description..."]');
    const searchButton = searchForm.querySelector('button[type="submit"]');

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    await user.type(searchInput, 'Pizza');
    await user.click(searchButton);

    // Check if pagination reset to page 1 and controls are hidden
    const mealCards = screen.getAllByTestId('meal-card');
    expect(mealCards).toHaveLength(1); // Margherita Pizza
    expect(mealCards[0]).toHaveTextContent('Margherita Pizza');

    // Pagination controls should not be visible if only one page of results
    // and that page has fewer items than itemsPerPage
    expect(screen.queryByText(/Page 1 of 1/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Previous/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Next/i })).not.toBeInTheDocument();
  });

  test('displays "No meals found." when search yields no results', async () => {
    render(<App />);
    const user = userEvent.setup();
    const mainElement = screen.getByRole('main');
    const searchForm = mainElement.querySelector('form'); // Assuming the search form is the first form in main
    const searchInput = searchForm.querySelector('input[placeholder="Search by name or description..."]');
    const searchButton = searchForm.querySelector('button[type="submit"]');
    
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    await user.type(searchInput, 'NonExistentMeal');
    await user.click(searchButton);
    
    expect(screen.getByText(/No meals found./i)).toBeInTheDocument();
    // Pagination should not be visible
    expect(screen.queryByRole('button', { name: /Previous/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Next/i })).not.toBeInTheDocument();
  });

  test('filters meals by description', async () => {
    render(<App />);
    const user = userEvent.setup();
    const mainElement = screen.getByRole('main');
    const searchFormInMain = mainElement.querySelector('form'); // Ensure targeting form within main
    const searchInput = searchFormInMain.querySelector('input[placeholder="Search by name or description..."]');
    const searchButton = searchFormInMain.querySelector('button[type="submit"]');

    await user.type(searchInput, 'aromatic curry'); // "Chicken Curry" description: "A flavorful and aromatic curry."
    await user.click(searchButton);

    const mealCards = screen.getAllByTestId('meal-card');
    expect(mealCards).toHaveLength(1);
    expect(mealCards[0]).toHaveTextContent('Chicken Curry');
  });

  test('filters meals by a single ingredient', async () => {
    render(<App />);
    const user = userEvent.setup();
    // Wait for ingredients to be available
    const eggsCheckbox = await screen.findByLabelText(/eggs/i);
    await user.click(eggsCheckbox);

    const mealCards = screen.getAllByTestId('meal-card');
    // Expected: Spaghetti Carbonara, Pancakes, Chocolate Cake
    expect(mealCards).toHaveLength(3); 
    expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument();
    expect(screen.getByText('Pancakes')).toBeInTheDocument();
    expect(screen.getByText('Chocolate Cake')).toBeInTheDocument();
    // Pagination should not be visible for 3 items if itemsPerPage is 5
    expect(screen.queryByText(/Page 1 of 1/i)).not.toBeInTheDocument();
  });

  test('filters meals by multiple ingredients (AND logic)', async () => {
    render(<App />);
    const user = userEvent.setup();
    const pastaCheckbox = await screen.findByLabelText(/pasta/i);
    const eggsCheckbox = await screen.findByLabelText(/eggs/i);
    
    await user.click(pastaCheckbox);
    await user.click(eggsCheckbox); // Now pasta AND eggs selected

    const mealCards = screen.getAllByTestId('meal-card');
    expect(mealCards).toHaveLength(1);
    expect(mealCards[0]).toHaveTextContent('Spaghetti Carbonara');
  });

  test('deselecting an ingredient updates the filter', async () => {
    render(<App />);
    const user = userEvent.setup();
    const pastaCheckbox = await screen.findByLabelText(/pasta/i);
    const eggsCheckbox = await screen.findByLabelText(/eggs/i);

    // Select pasta and eggs
    await user.click(pastaCheckbox);
    await user.click(eggsCheckbox);
    let mealCards = screen.getAllByTestId('meal-card');
    expect(mealCards).toHaveLength(1); // Carbonara

    // Deselect eggs
    await user.click(eggsCheckbox);
    mealCards = screen.getAllByTestId('meal-card');
    // Expected: Only Spaghetti Carbonara (as it's the only one with "pasta" in its ingredients list)
    expect(mealCards).toHaveLength(1); 
    expect(mealCards[0]).toHaveTextContent('Spaghetti Carbonara'); 
  });
  
  test('combines text search with ingredient filter', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Filter by ingredient "chicken"
    // Use an exact match regex to avoid matching "chicken breast" if it existed as a separate ingredient
    const chickenCheckbox = await screen.findByLabelText(/^chicken$/i); 
    await user.click(chickenCheckbox);
    // Expected: Chicken Curry, Chicken Sandwich (2 items)
    let mealCards = screen.getAllByTestId('meal-card');
    expect(mealCards).toHaveLength(2);

    // Then, text search for "curry"
    const mainElement = screen.getByRole('main');
    const searchFormInMain = mainElement.querySelector('form');
    const searchInput = searchFormInMain.querySelector('input[placeholder="Search by name or description..."]');
    const searchButton = searchFormInMain.querySelector('button[type="submit"]');
    
    await user.type(searchInput, 'curry');
    await user.click(searchButton);

    mealCards = screen.getAllByTestId('meal-card');
    expect(mealCards).toHaveLength(1);
    expect(mealCards[0]).toHaveTextContent('Chicken Curry');
  });

  test('pagination resets when ingredient filter changes', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Go to page 2 initially (where "Margherita Pizza" is the first item)
    const nextButton = screen.getByRole('button', { name: /Next/i });
    await user.click(nextButton);
    expect(screen.getByText('Margherita Pizza')).toBeInTheDocument();
    expect(screen.getByText(/Page 2 of/i)).toBeInTheDocument();

    // Select an ingredient that will change the filter and result in fewer pages
    const eggsCheckbox = await screen.findByLabelText(/eggs/i);
    await user.click(eggsCheckbox);

    // Should reset to page 1, and pagination controls might disappear or show "Page 1 of 1"
    // Given 3 items with eggs and itemsPerPage=5, pagination controls should not be visible.
    const mealCards = screen.getAllByTestId('meal-card');
    expect(mealCards).toHaveLength(3);
    expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument(); // First item of filtered results
    
    expect(screen.queryByText(/Page \d+ of \d+/i)).not.toBeInTheDocument(); // No "Page X of Y"
    expect(screen.queryByRole('button', { name: /Previous/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Next/i })).not.toBeInTheDocument();
  });

});
