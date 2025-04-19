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
    <nav className="flex justify-between items-center px-6 py-6 border-b-1 border-b-zinc-500  relative">
      <div className="text-2xl font-bold text-zinc-200">HerbSphere</div>

      {/* Desktop menu */}
      <div className="hidden md:flex gap-6 text-zinc-200">
        {links.map(({ name, path }) => (
          <Button key={name} text={name} path={path} />
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
          {links.map(({ name, path }) => (
            <Button
              key={name}
              text={name}
              path={path}
              onClick={() => setOpen(false)}
            />
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
