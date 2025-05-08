import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from 'lucide-react';
import workerImage from '../assets/photo-1521791136064-7986c2920216.png';

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const categoryKeywords: Record<string, string[]> = {
    Plumbing: ['plumbing', 'plumber', 'leak', 'pipe'],
    Electrical: ['electrical', 'electrician', 'wiring', 'circuit'],
    Carpentry: ['carpentry', 'carpenter', 'woodwork', 'furniture'],
    Gardening: ['gardening', 'gardener', 'lawn', 'plants'],
    Cleaning: ['cleaning', 'cleaner', 'janitor', 'maid'],
    Development: ['developer', 'development', 'programming', 'coding'],
    'Car Pooling': ['carpool', 'ride', 'driver', 'transport'],
  };

  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    let matchedCategory = 'All Services';

    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some((keyword) => term.includes(keyword))) {
        matchedCategory = category;
        break;
      }
    }

    navigate('/services', { state: { selectedCategory: matchedCategory } });
  };

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="lg:grid lg:grid-cols-2 lg:items-center max-w-7xl mx-auto">
        <div className="px-4 sm:px-6 md:px-8 lg:px-8 py-12 lg:py-24">
          <main className="mx-auto max-w-2xl">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Find Trusted</span>
                <span className="block text-blue-600">Local Professionals</span>
              </h1>
              <p className="mt-4 text-base text-gray-500 sm:text-lg md:text-xl">
                Connect with skilled workers in your area. From plumbers to electricians, find the right professional for your needs.
              </p>
              <div className="mt-6">
                <div className="relative rounded-md shadow-sm max-w-lg mx-auto lg:mx-0">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full rounded-md border-gray-300 pl-12 pr-32 py-4 text-lg focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Search for services..."
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="absolute inset-y-0 right-0 px-6 text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-r-md text-lg"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div className="h-64 sm:h-80 md:h-96 lg:h-full w-full mt-6">
          <img
            className="w-full h-full object-cover"
            src={workerImage}
            alt="Professional worker"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
