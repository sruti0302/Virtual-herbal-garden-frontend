import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa"; // Import bookmark icons

function Card({ image, title, type, onBuyNow, onSave }) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (event) => {
    event.stopPropagation(); // Prevent the click event from propagating to the parent
    if (onSave) {
      setIsSaved(!isSaved);
      onSave({ image, title, type });
    } else {
      console.error("onSave is not defined");
    }
  };

  return (
    <div
      className="bg-white shadow-md rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
      onClick={onBuyNow} // Trigger the modal when the card is clicked
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-green-700">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{type}</p>
        <button
          className="mt-4 px-4 py-2 rounded bg-gray-200 text-gray-700 flex items-center"
          onClick={handleSave}
        >
          {isSaved ? (
            <FaBookmark className="text-green-500" /> // Filled bookmark icon
          ) : (
            <FaRegBookmark className="text-gray-700" /> // Outline bookmark icon
          )}
        </button>
      </div>
    </div>
  );
}

export default Card;
