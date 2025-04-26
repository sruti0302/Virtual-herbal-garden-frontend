const features = [
  {
    emoji: "🌿",
    title: "Ayurveda",
    description:
      "Harness the power of ancient Ayurvedic remedies to restore balance and vitality in your life.",
    tagline: "Find Your Balance",
    color: "bg-green-100",
  },
  {
    emoji: "🌱",
    title: "Unani",
    description:
      "Explore the time-tested Unani system that promotes holistic health with natural healing techniques.",
    tagline: "Holistic Healing",
    color: "bg-blue-100",
  },
  {
    emoji: "🌼",
    title: "Siddha",
    description:
      "Discover Siddha medicine, a traditional system that emphasizes balance and natural treatments.",
    tagline: "Ancient Wisdom, Modern Health",
    color: "bg-yellow-100",
  },
  {
    emoji: "💧",
    title: "Homeopathy",
    description:
      "Unlock the gentle power of Homeopathy to address ailments and improve overall well-being.",
    tagline: "Gentle, Effective Care",
    color: "bg-purple-100",
  },
  {
    emoji: "🧘",
    title: "Yoga & Naturopathy",
    description:
      "Embrace the union of body and mind through Yoga and natural therapies for a healthier you.",
    tagline: "Connect Mind & Body",
    color: "bg-pink-100",
  },
];

const Features = () => {
  return (
    <section className="px-6 py-16 bg-gradient-to-b from-green-50 to-white ">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-1">
        Let Nature Be Your Healer
      </h2>
      <p className="text-center text-xl mb-10">
        Discover centuries-old healing methods aimed at restoring balance,
        vitality, and inner harmony.
      </p>
      <div className="grid md:grid-cols-5 gap-10 mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`rounded-xl px-6 py-4 shadow hover:shadow-lg transition ${feature.color}`}
          >
            <div className="text-4xl text-center mb-4">{feature.emoji}</div>
            <h3 className="text-xl text-center font-bold mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-center">{feature.description}</p>
            <p className="text-center font-bold mt-2">{feature.tagline}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
