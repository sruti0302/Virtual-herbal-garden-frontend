import React from 'react'
import Card from "../components/Card";
const cardsData = [
    {
      image: "https://source.unsplash.com/400x300/?herbs",
      title: "Tulsi",
      description: "Boosts immunity and relieves stress naturally.",
    },
    {
      image: "https://source.unsplash.com/400x300/?aloe-vera",
      title: "Aloe Vera",
      description: "Good for skin, digestion, and overall detox.",
    },
    {
      image: "https://source.unsplash.com/400x300/?neem",
      title: "Neem",
      description: "Powerful antibacterial and blood purifier.",
    },
  ];

function CardsSection() {
  return (
    <section className="py-12 px-6 bg-green-50">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-10">
        Our Herbal Picks 🌱
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </section>
  )
}

export default CardsSection
