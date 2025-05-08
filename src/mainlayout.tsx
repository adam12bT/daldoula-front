// components/layout/MainLayout.tsx
import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      <main className="flex-grow relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
        {children}
      </main>
      <Footer/>
    </div>
  );
};

export default MainLayout;
