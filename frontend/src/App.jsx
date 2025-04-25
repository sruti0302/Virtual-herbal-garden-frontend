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
import HealthImg from "./assets/health/healthybg.jpeg";
import CartPage from "./components/CartPage";
import BlogPage from "./components/BlogPage";
import MyHerbs from "./components/MyHerbs"; // Import MyHerbs page
import AddPlant from "./components/AddPlant";
import HerbalistsMyPlants from "./components/HerbalistsMyPlants";
import Subscription from "./components/Subscription";
import DoctorsPage from "./components/DoctorsPage";


function App() {
  const videos = [
    "/videos/video1.mp4",
    "/videos/video2.mp4",
    "/videos/video3.mp4",
  ]; // Array of video paths
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // State to track the current video
  const [cartItems, setCartItems] = useState([]);
 

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
                    <motion.video
                      src="/videos/video2.mp4" // Set video2.mp4 as the source
                      autoPlay
                      muted
                      loop
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  </div>

                  {/* Navbar and Hero Section */}
                  <div className="relative z-10">
                    <Navbar className="text-white" />
                    <Hero />
                  </div>

                  {/* Overlay for better readability */}
                  <div className="absolute inset-0  bg-opacity-30"></div>
                </div>

                {/* Cards Section */}
                <div className="px-4 sm:px-6 lg:px-8">
                  <CardsSection
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                  />
                </div>

                {/* Features Section */}
                <div className="px-4 sm:px-6 lg:px-8">
                  <Features />
                </div>

                {/* Footer */}
                <Subscription/>
                <Footer />
              </>
            }
          />

          {/* Other Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/gardening-tips" element={<Gardening />} />
          <Route path="/oauth/callback" element={<AuthCallback />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/add-plants" element={<AddPlant />} />
          <Route path="/my-plants" element={<HerbalistsMyPlants />} />
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
          <Route
            path="/cart"
            element={
              <CartPage cartItems={cartItems} setCartItems={setCartItems} />
            }
          />
          <Route
            path="/myherbs"
            element={
              <MyHerbs />
            }
          />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
