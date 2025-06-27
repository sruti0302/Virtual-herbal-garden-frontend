import React from "react";

const herbalPillars = [
  {
    title: "Herbal Origins",
    content:
      "Ancient cultures like Ayurveda and Amazonian tribes used herbs like neem and ginseng for healing.",
    tagline: "\"Healing traditions rooted in time.\"",
    icon: "🌱",
    bg: "bg-green-50",
  },
  {
    title: "Everyday Herbalism",
    content:
      "Herbs like chamomile and basil enhance meals and promote daily wellness.",
    tagline: "\"Wellness begins in the kitchen.\"",
    icon: "🍵",
    bg: "bg-yellow-50",
  },
  {
    title: "Mind-Body Harmony",
    content:
      "Herbs such as lavender and tulsi help reduce stress and boost mental clarity.",
    tagline: "\"Balance your mind, body, and spirit.\"",
    icon: "🌸",
    bg: "bg-pink-50",
  },
  {
    title: "Science Behind the Green",
    content:
      "Modern studies confirm herbs aid in immunity, inflammation, and well-being.",
    tagline: "\"Ancient wisdom meets modern science.\"",
    icon: "🧬",
    bg: "bg-indigo-50",
  },
  {
    title: "Grow & Connect",
    content:
      "Gardening herbs improves mood, air quality, and your connection to nature.",
    tagline: "\"Grow green, feel grounded.\"",
    icon: "🌿",
    bg: "bg-teal-50",
  },
];

export default function Features() {
  return (
    <section className="py-12 px-4 text-center">
      <h2 className="text-3xl font-bold text-green-700 mb-2">
        🌿 The Five Pillars of Herbal Living
      </h2>
      <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
        Dive deeper into the world of herbs and explore how they enrich our health, traditions, and connection to nature.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {herbalPillars.map((pillar, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl shadow-md text-left ${pillar.bg}`}
          >
            <h1 className="text-4xl text-center leading-snug">
              {pillar.icon}
            </h1>
            <h3 className="text-lg text-center font-semibold text-gray-800 mb-2">
            {pillar.title}
            </h3>
            <p className="text-sm text-justify text-gray-600 leading-snug">
              {pillar.content}
            </p>
            <p className="text-xs text-green-800 italic mt-2">
              {pillar.tagline}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
