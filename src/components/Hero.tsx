import React from 'react';
import { SearchIcon } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Find Trusted</span>
                <span className="block text-blue-600">Local Professionals</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Connect with skilled workers in your area. From plumbers to electricians, find the right professional for your needs.
              </p>
              <div className="mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="relative rounded-md shadow-sm w-full max-w-lg">
                  <input
                    type="text"
                    className="block w-full rounded-md border-gray-300 pl-10 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Search for services..."
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <button className="absolute inset-y-0 right-0 flex items-center px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-r-md">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Professional worker"
        />
      </div>
    </div>
  );
};

export default Hero;