import React, { useState } from 'react'

export default function SearchForm() {
  const [query, setQuery] = useState('') // State to store the input value

  const handleSubmit = (event) => {
    event.preventDefault() // Prevent the default form submission
    alert(`Searching for: ${query}`) // Display the search query in an alert
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-4">
      {/* Input Field */}
      <input
        type="text"
        placeholder="Search for meals..."
        value={query} // Bind the input value to the state
        onChange={(e) => setQuery(e.target.value)} // Update state on input change
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