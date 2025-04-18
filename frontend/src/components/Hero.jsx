const Hero = () => {
    return (
      <section className="flex flex-col md:flex-row items-center justify-between px-18 py-16 gap-10 ">
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-green-800">
            Embrace Nature, Embrace Wellness
          </h1>
          <p className="text-gray-600 mb-6">
            Discover the finest organic herbs, ethically sourced and perfectly blended for your health journey.
          </p>
          <button className="bg-green-600 text-white px-6 py-2 text-2xl rounded-md hover:bg-green-700 hover:scale-105 transition">
            Get Started
          </button>
        </div>
        <div>
          <img
            src="https://herb-sphere.vercel.app/images/firstpage.png"
            alt="Herbs"
            className="w-full max-w-md"
          />
        </div>
      </section>
    )
  }
  
  export default Hero
  