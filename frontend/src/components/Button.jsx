import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ text, path, onClick, className }) => {
  return (
    <Link
      to={path}
      onClick={onClick}
      className={`relative px-6 py-3 text-md font-semibold rounded-full bg-opacity-30 backdrop-blur-md border border-white border-opacity-20 transition-transform  duration-300 hover:scale-105  hover:shadow-lg ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.1)', // Glass morph effect
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', // Subtle shadow
      }}
    >
{/*       <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-50 opacity-0 rounded-full transition-opacity duration-300 hover:opacity-45"></span>
 */}      <span className="relative z-10">{text}</span>
    </Link>
  );
};

export default Button;