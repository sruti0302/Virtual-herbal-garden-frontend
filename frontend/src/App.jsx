import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import About from './components/About'
import Footer from './components/Footer'
import CardsSection from './components/CardsSection'

function App() {
  return (
    <div className="bg-white text-gray-900">
      <Navbar />
      <Hero />
      <CardsSection/>
      <Features />
      
      <Footer />
    </div>
  )
}

export default App
