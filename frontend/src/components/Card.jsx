import React, { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import axios from "axios";

function Card({ id, image, title, type, onBuyNow,isInitiallyBookmarked }) {
  const [isSaved, setIsSaved] = useState(isInitiallyBookmarked || false);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(
          "https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/bookmarks/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const bookmarks = response.data;
        const bookmarkedPlantIds = bookmarks.map((b) => b.plant.id);
        setIsSaved(bookmarkedPlantIds.includes(id));
      } catch (error) {
        console.error("Failed to fetch bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, [id]);

  const handleSave = async (event) => {
    event.stopPropagation();
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    try {
      if (!isSaved) {
        await axios.post(
          `https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/bookmarks/add/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setIsSaved(true);
      } else {
        await axios.delete(
          `https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/bookmarks/remove/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setIsSaved(false);
      }
    } catch (error) {
      console.error("Bookmark toggle failed:", error);
    }
  };

  return (
    <div
      className="bg-white shadow-md rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
      onClick={onBuyNow}
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
            <FaBookmark className="text-green-500" />
          ) : (
            <FaRegBookmark className="text-gray-700" />
          )}
        </button>
      </div>
    </div>
  );
}

export default Card;
