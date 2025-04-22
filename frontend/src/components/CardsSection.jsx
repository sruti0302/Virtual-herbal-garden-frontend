import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Modal from "react-modal";
import { BsCart2 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const cardsData = [
  {
    image:
      "https://i.pinimg.com/736x/7b/47/c9/7b47c927867aa549f5603e623f1e4ab1.jpg",
    title: "Tulsi",
    type: "Herb",
    scientificname: "Ocimum tenuiflorum",
    uses: "Stress Relief: Known for its adaptogenic properties, reducing stress and anxiety. Immune Booster: Enhances immune function and overall health. Anti-inflammatory: Reduces inflammation and pain. Respiratory Health: Supports respiratory function and alleviates coughs.",
    region: "Tropical",
    description:
      "Tulsi is a sacred herb in Hinduism, known for its medicinal properties and spiritual significance.",
    modelUrl:
      "https://sketchfab.com/models/c604e8f52c234f2e9259d895fe028819/embed?autospin=1",
  },
  {
    image:
      "https://i.pinimg.com/736x/06/e5/5f/06e55f79570c3a7a870d21418e40a37c.jpg",
    title: "Aloe Vera",
    type: "Succulent",
    scientificname: "Aloe barbadensis",
    uses: "Aloe vera is renowned for its wide range of health benefits: Skin Care: Helps soothe burns, wounds, and sunburns. Anti-inflammatory: Reduces inflammation in the skin and joints. Digestive Aid: Aloe juice helps relieve constipation and promotes digestion. Immune System: Contains antioxidants that boost immunity. Wound Healing: Accelerates the healing of cuts and abrasions. Anti-aging: Used in cosmetics for moisturizing and reducing wrinkles. Hair Care: Promotes hair growth and treats scalp conditions.",
    region: "Tropical",
    description:
      "Aloe vera is a succulent plant valued for its medicinal properties, especially for skin care, wound healing, and digestion. It has been used in Ayurveda and traditional medicine systems for centuries.",
    modelUrl:
      "https://sketchfab.com/models/abacab4588fe48108e2edba18b5a8db0/embed",
  },
  {
    image:
      "https://i.pinimg.com/736x/78/eb/43/78eb43504733cfc82d7c114140e3dcb0.jpg",
    title: "Neem",
    type: "Tree",
    scientificname: "Azadirachta indica",
    uses: "Antibacterial: Effective against various bacteria and fungi. Anti-inflammatory: Reduces inflammation and pain. Skin Health: Used in skin care for acne and eczema. Blood Sugar Regulation: May help regulate blood sugar levels.",
    region: "Tropical",
    description:
      "Neem is a medicinal tree known for its antibacterial and anti-inflammatory properties.",
    modelUrl:
      "https://sketchfab.com/models/78ecb1acd520413ea6d8fd893d2895d1/embed",
  },
  {
    image:
      "https://i.pinimg.com/736x/95/04/a5/9504a522ea4cc4385a3b6910b470dbc2.jpg",
    title: "Lavender",
    type: "Flowering Plant",
    scientificname: "Lavandula",
    uses: "Relaxation: Known for its calming and stress-relieving properties. Skin Care: Helps soothe skin irritations and acne. Sleep Aid: Promotes better sleep quality.",
    region: "Mediterranean",
    description:
      "Lavender is a flowering plant known for its aromatic fragrance and therapeutic properties.",
    modelUrl: "https://sketchfab.com/models/your-model-id/embed",
  },
  {
    image:
      "https://i.pinimg.com/736x/8a/f8/f5/8af8f56d43b13bf3c1423f591061a1e0.jpg",
    title: "Peppermint",
    type: "Herb",
    scientificname: "Mentha × piperita",
    uses: "Digestive Health: Relieves indigestion and bloating. Respiratory Health: Helps alleviate symptoms of colds and congestion. Pain Relief: Provides a cooling sensation for headaches and muscle pain.",
    region: "Temperate",
    description:
      "Peppermint is a hybrid mint plant known for its refreshing aroma and medicinal uses.",
    modelUrl: "https://sketchfab.com/models/your-model-id/embed",
  },
  {
    image:
      "https://i.pinimg.com/736x/05/45/e2/0545e28f9a6b91773b685ebd20f0cdd3.jpg",
    title: "Rosemary",
    type: "Herb",
    scientificname: "Salvia rosmarinus",
    uses: "Memory Booster: Improves concentration and memory. Antioxidant: Protects cells from damage. Culinary Use: Adds flavor to dishes.",
    region: "Mediterranean",
    description:
      "Rosemary is a fragrant herb commonly used in cooking and traditional medicine.",
    modelUrl: "https://sketchfab.com/models/your-model-id/embed",
  },
  {
    image:
      "https://i.pinimg.com/736x/6d/ae/ae/6daeaeead1207a8262c7b083fc89168b.jpg",
    title: "Ginger",
    type: "Rhizome",
    scientificname: "Zingiber officinale",
    uses: "Digestive Health: Relieves nausea and indigestion. Anti-inflammatory: Reduces inflammation and pain. Immune Booster: Helps fight colds and infections.",
    region: "Tropical",
    description:
      "Ginger is a rhizome widely used for its medicinal and culinary properties.",
    modelUrl: "https://sketchfab.com/models/your-model-id/embed",
  },
  {
    image:
      "https://i.pinimg.com/736x/3f/a6/36/3fa63617bc4e7e85ea910eed81342f8c.jpg",
    title: "Chamomile",
    type: "Flowering Plant",
    scientificname: "Matricaria chamomilla",
    uses: "Sleep Aid: Promotes relaxation and better sleep. Digestive Health: Relieves stomach cramps and indigestion. Skin Health: Soothes skin irritations and eczema.",
    region: "Temperate",
    description:
      "Chamomile is a flowering plant known for its calming properties and use in herbal teas.",
    modelUrl: "https://sketchfab.com/models/your-model-id/embed",
  },
];

function CardsSection({ cartItems, setCartItems }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

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
      (cartItem) => cartItem.title === item.title
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.title === item.title
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
      (cartItem) => cartItem.title === item.title
    );

    if (existingItem && existingItem.count > 1) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.title === item.title
            ? { ...cartItem, count: cartItem.count - 1 }
            : cartItem
        )
      );
    } else {
      setCartItems(
        cartItems.filter((cartItem) => cartItem.title !== item.title)
      );
    }
  };

  return (
    <section className="py-12 px-6 bg-green-50 relative">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-10">
        Our Herbal Picks 🌱
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            title={card.title}
            type={card.type}
            count={
              cartItems.find((item) => item.title === card.title)?.count || 0
            }
            onAdd={() => handleAdd(index)}
            onRemove={() => handleRemove(index)}
            onBuyNow={() => openModal(card)}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Plant Details"
        className="bg-white p-6 rounded shadow-lg max-w-6xl mx-auto"
        overlayClassName="fixed inset-0 backdrop-filter backdrop-blur-md bg-opacity-50 flex justify-center items-center border-0"
        style={{ overlay: { overflow: "hidden", zIndex: 9999 } }}
      >
        {selectedCard && (
          <div className="flex flex-col lg:flex-row p-4 w-full max-w-5xl h-[80vh] overflow-hidden bg-white rounded-lg shadow-lg">
            <div className="w-full lg:w-1/2 flex flex-col gap-4 overflow-x-auto lg:overflow-y-auto pr-0 lg:pr-4">
              <div className="bg-gray-100 h-80 flex items-center justify-center">
                <iframe
                  title={selectedCard.title}
                  src={selectedCard.modelUrl}
                  frameBorder="0"
                  allow="autoplay; fullscreen; vr"
                  className="h-full object-contain w-full"
                ></iframe>
              </div>
              <div className="flex gap-6 place-items-center justify-center mt-10">
                <button
                  onClick={() => {
                    navigate("/cart"); // Redirect to the cart page
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => handleAdd(cardsData.indexOf(selectedCard))}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
                >
                  <BsCart2 className="inline font-extrabold" /> &nbsp; Add to
                  cart
                </button>
                <button
                  onClick={() => handleRemove(cardsData.indexOf(selectedCard))}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
                >
                  Remove from cart
                </button>
              </div>
            </div>

            <div className="w-full lg:w-1/2 overflow-y-auto p-4 bg-white rounded shadow mt-4 lg:mt-0 h-full">
              <h1 className="text-3xl font-bold mb-2">{selectedCard.title}</h1>
              <p className="mb-4 text-gray-700">{selectedCard.description}</p>
              <p>
                <span className="font-semibold">Scientific name: </span>{" "}
                <i>{selectedCard.scientificname}</i>
              </p>
              <p>
                <span className="font-semibold">Region:</span>{" "}
                {selectedCard.region}
              </p>
              <p>
                <span className="font-semibold">Type:</span> {selectedCard.type}
              </p>
              <p className="mb-4">
                <span className="font-semibold">Medicinal uses:</span>{" "}
                {selectedCard.uses}
              </p>
              <audio controls className="mb-4 w-full">
                <source src="/path-to-audio.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        )}
      </Modal>

      <div
        className="fixed bottom-8 right-8 bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center cursor-pointer"
        onClick={() => navigate("/cart")}
      >
        <BsCart2 size={24} />
        <span className="ml-2 text-lg font-bold">
          {cartItems.reduce((total, item) => total + item.count, 0)}
        </span>
      </div>
    </section>
  );
}

export default CardsSection;
