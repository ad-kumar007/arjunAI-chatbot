// src/Components/Hero.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Typewriter from './Typewriter';

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/chat'); // ✅ Navigate to Chat page
  };

  return (
    <div className="flex flex-col justify-center items-center gap-9 pt-16 md:pt-24">
      <div className="text-7xl font-bold font-orbitron tracking-wide ml-[30rem] w-fit">
        <div className="typewriter-wrapper w-full mr-2.5">
          <Typewriter />
        </div>
      </div>

      <div className="text-lg ml-[30.5rem] mr-8 text-center md:text-left">
        AI powered chat technology is revolutionizing the way we connect, interact, and engage. Through real-time responses, natural language.
      </div>

      <div className="flex flex-row w-full h-[50px] gap-[60px]">
        <button
          onClick={handleGetStarted} // ✅ Hooked up navigation here
          className="ml-[31rem] w-[180px] rounded-full bg-[#020236] text-white hover:bg-transparent hover:border-[#020236] hover:text-white border-2 transition-all"
        >
          Get Started
        </button>
        <button className="w-[180px] rounded-full bg-transparent text-black border-2 border-[#020236] hover:bg-[#020236] hover:text-white transition-all">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Hero;
