import { useState } from 'react'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const links = ['Home','Login', 'Health', 'Community', 'Dashboard']

  return (
    <nav className="flex justify-between items-center px-6 py-6 shadow-md bg-white relative">
      <div className="text-2xl font-bold text-green-700 ">HerbSphere</div>
      
      {/* Desktop menu */}
      <div className="hidden md:flex gap-6">
        {links.map((link) => (
          <a key={link} href="#" className="hover:text-green-600 hover:underline">
            {link}
          </a>
        ))}
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="text-2xl focus:outline-none"
        >
          {open ? '✖' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white flex flex-col items-center gap-4 py-4 shadow-md md:hidden z-50">
          {links.map((link) => (
            <a key={link} href="#" className="hover:text-green-600">
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
