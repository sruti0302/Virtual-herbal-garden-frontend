import React from "react";

function Card({ image, title, type, onAdd, onRemove, count, onBuyNow }) {
  return (
    <div
      className="bg-white shadow-md rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
      onClick={onBuyNow} // Trigger the modal when the card is clicked
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-green-700">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{type}</p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the modal
                onRemove();
              }}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              -
            </button>
            <span className="text-lg font-bold">{count}</span>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the modal
                onAdd();
              }}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              +
            </button>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the modal
              // Add any additional logic for "Buy Now" here
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
