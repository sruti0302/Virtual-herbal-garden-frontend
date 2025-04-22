import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const GOOGLE_OAUTH_URL = "https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/oauth2/authorization/google";

const Hero = () => {


  const handleLogin = () => {
    window.location.href = GOOGLE_OAUTH_URL;
  };


  return (
    <section className="flex flex-col md:flex-row mt-[36vh] items-end justify-between px-18 py-16 gap-10">
      {/* Animated Heading */}
      <motion.div
        className="max-w-xl text-center md:text-left"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-zinc-200">
          Embrace Nature, Embrace Wellness
        </h1>
      </motion.div>

      <motion.div
        className="flex flex-col items-center md:items-end "
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
      >
        {/* Animated Subtext */}
        <motion.p
          className="text-gray-100 mb-6 text-center font-semibold md:text-right text-lg md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
        >
          Discover the finest organic herbs, ethically sourced <br /> and
          perfectly blended for your health journey.
        </motion.p>

        {/* Animated Buttons */}
        <div className="flex gap-2 items-center justify-center md:justify-end">
          <motion.button
            className="bg-green-600 text-white px-6 py-2 text-2xl rounded-md hover:bg-green-700 hover:scale-105 transition"
          >
            Get Started
          </motion.button>
          <motion.div
            
            whileTap={{ scale: 0.95 }}
            className="bg-transparent border-2 text-white px-6 py-2 text-2xl rounded-md hover:scale-105 transition"
            onClick={handleLogin}
          >
            <span>Login</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
