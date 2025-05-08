import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import PopularServices from '../components/PopularServices';
import CTASection from '../components/CTASection';

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <PopularServices />
      <CTASection />
    </div>
  );
};

export default Home;