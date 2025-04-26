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

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

 

  const startListening = () => {

    const token = localStorage.getItem('token');

    if (!token) {
      alert("Please login first.");
      return;
    }

    if (!SpeechRecognition) {
      alert("Your browser does not support voice recognition!");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript.toLowerCase();
      console.log("Heard:", spokenText);

      const matchedPlant = cardsData.find(card =>
        spokenText.includes(card.plantName.toLowerCase())
      );

      if (matchedPlant) {
        const index = cardsData.indexOf(matchedPlant);
        handleAdd(index);
        alert(`✅ Added ${matchedPlant.plantName} to cart!`);
      } else {
        alert("❌ Could not recognize the plant name. Please try again!");
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();
  };

  const filteredcards = cardsData.filter((card) =>
    card.plantName.toLowerCase().includes(searchTerm.toLowerCase())
  );




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


      <div className="flex justify-end mb-6">
        <button 
          onClick={startListening}
          className="flex items-center border-2 border-green-300 hover:border-green-500 bg-transparent text-green-600 px-4 py-2 rounded-full shadow hover:scale-105 transition"
        >
          🎤 Speak to Add to cart
        </button>
      </div>


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
        className="bg-white rounded-2xl p-6 max-w-6xl w-full mx-auto shadow-2xl overflow-hidden"
        overlayClassName="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50"

      >
        {selectedCard && (
          <div className="flex flex-col lg:flex-row gap-8 overflow-hidden h-[80vh] p-3">
            {/* Left Side - Image and Actions */}
            <div className="flex-1 flex flex-col gap-6">
              <div className="bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center h-72 sm:h-96">
                <iframe
                  title={selectedCard.plantName}
                  src={selectedCard.image3DUrl}
                  frameBorder="0"
                  allow="autoplay; fullscreen; vr"
                  className="h-full w-full object-contain"
                ></iframe>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                <button
                  onClick={() => navigate("/cart")}
                  className="w-full sm:flex-1 border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold py-2 rounded-xl shadow-sm transition-transform transform hover:scale-105"
                >
                  Buy Now
                </button>

                <button
                  onClick={() => handleAdd(cardsData.indexOf(selectedCard))}
                  className="w-full sm:flex-1 border-2 border-blue-500 text-blue-500 hover:bg-blue-50 font-bold py-2 rounded-xl shadow-sm transition-transform transform hover:scale-105"
                >
                  <BsCart2 className="inline mr-2" />
                  Add to Cart
                </button>

                <button
                  onClick={() => handleRemove(cardsData.indexOf(selectedCard))}
                  className="w-full sm:flex-1 border-2 border-red-500 text-red-500 hover:bg-red-50 font-bold py-2 rounded-xl shadow-sm transition-transform transform hover:scale-105"
                >
                  Remove
                </button>
              </div>

              <div className="text-center font-semibold text-gray-700 text-lg">
                Quantity:{" "}
                {cartItems.find(
                  (item) => item.plantname === selectedCard?.plantname
                )?.count || 0}
              </div>
            </div>

            {/* Right Side - Details */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-2 pr-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 text-green-800">
                {selectedCard.plantName}
              </h1>

              <p className="text-gray-700 mb-6 text-base sm:text-lg">
                {selectedCard.description}
              </p>

              <div className="space-y-3 text-gray-800 text-sm sm:text-base">
                <p>
                  <span className="font-semibold">Scientific Name:</span>{" "}
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
                <p>
                  <span className="font-semibold">Medicinal Uses:</span>{" "}
                  {selectedCard.uses}
                </p>
              </div>

              <audio controls className="w-full mt-6 rounded-lg">
                <source
                  src={selectedCard.voiceDescriptionUrl}
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>

              <button
                onClick={closeModal}
                className="mt-8 border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold w-full py-3 rounded-xl shadow-sm transition-transform transform hover:scale-105 active:scale-95"
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
