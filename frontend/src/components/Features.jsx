import { motion } from 'framer-motion';

const herbs = [
  {
    emoji: '🟠',
    name: 'Turmeric',
    scientific: 'Curcuma longa',
    benefit: 'Anti-inflammatory powerhouse used to ease joint pain and boost immunity.',
  },
  {
    emoji: '🟣',
    name: 'Lavender',
    scientific: 'Lavandula angustifolia',
    benefit: 'Calming herb that improves sleep, eases anxiety, and soothes headaches.',
  },
  {
    emoji: '🟢',
    name: 'Basil',
    scientific: 'Ocimum basilicum',
    benefit: 'Digestive support with antibacterial benefits; often used in teas.',
  },
  {
    emoji: '🟤',
    name: 'Cumin',
    scientific: 'Cuminum cyminum',
    benefit: 'Rich in bioactive peptides—known for antioxidant, antimicrobial, and blood sugar benefits.' /* :contentReference[oaicite:1]{index=1} */,
  },
  {
    emoji: '🟡',
    name: 'Ginger',
    scientific: 'Zingiber officinale',
    benefit: 'Classic remedy for nausea, digestion, inflammation, with cardiovascular perks.' /* :contentReference[oaicite:2]{index=2} */,
  },
];
function HealingHerbs() {
  return (
    <section className="px-6 py-20 bg-gradient-to-tr from-green-50 to-white">
      <motion.h2
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
        className="text-4xl font-extrabold text-center text-green-800 mb-8 uppercase"
      >
        Discover Healing Herbs
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {herbs.map((herb, i) => (
          <motion.div
            key={i}
            className="p-6 bg-white rounded-3xl shadow-lg group overflow-hidden relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.2, type: 'spring', stiffness: 200 }}
          >
            <motion.div
              className="text-6xl mb-4"
              whileHover={{ rotate: [0, 15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: 1 }}
            >
              {herb.emoji}
            </motion.div>

            <h3 className="text-2xl font-bold text-green-700 leading-tight mb-2">
              {herb.name}
            </h3>
            <p className="italic text-sm text-gray-500 mb-4">{herb.scientific}</p>
            <p className="text-gray-600 text-sm">{herb.benefit}</p>

            <motion.div
              className="absolute inset-x-6 bottom-6 h-1 bg-green-200 group-hover:bg-green-500 transition-all duration-500 rounded"
              initial={{ width: 0 }}
              whileHover={{ width: 'calc(100% - 48px)' }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default HealingHerbs;
