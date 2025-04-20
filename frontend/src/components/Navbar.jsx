import { useState } from 'react';
import Button from './Button';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  // Define links with their respective paths
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Login', path: '/login' },
    { name: 'Health', path: '/health' },
    { name: 'Community', path: '/community' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <nav className="flex justify-between items-center px-6 py-6  relative">
      <div className="text-2xl font-bold text-zinc-200">HerbSphere</div>

      {/* Desktop menu */}
      <div className="hidden md:flex gap-6 text-zinc-100">
        {links.map(({ name, path }) => (
          <Button key={name} text={name} path={path} />
        ))}
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="text-2xl focus:outline-none text-white"
        >
          {open ? '' : '☰'}
        </button>
      </div>

      {/* Background blur when sidebar is open */}
      {open && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)} // Close sidebar when clicking outside
        ></div>
      )}

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-transparent to-black text-white transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close button inside the menu */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setOpen(false)}
            className="text-2xl focus:outline-none text-white "
          >
            ✖
          </button>
        </div>

        {/* Menu links */}
        <div className="flex flex-col items-center gap-4 p-6">
          {links.map(({ name, path }) => (
            <Button
              key={name}
              text={name}
              path={path}
              onClick={() => setOpen(false)}
              className="text-zinc-100"
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
