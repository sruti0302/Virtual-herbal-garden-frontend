import React, { useState, useEffect } from "react";
import Card from "./Card";
import Modal from "react-modal";
import { BsCart2 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Navbar from "./Navbar";

function Marketplace({ cartItems, setCartItems, onSave }) {
  const [cardsData, setCardsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const startListening = () => {
    const token = localStorage.getItem("token");

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
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript.toLowerCase();
      console.log("Heard:", spokenText);

      const matchedPlant = cardsData.find((card) =>
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
    document.body.classList.toggle("modal-open", isModalOpen);
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
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, count: cartItem.count + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          id: item.id,
          plantName: item.plantName,
          image: item.imageUrl,
          type: item.plantType,
          count: 1,
          price: item.price || 10,
        },
      ]);
    }
  };

  const handleRemove = (index) => {
    const item = cardsData[index];
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem && existingItem.count > 1) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, count: cartItem.count - 1 }
            : cartItem
        )
      );
    } else {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    }
  };

  const filteredCards = cardsData.filter((card) =>
    card.plantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-700">🌿 FloraMed</h1>
          <div className="flex gap-6 text-gray-700 text-base font-medium">
            <button
              onClick={() => navigate("/")}
              className="hover:text-green-700 transition"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="hover:text-green-700 transition"
            >
              Cart
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-700 mb-10 text-center tracking-tight">
          Shop Herbal Products
        </h1>

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

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredCards && filteredCards.length > 0 ? (
            filteredCards.map((card, index) => (
              <Card
                id={card.id}
                key={card.id}
                image={card.imageUrl}
                title={card.plantName}
                type={card.plantType}
                count={
                  cartItems.find((item) => item.id === card.id)?.count || 0
                }
                onAdd={() => handleAdd(index)}
                onRemove={() => handleRemove(index)}
                onBuyNow={() => openModal(card)}
                onSave={() => onSave(card)}
                isInitiallyBookmarked={bookmarkedIds.includes(card.id)}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 text-lg py-20">
              No products available.
            </div>
          )}
        </div>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Plant Details"
          className="bg-white rounded-2xl px-4 md:px-6 py-6 max-w-6xl w-full mx-auto shadow-xl"
          overlayClassName="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
        >
          {selectedCard && (
            <div className="flex flex-col lg:flex-row gap-8 h-[80vh] overflow-hidden">
              <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 rounded-xl p-4 h-72 lg:h-full">
                <iframe
                  title={selectedCard.plantName}
                  src={selectedCard.image3DUrl}
                  frameBorder="0"
                  allow="autoplay; fullscreen; vr"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

              <div className="w-full lg:w-1/2 flex flex-col justify-between overflow-y-auto">
                <div className="px-1 lg:px-2 space-y-4">
                  <h1 className="text-2xl md:text-3xl font-semibold text-green-800">
                    {selectedCard.plantName}
                  </h1>

                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    {selectedCard.description}
                  </p>

                  <div className="space-y-3 text-sm md:text-base text-gray-800">
                    <p>
                      <span className="font-medium">🌿 Scientific Name:</span>{" "}
                      <i>{selectedCard.scientificName}</i>
                    </p>
                    <p>
                      <span className="font-medium">📍 Region:</span>{" "}
                      {selectedCard.region}
                    </p>
                    <p>
                      <span className="font-medium">🧬 Type:</span>{" "}
                      {selectedCard.plantType}
                    </p>
                    <p>
                      <span className="font-medium">💊 Medicinal Uses:</span>{" "}
                      {selectedCard.uses}
                    </p>
                  </div>

                  {selectedCard.voiceDescriptionUrl && (
                    <audio className="w-full mt-4 rounded-md border border-gray-300">
                      <source
                        src={selectedCard.voiceDescriptionUrl}
                        type="audio/mpeg"
                      />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>

                <div className="mt-6">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button
                      onClick={() => {
                        const existingItem = cartItems.find(
                          (item) => item.id === selectedCard.id
                        );

                        if (existingItem) {
                          setCartItems(
                            cartItems.map((item) =>
                              item.id === selectedCard.id
                                ? { ...item, count: item.count + 1 }
                                : item
                            )
                          );
                        } else {
                          setCartItems([
                            ...cartItems,
                            {
                              id: selectedCard.id,
                              image: selectedCard.imageUrl,
                              title: selectedCard.plantName,
                              type: selectedCard.plantType,
                              count: 1,
                              price: selectedCard.price || 10,
                            },
                          ]);
                        }

                        navigate("/cart");
                      }}
                      className="w-full sm:flex-1 border border-green-600 text-green-600 hover:bg-green-50 py-2 rounded-xl font-medium transition hover:scale-105"
                    >
                      Buy Now
                    </button>

                    <button
                      onClick={() => handleAdd(cardsData.indexOf(selectedCard))}
                      className="w-full sm:flex-1 border border-blue-500 text-blue-500 hover:bg-blue-50 py-2 rounded-xl font-medium transition hover:scale-105"
                    >
                      <BsCart2 className="inline mr-1 mb-1" />
                      Add to Cart
                    </button>

                    <button
                      onClick={() =>
                        handleRemove(cardsData.indexOf(selectedCard))
                      }
                      className="w-full sm:flex-1 border border-red-500 text-red-500 hover:bg-red-50 py-2 rounded-xl font-medium transition hover:scale-105"
                    >
                      Remove
                    </button>
                  </div>

                  <p className="mt-4 text-center text-sm font-semibold text-gray-700">
                    Quantity:{" "}
                    {cartItems.find((item) => item.id === selectedCard.id)
                      ?.count || 0}
                  </p>

                  <button
                    onClick={closeModal}
                    className="mt-6 w-full border border-gray-400 text-gray-600 hover:bg-gray-100 py-2 rounded-xl font-medium transition hover:scale-105"
                  >
                    Close
                  </button>
                </div>
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
      </main>
    </div>
  );
}

export default Marketplace;
