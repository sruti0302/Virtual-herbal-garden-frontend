import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { BsCart2 } from "react-icons/bs";
import Card from "./Card"; // adjust path if needed
import Navbar from "./Navbar";
import Footer from "./Footer";


Modal.setAppElement("#root");

const MyHerbs = () => {
  const [cardsData, setCardsData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookmarkedPlants = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/bookmarks/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const formatted = response.data.map((item) => item.plant);
        setCardsData(formatted);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchBookmarkedPlants();
  }, []);

  const handleAdd = (index) => {
    const plant = cardsData[index];
    setCartItems((prev) => {
      const existing = prev.find((item) => item.plantname === plant.plantName);
      if (existing) {
        return prev.map((item) =>
          item.plantname === plant.plantName
            ? { ...item, count: item.count + 1 }
            : item
        );
      } else {
        return [...prev, { plantname: plant.plantName, count: 1 }];
      }
    });
  };

  const handleRemove = (index) => {
    const plant = cardsData[index];
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.plantname === plant.plantName
            ? { ...item, count: item.count - 1 }
            : item
        )
        .filter((item) => item.count > 0)
    );
  };

  const openModal = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <>
    <Navbar className="text-whitebg-gradient-to-l from-green-800 to-green-500"/>
    <div className="min-h-screen">
    <h2 className="text-3xl font-bold text-center text-green-800 mb-10 mt-10">
        Your Bookmarks 🌱
      </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-10 ">
      {cardsData.map((card, index) => (
        <Card
          key={card.id}
          id={card.id}
          image={card.imageUrl}
          title={card.plantName}
          type={card.plantType}
          count={
            cartItems.find((item) => item.plantname === card.plantName)
              ?.count || 0
          }
          onAdd={() => handleAdd(index)}
          onRemove={() => handleRemove(index)}
          onBuyNow={() => openModal(card)}
          onSave={() => {}}
          isInitiallyBookmarked={true}
        />
      ))}

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
              
            </div>

            <div className="w-full lg:w-1/2 overflow-y-auto p-4 bg-white rounded shadow mt-4 lg:mt-0 h-full">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                {selectedCard.plantName}
              </h1>
              <p className="mb-4 text-sm sm:text-base text-gray-700">
                {selectedCard.description}
              </p>
              <p>
                <span className="font-semibold">Scientific name: </span>
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
            </div>
          </div>
        )}
      </Modal>
    </div>
    </div>
    <Footer className=""/>
    </>
  );
};

export default MyHerbs;
