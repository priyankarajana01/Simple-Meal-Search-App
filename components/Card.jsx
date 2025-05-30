import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export function Card({ meal }) {
    const { id, image, title, description } = meal; // Destructure id
    return (
      <Link to={`/meal/${id}`} className="block hover:no-underline focus:no-underline"> {/* Ensure link covers the card and reset underline */}
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 text-white h-full flex flex-col"> {/* Added h-full and flex for consistent height if in a grid */}
          <img
            className="w-full h-48 object-cover" // Fixed height for image
            src={image}
            alt={title} // Use meal title for alt text
          />
          <div className="px-6 py-4 flex-grow"> {/* flex-grow to push content if card heights vary */}
            <div className="font-bold text-xl mb-2">{title}</div>
            <p className="text-gray-300 text-base">
              {description}
            </p>
          </div>
        </div>
      </Link>
    )
}

Card.propTypes = {
  meal: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired, // Assuming description is still a simple string
    image: PropTypes.string.isRequired,
    // Note: The Card component doesn't use the other detailed props from the enriched meal data,
    // so they are not strictly needed in its propTypes here unless it starts displaying them.
    // For now, keeping it simple as per current Card usage.
  }).isRequired
};