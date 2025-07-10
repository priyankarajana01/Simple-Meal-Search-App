import React from 'react';

const ContactPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-white mb-10">
          Contact Us
        </h1>

        <div className="bg-gray-800 shadow-xl rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">Get in Touch</h2>
          <p className="text-gray-300 mb-6">
            We'd love to hear from you! Whether you have a question about our meal finder, feedback, or suggestions,
            feel free to reach out to us.
          </p>
          <p className="text-gray-300">
            <strong>Email:</strong> <a href="mailto:contact@mealfinder.com" className="text-blue-400 hover:text-blue-300">contact@mealfinder.com</a>
          </p>
          {/* Placeholder for a contact form or more contact details */}
        </div>

        <div className="bg-gray-800 shadow-xl rounded-lg p-8">
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">Our Address</h2>
          <p className="text-gray-300">
            MealFinder Headquarters
            <br />
            123 Culinary Avenue
            <br />
            Foodie City, FC 54321
            <br />
            (Note: This is a fictional address.)
          </p>
        </div>

        {/* You can add a simple contact form component here later if needed */}
        {/* For example:
        <div className="mt-8 bg-gray-800 shadow-xl rounded-lg p-8">
          <h2 className="text-2xl font-bold text-yellow-500 mb-6">Send Us a Message</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
              <input type="text" id="name" name="name" className="w-full p-3 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="email_contact" className="block text-gray-300 mb-2">Email</label>
              <input type="email" id="email_contact" name="email" className="w-full p-3 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
              <textarea id="message" name="message" rows="4" className="w-full p-3 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150"
            >
              Send Message
            </button>
          </form>
        </div>
        */}
      </div>
    </div>
  );
};

export default ContactPage;
