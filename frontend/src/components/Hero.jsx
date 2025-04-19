const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row mt-[36vh]  items-end justify-between px-18 py-16 gap-10 ">
      <div className="max-w-xl text-center  md:text-left">
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight  text-zinc-200">
          Embrace Nature, Embrace Wellness
        </h1>
      </div>
      <div>
        <p className="text-gray-100 mb-6 text-right font-semibold">
          Discover the finest organic herbs, ethically sourced and <br /> perfectly
          blended for your health journey.
        </p>
        <div className="flex gap-2 items-center justify-end">
        <button className="bg-green-600 text-white px-6 py-2 text-2xl rounded-md hover:bg-green-700 hover:scale-105 transition">
          Get Started
        </button>
        <button className="bg-transparent border-2 text-white px-6 py-2 text-2xl rounded-md hover: hover:scale-105 transition">
          Login
        </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
