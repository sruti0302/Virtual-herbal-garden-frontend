import { motion } from "framer-motion";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";

const GOOGLE_OAUTH_URL =
  "https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/oauth2/authorization/google";




const Hero = () => {

  const [loggenedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token"); // or whatever key you're using
      if (!token) {
        console.warn("No token found in localStorage");
        setLoggedIn(false)
        return;
      }
  
      try {
        const response = await fetch("https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/api/user/profile", {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        data?(setLoggedIn(true)):(setLoggedIn(false));
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUser("User");
      }
    };
  
    fetchUserData();
  }, []);

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
          className="text-4xl md:text-6xl font-semibold leading-tight text-zinc-200 text-shadow-lg text-shadow-gray-900"
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
          className="text-gray-100 text-center md:text-right text-base md:text-xl font-medium text-shadow-lg text-shadow-gray-900"
          style={{ fontFamily: "'Poppins', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          Discover the finest organic herbs, ethically sourced <br /> and
          perfectly blended for your health journey.
        </motion.p>

        {/* Login Button */}
        {!loggenedIn ? (
  <motion.div
    whileTap={{ scale: 0.95 }}
    className="bg-green-600 text-white px-4 py-2 text-lg md:text-2xl rounded-md hover:bg-green-700 hover:scale-105 transition"
    onClick={handleLogin}
  >
    Login
  </motion.div>
) : null}
        

        
      </motion.div>
    </section>
  );
};

export default Hero;
