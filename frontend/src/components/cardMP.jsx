// components/CardMP.jsx
import { Star } from "lucide-react";

export default function CardMP({ name, photo, seller, rating }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img
        src={photo}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-green-700 mb-1">{name}</h2>
        <p className="text-sm text-gray-600 mb-1">Seller: {seller}</p>
        <div className="flex items-center text-yellow-500">
          {renderStars(rating)}
          <span className="ml-2 text-gray-700 text-sm">({rating})</span>
        </div>
      </div>
    </div>
  );
}

function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;

  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} size={16} fill="currentColor" stroke="none" />
      ))}
      {halfStar && <Star size={16} fill="currentColor" stroke="none" style={{ opacity: 0.5 }} />}
    </>
  );
}
