import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // For sliding effect
import Navbar from "./components/Navbar";
import AuthCallback from "./components/AuthCallback";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";
import Gardening from "./components/Gardening";
import Footer from "./components/Footer";
import CardsSection from "./components/CardsSection";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import HealthWellness from "./components/HealthWellness";
import HealthImg from "./assets/Images/Health.webp";
import CartPage from "./components/CartPage";
import BlogPage from "./components/BlogPage";
import MyHerbs from "./components/MyHerbs"; // Import MyHerbs page

function App() {
  const videos = [
    "/videos/video1.mp4",
    "/videos/video2.mp4",
    "/videos/video3.mp4",
  ]; // Array of video paths
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // State to track the current video
  const [cartItems, setCartItems] = useState([]);
  const [savedHerbs, setSavedHerbs] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("savedHerbs");
    if (saved) {
      setSavedHerbs(JSON.parse(saved));
    }
  }, []);

  // Automatically transition to the next video every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length); // Loop back to the first video
    }, 12000); // 12 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [videos.length]);

  const handleDotClick = (index) => {
    setCurrentVideoIndex(index); // Update the current video index when a dot is clicked
  };

  const handleSave = (herb) => {
    if (!savedHerbs.some((saved) => saved.title === herb.title)) {
      const updatedHerbs = [...savedHerbs, herb];
      setSavedHerbs(updatedHerbs);
      localStorage.setItem("savedHerbs", JSON.stringify(updatedHerbs));
    }
  };

  const handleRemove = (herb) => {
    const updatedHerbs = savedHerbs.filter(
      (saved) => saved.title !== herb.title
    );
    setSavedHerbs(updatedHerbs);
    localStorage.setItem("savedHerbs", JSON.stringify(updatedHerbs)); // Update localStorage
  };

  return (
    <Router>
      <div className="bg-white text-gray-900 min-h-screen flex flex-col">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="relative min-h-screen rounded-b-2xl overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full">
                    <AnimatePresence>
                      <motion.video
                        key={currentVideoIndex}
                        src={videos[currentVideoIndex]}
                        autoPlay
                        muted
                        loop
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        initial={currentVideoIndex === 0 ? {} : { x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-90%" }}
                        transition={{
                          duration: 1.5,
                          ease: "easeInOut",
                        }}
                      />
                    </AnimatePresence>
                  </div>

                  <div className="relative z-10">
                    <Navbar className="text-" />
                    <Hero />
                  </div>

                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
                    {videos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`w-3 h-4 rounded-sm ${
                          currentVideoIndex === index
                            ? "bg-white"
                            : "bg-gray-400"
                        }`}
                      ></button>
                    ))}
                  </div>

                  <div className="absolute inset-0 bg-opacity-30"></div>
                </div>
                <CardsSection
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
                <Features />
                <Footer />
              </>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/gardening-tips" element={<Gardening />} />
          <Route path="/oauth/callback" element={<AuthCallback />} />
          <Route path="/blog" element={<BlogPage />} />

          <Route
            path="/health"
            element={
              <div
                className="bg-cover bg-center bg-no-repeat min-h-screen rounded-b-2xl"
                style={{ backgroundImage: `url(${HealthImg})` }}
              >
                <HealthWellness />
              </div>
            }
          />
          <Route path="/cart" element={<CartPage cartItems={cartItems} />} />
          <Route
            path="/myherbs"
            element={
              <MyHerbs savedHerbs={savedHerbs} onRemove={handleRemove} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
