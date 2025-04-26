import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Herbal Enthusiast",
    rating: 5,
    comment: "FloraMed has transformed my wellness journey! Love the community and the 3D models.",
    imgUrl: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Dr. Meera Patel",
    role: "Professional Herbalist",
    rating: 4,
    comment: "Great platform to connect with herbal lovers and showcase my products.",
    imgUrl: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Rajiv Menon",
    role: "Elite Member",
    rating: 5,
    comment: "Amazing access to premium herbs and consultations. Highly recommended!",
    imgUrl: "https://i.pravatar.cc/150?img=3",
  },
];

// Motion variants
const cardVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
};

const starsContainer = {
  rest: {},
  hover: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const starItem = {
  rest: { scale: 1 },
  hover: { scale: 1.3 },
};

export default function Testimonials() {
  return (
    <section className="bg-gradient-to-t from-green-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-12">
          What Our Users Say
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              className="rounded-2xl shadow-md p-8 bg-white"
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <img
                src={testimonial.imgUrl}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold text-green-700">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.role}</p>

              {/* Stars Container */}
              <motion.div
                className="flex justify-center my-4 gap-1"
                variants={starsContainer}
              >
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <motion.div key={i} variants={starItem}>
                    <FaStar className="text-yellow-300 px-0.5 " size={20} />
                  </motion.div>
                ))}
              </motion.div>

              <p className="text-gray-600">{testimonial.comment}</p>
            </motion.div>
          ))}
        </div>
        
      </div>
      <div className="my-8 border-t border-green-200 m-6" />
    </section>
  );
}
