import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa"; // Import bookmark icons
import axios from 'axios';


function Card({ id,image, title, type, onBuyNow, onSave }) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async (event) => {
    event.stopPropagation();
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);
  
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }
  
    try {
      if (!isSaved) {
        // Add bookmark
        await axios.post(
          `https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/bookmarks/add/${id}`,
          {
            plantId: id
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        );
        setIsSaved(true);
        console.log("Bookmark added successfully");
      } else {
        // Remove bookmark
        await axios.delete(
          `https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/bookmarks/remove/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        );
        setIsSaved(false);
        console.log("Bookmark removed successfully");
      }
    } catch (error) {
      console.error("Bookmark toggle failed:", error);
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
