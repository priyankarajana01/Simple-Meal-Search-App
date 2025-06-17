import React from 'react';
import { Link } from 'react-router-dom'; // Add this import

export default function MainLayout({ children }) {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold"> {/* Changed to Link */}
            MealFinder
          </Link>
          {/* Navigation Links */}
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-gray-300"> {/* Changed to Link */}
                Home
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300"> {/* Keep as is for now */}
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300"> {/* Keep as is for now */}
                Contact
              </a>
            </li>
            <li> {/* Add new Register link */}
              <Link to="/register" className="hover:text-gray-300">
                Register
              </Link>
            </li>
            <li> {/* Add new Login link */}
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
            </li>
          </ul>
          {/* Search Form removed */}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {children}
      </main>
    </div>
  )
}
