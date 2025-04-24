import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const GOOGLE_OAUTH_URL =
  "https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/oauth2/authorization/google";

const Hero = () => {
  const handleLogin = () => {
    window.location.href = GOOGLE_OAUTH_URL;
  };

  return (
    <section className="flex flex-col md:flex-row mt-[20vh] md:mt-[36vh] items-end justify-between px-6 md:px-18 py-10 md:py-16 gap-6 md:gap-10">
      {/* Animated Heading */}
      <motion.div
        className="max-w-xl text-center md:text-left"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1
          className="text-4xl md:text-6xl font-semibold leading-tight text-zinc-200"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Embrace Nature, Embrace Wellness
        </h1>
      </motion.div>

      <motion.div
        className="flex flex-col items-center md:items-end gap-4"
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        {/* Animated Subtext */}
        <motion.p
          className="text-gray-100 text-center md:text-right text-base md:text-xl font-medium"
          style={{ fontFamily: "'Poppins', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          Discover the finest organic herbs, ethically sourced <br /> and
          perfectly blended for your health journey.
        </motion.p>

        {/* Login Button */}
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="bg-green-600 text-white px-4 py-2 text-lg md:text-2xl rounded-md hover:bg-green-700 hover:scale-105 transition"
          onClick={handleLogin}
        >
          <span>Login</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
