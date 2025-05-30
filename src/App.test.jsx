import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import '@testing-library/jest-dom';

// Polyfill for TextEncoder and TextDecoder is moved to jest.setup.js

// Remove the mock for Card to test actual Link navigation
// jest.mock('../components/Card', () => ({
//   Card: ({ meal }) => <div data-testid="meal-card">{meal.title}</div>,
// }));

// Helper function to render with MemoryRouter
const renderWithRouter = (ui, { route = '/', initialEntries = [route] } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      {ui}
    </MemoryRouter>
  );
};


describe('App Component Functionality', () => {
  // Keep these constants if they are still relevant for non-routing specific tests
  // const initialMealsCount = 25; // Updated total meals
  const itemsPerPage = 5;

  // --- Existing tests, now wrapped with MemoryRouter ---
  test('displays the first page of items correctly and "Previous" button is disabled', () => {
    renderWithRouter(<App />);
    // Since Card is not mocked, we look for actual card content.
    // The test below for navigation will be more specific about card interaction.
    // For now, let's check for the presence of the first meal's title as a proxy for cards.
    expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument(); 
    // Check for multiple meal titles to estimate items per page
    expect(screen.getByText('Chicken Curry')).toBeInTheDocument();
    expect(screen.getByText('Vegan Burger')).toBeInTheDocument();
    expect(screen.getByText('Caesar Salad')).toBeInTheDocument();
    expect(screen.getByText('Beef Tacos')).toBeInTheDocument();

    // Assuming 25 meals, 5 pages. Page 1 of 5.
    expect(screen.getByText(/Page 1 of 5/i)).toBeInTheDocument(); 
    expect(screen.getByRole('button', { name: /Previous/i })).toBeDisabled();
  });

  test('clicking "Next" button displays the next set of items', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);

    // After clicking next, "Margherita Pizza" should be the first item on page 2
    expect(screen.getByText('Margherita Pizza')).toBeInTheDocument(); 
    expect(screen.getByText(/Page 2 of 5/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Previous/i })).not.toBeDisabled();
  });

  test('clicking "Previous" button displays the previous set of items', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton); // Go to page 2
    
    const prevButton = screen.getByRole('button', { name: /Previous/i });
    fireEvent.click(prevButton); // Go back to page 1

    expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument();
    expect(screen.getByText(/Page 1 of 5/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Previous/i })).toBeDisabled();
  });

  test('"Next" button is disabled on the last page', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: /Next/i });
    // Click "Next" 4 times to get to page 5
    for (let i = 0; i < 4; i++) {
      fireEvent.click(nextButton);
    }
    expect(screen.getByText(/Page 5 of 5/i)).toBeInTheDocument();
    // Verify content of the last page, e.g., "Vegetarian Chili"
    expect(screen.getByText("Vegetarian Chili")).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
  });

  test('pagination resets to page 1 when a search term is applied', async () => {
    renderWithRouter(<App />);
    const user = userEvent.setup();
    const nextButton = screen.getByRole('button', { name: /Next/i });
    
    // Go to page 2
    fireEvent.click(nextButton);
    expect(screen.getByText(/Page 2 of 5/i)).toBeInTheDocument();

    // Target the search input within the main content area to avoid conflicts with a potential global search in a header
    const mainElement = screen.getByRole('main');
    const searchForm = mainElement.querySelector('form');
    const searchInput = searchForm.querySelector('input[placeholder="Search by name or description..."]');
    const searchButton = searchForm.querySelector('button[type="submit"]');

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    await user.type(searchInput, 'Pizza');
    await user.click(searchButton);

    expect(screen.getByText('Margherita Pizza')).toBeInTheDocument();
    // Only one result for "Pizza", so no pagination controls
    expect(screen.queryByText(/Page 1 of 1/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Previous/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Next/i })).not.toBeInTheDocument();
  });

  test('displays "No meals found." when search yields no results', async () => {
    renderWithRouter(<App />);
    const user = userEvent.setup();
    const mainElement = screen.getByRole('main');
    const searchForm = mainElement.querySelector('form');
    const searchInput = searchForm.querySelector('input[placeholder="Search by name or description..."]');
    const searchButton = searchForm.querySelector('button[type="submit"]');
    
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    await user.type(searchInput, 'NonExistentMeal');
    await user.click(searchButton);
    
    expect(screen.getByText(/No meals found./i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Previous/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Next/i })).not.toBeInTheDocument();
  });

  test('filters meals by description', async () => {
    renderWithRouter(<App />);
    const user = userEvent.setup();
    const mainElement = screen.getByRole('main');
    const searchFormInMain = mainElement.querySelector('form');
    const searchInput = searchFormInMain.querySelector('input[placeholder="Search by name or description..."]');
    const searchButton = searchFormInMain.querySelector('button[type="submit"]');

    await user.type(searchInput, 'aromatic'); // Simplified search term
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Chicken Curry')).toBeInTheDocument();
    });
    expect(screen.queryByText('Spaghetti Carbonara')).not.toBeInTheDocument();
  });

  test('filters meals by a single ingredient', async () => {
    renderWithRouter(<App />);
    const user = userEvent.setup();
    const eggsCheckbox = await screen.findByLabelText(/eggs/i);
    await user.click(eggsCheckbox);

    expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument();
    expect(screen.getByText('Pancakes')).toBeInTheDocument();
    expect(screen.getByText('Chocolate Cake')).toBeInTheDocument();
    expect(screen.queryByText('Chicken Curry')).not.toBeInTheDocument();
    expect(screen.queryByText(/Page \d+ of \d+/i)).not.toBeInTheDocument();
  });

  test('filters meals by multiple ingredients (AND logic)', async () => {
    renderWithRouter(<App />);
    const user = userEvent.setup();
    const pastaCheckbox = await screen.findByLabelText(/^pasta$/i); // Exact match
    const eggsCheckbox = await screen.findByLabelText(/^eggs$/i); // Exact match
    
    await user.click(pastaCheckbox);
    await user.click(eggsCheckbox);

    expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument();
    expect(screen.queryByText('Pancakes')).not.toBeInTheDocument();
  });

  test('deselecting an ingredient updates the filter', async () => {
    renderWithRouter(<App />);
    const user = userEvent.setup();
    const pastaCheckbox = await screen.findByLabelText(/^pasta$/i); // Exact match
    const eggsCheckbox = await screen.findByLabelText(/^eggs$/i); // Exact match

    await user.click(pastaCheckbox);
    await user.click(eggsCheckbox); // Carbonara
    expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument();
    expect(screen.queryByText('Pancakes')).not.toBeInTheDocument();


    await user.click(eggsCheckbox); // Deselect eggs, only pasta selected
    expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument(); // Still Carbonara (only pasta dish)
    expect(screen.queryByText('Pancakes')).not.toBeInTheDocument();
  });
  
  test('combines text search with ingredient filter', async () => {
    renderWithRouter(<App />);
    const user = userEvent.setup();

    // "chicken breast" is a more likely unique ingredient from the data
    const chickenBreastCheckbox = await screen.findByLabelText(/^chicken breast$/i); // Exact match
    await user.click(chickenBreastCheckbox);
    // Meals containing "chicken breast": Chicken Curry, Chicken Sandwich, Chicken Alfredo
    expect(screen.getByText('Chicken Curry')).toBeInTheDocument();
    expect(screen.getByText('Chicken Sandwich')).toBeInTheDocument();
    expect(screen.getByText('Chicken Alfredo')).toBeInTheDocument();


    const mainElement = screen.getByRole('main');
    const searchFormInMain = mainElement.querySelector('form');
    const searchInput = searchFormInMain.querySelector('input[placeholder="Search by name or description..."]');
    const searchButton = searchFormInMain.querySelector('button[type="submit"]');
    
    await user.type(searchInput, 'curry');
    await user.click(searchButton);

    expect(screen.getByText('Chicken Curry')).toBeInTheDocument();
    expect(screen.queryByText('Chicken Sandwich')).not.toBeInTheDocument();
  });

  test('pagination resets when ingredient filter changes', async () => {
    renderWithRouter(<App />);
    const user = userEvent.setup();

    const nextButton = screen.getByRole('button', { name: /Next/i });
    await user.click(nextButton); // Go to Page 2
    expect(screen.getByText('Margherita Pizza')).toBeInTheDocument();
    expect(screen.getByText(/Page 2 of 5/i)).toBeInTheDocument();

    const eggsCheckbox = await screen.findByLabelText(/eggs/i);
    await user.click(eggsCheckbox);

    expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument(); // First item of filtered results
    // 3 items with "eggs", so no pagination
    expect(screen.queryByText(/Page \d+ of \d+/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Previous/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Next/i })).not.toBeInTheDocument();
  });

  // --- New Routing Tests ---
  describe('Routing and Navigation', () => {
    test('navigates to meal detail page on card click and displays meal title', async () => {
      renderWithRouter(<App />);
      const user = userEvent.setup();

      // Find the card for Spaghetti Carbonara (assuming it's on the first page)
      // Since Card is no longer mocked, we click on the text within the card that's part of the Link
      const carbonaraCardTitle = screen.getByText('Spaghetti Carbonara');
      await user.click(carbonaraCardTitle);
      
      // Wait for MealDetailPage to render and show the title as a heading
      // The title on the detail page is expected to be an h1
      const detailPageTitle = await screen.findByRole('heading', { name: /Spaghetti Carbonara/i, level: 1 });
      expect(detailPageTitle).toBeInTheDocument();
      // Check for a unique instruction step instead of formatted text
      expect(screen.getByText("Quickly combine pasta with guanciale. Then, off heat, mix in egg mixture, adding pasta water if too thick. Serve immediately.")).toBeInTheDocument();
    });

    test('direct navigation to meal detail page shows correct meal', async () => {
      renderWithRouter(<App />, { initialEntries: ['/meal/2'] }); // Chicken Curry
      
      const detailPageTitle = await screen.findByRole('heading', { name: /Chicken Curry/i, level: 1 });
      expect(detailPageTitle).toBeInTheDocument();
      // Check for a unique instruction step
      expect(screen.getByText("Pour in coconut milk and simmer until chicken is cooked through and sauce has thickened.")).toBeInTheDocument();
    });

    test('displays "Meal Not Found" for invalid meal ID', async () => {
      renderWithRouter(<App />, { initialEntries: ['/meal/999'] });
      
      expect(await screen.findByText(/Meal Not Found/i)).toBeInTheDocument();
    });

    test('"Back to All Meals" link on detail page navigates to main list', async () => {
      renderWithRouter(<App />, { initialEntries: ['/meal/1'] }); // Start on Carbonara detail page
      const user = userEvent.setup();

      // Ensure detail page is loaded
      expect(await screen.findByRole('heading', { name: /Spaghetti Carbonara/i, level: 1 })).toBeInTheDocument();

      const backLink = screen.getByRole('link', { name: /Back to All Meals/i });
      await user.click(backLink);

      // Verify main listing page is shown by checking for the search form within the main content area
      const mainElement = await screen.findByRole('main'); // Wait for main to ensure page transition
      const searchInputInMain = mainElement.querySelector('input[placeholder="Search by name or description..."]');
      expect(searchInputInMain).toBeInTheDocument();
      expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument(); // As a card title
    });
  });
});
