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
    const searchInput = searchForm.querySelector('input[placeholder="Search for meals..."]');
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
    const searchInput = searchForm.querySelector('input[placeholder="Search for meals..."]');
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
});
