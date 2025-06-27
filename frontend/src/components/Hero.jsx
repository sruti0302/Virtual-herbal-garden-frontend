import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CustomLoginButton from "./CustomLoginButton"; // Add this import

const GOOGLE_OAUTH_URL =
  "https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/oauth2/authorization/google";

const Hero = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(
          "https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/api/user/profile",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        data ? setLoggedIn(true) : setLoggedIn(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setLoggedIn(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogin = () => {
    window.location.href = GOOGLE_OAUTH_URL;
  };

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 py-24 md:py-40">
      <motion.div
        className="relative z-10 max-w-full mx-auto px-6 py-10 md:py-14 md:px-12"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Headline */}
        <motion.h1
          className="text-4xl md:text-6xl font-semibold tracking-tight text-white drop-shadow-md leading-snug"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Embrace Nature,
          <br className="md:hidden" />
          Embrace<span className="text-green-200 "> Wellness</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="mt-6 text-gray-200 text-base md:text-[1.4vw] max-w-2xl mx-auto font-light drop-shadow-md leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          Discover the finest organic herbs, ethically sourced and thoughtfully
          blended to support your health and lifestyle.
        </motion.p>

        {/* Login CTA */}
        {!loggedIn && (
          <div className="flex justify-center mt-8">
            <div onClick={handleLogin} style={{ cursor: "pointer" }}>
              <CustomLoginButton />
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Hero;
