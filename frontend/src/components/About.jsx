const About = () => {
  return (
    <section className="px-6 py-16 flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto">
      <img
        src="https://herb-sphere.vercel.app/images/about-image.png"
        alt="About Us"
        className="w-full max-w-md rounded-lg shadow-md"
      />
      <div>
        <h2 className="text-3xl font-bold text-green-800 mb-4">Rooted in Nature</h2>
        <p className="text-gray-700 mb-4">
          At HerbSphere, we believe in the healing power of nature. Every product is crafted to nurture your mind,
          body, and soul using the most natural ingredients. Join us on a journey of wellness and authenticity.
        </p>
        <p className="text-gray-600 italic">“Let food be thy medicine and medicine be thy food.” – Hippocrates</p>
      </div>
    </section>
  )
}

export default About