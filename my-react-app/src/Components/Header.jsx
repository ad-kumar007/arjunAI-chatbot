import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="flex justify-between items-center px-[110px] py-10">
      <Link to="/" className="text-4xl font-bold font-orbitron text-[#0a012c] tracking-wide">
        ArjunAI
      </Link>
      <div className="flex justify-end flex-1 gap-[20%]">
        <Link
          to="/"
          className="text-lg text-amber-50 cursor-pointer transition-all duration-300 hover:text-yellow-400 hover:[text-shadow:0_0_8px_#FACC15,0_0_12px_#FACC15]"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-lg text-amber-50 cursor-pointer transition-all duration-300 hover:text-yellow-400 hover:[text-shadow:0_0_8px_#FACC15,0_0_12px_#FACC15]"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="text-lg text-amber-50 cursor-pointer transition-all duration-300 hover:text-yellow-400 hover:[text-shadow:0_0_8px_#FACC15,0_0_12px_#FACC15]"
        >
          Contact
        </Link>
      </div>
    </div>
  );
};

export default Header;
