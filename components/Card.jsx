export function Card({ image, title, description }) {   
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 text-white">
        <img
          className="w-full"
          src={image}
          alt="Meal"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-300 text-base">
            {description}
          </p>
        </div>
      </div>
    )
}