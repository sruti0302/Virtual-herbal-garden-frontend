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



function App() {
  const videos = [
    "/videos/video1.mp4",
    "/videos/video2.mp4",
    "/videos/video3.mp4",
  ]; // Array of video paths
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // State to track the current video

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

  return (
    <Router>
      <div className="bg-white text-gray-900 min-h-screen flex flex-col">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Video Background */}
                <div className="relative min-h-screen rounded-b-2xl overflow-hidden">
                  {/* Video Slider with Sliding Effect */}
                  <div className="absolute top-0 left-0 w-full h-full">
                    <AnimatePresence>
                      <motion.video
                        key={currentVideoIndex} // Re-render the video when the index changes
                        src={videos[currentVideoIndex]}
                        autoPlay
                        muted
                        loop
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        initial={currentVideoIndex === 0 ? {} : { x: "100%" }} // No animation for the first video
                        animate={{ x: 0 }} // Slide into view
                        exit={{ x: "-90%" }} // Slide out to the left
                        transition={{
                          duration: 1.5, // Slower transition (1.5 seconds)
                          ease: "easeInOut", // Smooth easing function
                        }}
                      />
                    </AnimatePresence>
                  </div>

                  <div className="relative z-10">
                    <Navbar className="text-" />
                    <Hero />
                  </div>

                  {/* Dots for Slider */}
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

                  {/* Optional overlay for better text visibility */}
                  <div className="absolute inset-0  bg-opacity-30"></div>
                </div>
                <CardsSection />
                <Features />
                <Footer />
              </>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/gardening-tips" element={<Gardening />} />
          <Route path="/oauth/callback" element={<AuthCallback />} />
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
