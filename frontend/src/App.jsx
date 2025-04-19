import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";
import Footer from "./components/Footer";
import CardsSection from "./components/CardsSection";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import HealthWellness from "./components/HealthWellness";
import Community from "./components/Community";
import Herobg from "./assets/Images/Herobg.jpg";
import BgImg from "./assets/Images/BgImg.jpg";

function App() {
  return (
    <Router>
      <div className="bg-white text-gray-900 min-h-screen flex flex-col">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div
                  className="bg-cover bg-center bg-no-repeat min-h-screen rounded-b-4xl"
                  style={{ backgroundImage: `url(${BgImg})` }}
                >
                  <Navbar />
                  <Hero />
                </div>
                <CardsSection />
                <Features />
                <Footer />
              </>
            }
          />
          <Route path="/community" element={<Community />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/health" element={<HealthWellness />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
