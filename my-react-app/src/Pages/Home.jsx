import React from 'react';
import Header from '../Components/Header';
import Hero from '../Components/Hero';

const Home = () => {
  return (
    <div
      className="text-amber-50 bg-cover bg-center h-screen w-screen relative p-0 m-0"
      style={{ backgroundImage: "url('/11.svg')" }}
    >
      <Header />
      <Hero />
    </div>
  );
};

export default Home;