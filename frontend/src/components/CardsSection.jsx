import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Modal from "react-modal";
import { BsCart2 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CardsSection({ cartItems, setCartItems, onSave }) {
  const [cardsData, setCardsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
        const ids = bookmarks.map((b) => b.plant.id);
        setBookmarkedIds(ids);
      } catch (error) {
        console.error("Failed to fetch bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, []);

  // Fetch plant data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/plants/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCardsData(response.data);
      } catch (error) {
        console.error("Failed to fetch plant data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isModalOpen]);

  const openModal = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  const handleAdd = (index) => {
    const item = cardsData[index];
    const existingItem = cartItems.find(
      (cartItem) => cartItem.plantname === item.plantname
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.plantname === item.plantname
            ? { ...cartItem, count: cartItem.count + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, count: 1 }]);
    }
  };

  const handleRemove = (index) => {
    const item = cardsData[index];
    const existingItem = cartItems.find(
      (cartItem) => cartItem.plantname === item.plantname
    );

    if (existingItem && existingItem.count > 1) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.plantname === item.plantname
            ? { ...cartItem, count: cartItem.count - 1 }
            : cartItem
        )
      );
    } else {
      setCartItems(
        cartItems.filter((cartItem) => cartItem.plantname !== item.plantname)
      );
    }
  };
  const filteredCards = cardsData.filter((card) =>
    card.plantName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <section className="py-12 px-6 bg-green-50 relative">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-10">
        Our Herbal Picks 🌱
      </h2>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search plants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filteredCards.map((card, index) => (
          <Card
            id={card.id}
            key={card.id}
            image={card.imageUrl}
            title={card.plantName}
            type={card.plantType}
            count={
              cartItems.find((item) => item.plantname === card.plantname)
                ?.count || 0
            }
            onAdd={() => handleAdd(index)}
            onRemove={() => handleRemove(index)}
            onBuyNow={() => openModal(card)}
            onSave={() => onSave(card)}
            isInitiallyBookmarked={bookmarkedIds.includes(card.id)}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Plant Details"
        className="bg-white p-4 sm:p-6 rounded shadow-lg max-w-6xl mx-auto"
        overlayClassName="fixed inset-0 backdrop-filter backdrop-blur-md bg-opacity-50 flex justify-center items-center border-0"
        style={{ overlay: { overflow: "hidden", zIndex: 9999 } }}
      >
        {selectedCard && (
          <div className="flex flex-col lg:flex-row p-4 w-full max-w-5xl h-[80vh] sm:h-[70vh] overflow-hidden bg-white rounded-lg ">
            <div className="w-full lg:w-1/2 flex flex-col gap-4 overflow-x-auto lg:overflow-y-auto pr-0 lg:pr-4">
              <div className="bg-gray-100 h-64 sm:h-80 flex items-center justify-center">
                <iframe
                  title={selectedCard.plantName}
                  src={selectedCard.image3DUrl}
                  frameBorder="0"
                  allow="autoplay; fullscreen; vr"
                  className="h-full object-contain w-full"
                ></iframe>
              </div>
              <div className="flex flex-col items-center gap-4 mt-6 lg:items-start">
                <button
                  onClick={() => navigate("/cart")}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 sm:px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 w-full sm:w-auto"
                >
                  Buy Now
                </button>
                <div className="flex items-center gap-2 sm:gap-4">
                  <button
                    onClick={() => handleAdd(cardsData.indexOf(selectedCard))}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                  >
                    <BsCart2 className="inline font-extrabold" /> &nbsp; Add to
                    Cart
                  </button>
                  <button
                    onClick={() =>
                      handleRemove(cardsData.indexOf(selectedCard))
                    }
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-base sm:text-lg font-semibold text-gray-800">
                  Quantity:{" "}
                  {cartItems.find(
                    (item) => item.plantname === selectedCard?.plantname
                  )?.count || 0}
                </p>
              </div>
            </div>

            <div className="w-full lg:w-1/2 overflow-y-auto p-4 bg-white rounded shadow mt-4 lg:mt-0 h-full">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                {selectedCard.plantName}
              </h1>
              <p className="mb-4 text-sm sm:text-base text-gray-700">
                {selectedCard.description}
              </p>
              <p>
                <span className="font-semibold">Scientific name: </span>{" "}
                <i>{selectedCard.scientificName}</i>
              </p>
              <p>
                <span className="font-semibold">Region:</span>{" "}
                {selectedCard.region}
              </p>
              <p>
                <span className="font-semibold">Type:</span>{" "}
                {selectedCard.plantType}
              </p>
              <p className="mb-4">
                <span className="font-semibold">Medicinal uses:</span>{" "}
                {selectedCard.uses}
              </p>
              <audio controls className="mb-4 w-full">
                <source
                  src={selectedCard.voiceDescriptionUrl}
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>

              <button
                onClick={closeModal}
                className="mt-8 w-full py-3 bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {cartItems.length > 0 && (
        <div
          className="fixed bottom-8 left-8 bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <BsCart2 size={24} />
          <span className="ml-2 text-lg font-bold">
            {cartItems.reduce((total, item) => total + item.count, 0)}
          </span>
        </div>
      )}
    </section>
  );
}

export default CardsSection;
