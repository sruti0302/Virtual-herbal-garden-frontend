import React, { useState } from 'react';
import Card from "../components/Card";
import Modal from 'react-modal';

const cardsData = [
  {
    image: "https://source.unsplash.com/400x300/?herbs",
    title: "Tulsi",
    description: "Boosts immunity and relieves stress naturally.",
    modelUrl: "https://sketchfab.com/models/c604e8f52c234f2e9259d895fe028819/embed?autospin=1", // Replace with actual Sketchfab embed URL
  },
  {
    image: "https://source.unsplash.com/400x300/?aloe-vera",
    title: "Aloe Vera",
    description: "Good for skin, digestion, and overall detox.",
    modelUrl: "https://sketchfab.com/models/abacab4588fe48108e2edba18b5a8db0/embed", // Replace with actual Sketchfab embed URL
  },
  {
    image: "https://source.unsplash.com/400x300/?neem",
    title: "Neem",
    description: "Powerful antibacterial and blood purifier.",
    modelUrl: "https://sketchfab.com/models/78ecb1acd520413ea6d8fd893d2895d1/embed", // Replace with actual Sketchfab embed URL
  },
];

function CardsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const openModal = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <section className="py-12 px-6 bg-green-50">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-10">
        Our Herbal Picks 🌱
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {cardsData.map((card, index) => (
          <div key={index} onClick={() => openModal(card)}>
            <Card
              image={card.image}
              title={card.title}
              description={card.description}
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Plant Details"
        className="bg-white p-6 rounded shadow-lg max-w-lg mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        {selectedCard && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{selectedCard.title}</h2>
            <p className="text-gray-700 mb-4">{selectedCard.description}</p>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                title={selectedCard.title}
                src={selectedCard.modelUrl}
                frameBorder="0"
                allow="autoplay; fullscreen; vr"
                className="w-full h-64"
              ></iframe>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-600 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </section>
  );
}

export default CardsSection;
