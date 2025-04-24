import { useState } from "react";
import { delay, motion } from "framer-motion";
import Button from "./Button";
import HomeButton from "./HomeButton";

const Navbar = ({ className = "" }) => {
  const [open, setOpen] = useState(false);

  // Define links with their respective paths
  const links = [
    { name: "Health", path: "/health" },
    { name: "Gardening", path: "/dashboard/gardening-tips" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Blog", path: "/blog" }, // New Blog Link
  ];

  // Framer Motion variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delay: 0, // Stagger each child by 0.2 seconds
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: -50 }, // Start above the screen
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <nav
      className={`flex justify-between items-center px-6 py-6 relative ${className}`}
    >
      <div className="text-2xl font-bold">FloraMed</div>

      {/* Desktop menu */}
      <motion.div
        className="hidden md:flex gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div key="Home" variants={buttonVariants}>
          <HomeButton text="Home" path="/" />
        </motion.div>

        {links.map(({ name, path }) => (
          <motion.div key={name} variants={buttonVariants}>
            <Button text={name} path={path} />
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="text-3xl  mr-[5vw] font-bold text-white focus:outline-none"
        >
          {open ? "✖" : "☰"}
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
          open ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close button inside the menu */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setOpen(false)}
            className="text-3xl font-bold mr-[5vw] focus:outline-none text-white"
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
