import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BriefcaseIcon } from 'lucide-react';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    setIsAuthenticated(!!token); // Convert token presence to boolean
  }, [token]);

  const handlelogout = () => {

    localStorage.setItem('token', '')
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <BriefcaseIcon className="h-8 w-8 text-blue-600 transition-transform group-hover:scale-110" />
              <span className="ml-2 text-2xl font-bold text-gray-900">Couvrini</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/services"
              className={`relative px-1 py-2 text-base font-medium transition-colors duration-200 ${isActive('/services') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                } before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-blue-600 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300`}
            >
              Find Services
            </Link>
            <Link
              to="/professionals"
              className={`relative px-1 py-2 text-base font-medium transition-colors duration-200 ${isActive('/professionals') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                } before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-blue-600 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300`}
            >
              Add a post
            </Link>

            {isAuthenticated && (

              <Link
                onClick={handlelogout}
                to="/login"
                className={`relative px-1 py-2 text-base font-medium transition-colors duration-200 ${isActive('/login') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  } before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-blue-600 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300`}
              >
                Log Out
              </Link>

            )}
            {!isAuthenticated && (
              <Link
                to="/about"
                className={`relative px-1 py-2 text-base font-medium transition-colors duration-200 ${isActive('/about') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  } before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-blue-600 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300`}
              >
                About
              </Link>
            )}


            {!isAuthenticated && (
              <Link
                to="/login"
                className={`relative px-1 py-2 text-base font-medium transition-colors duration-200 ${isActive('/login') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  } before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-blue-600 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300`}
              >
                Login
              </Link>
            )}

            {isAuthenticated && (
              <Link
                to="/profile"
                className={`relative px-1 py-2 text-base font-medium transition-colors duration-200 ${isActive('/profile') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  } before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-blue-600 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300`}
              >
                Profile
              </Link>
            )}


{isAuthenticated && (
              <Link
                to="/chat"
                className={`relative px-1 py-2 text-base font-medium transition-colors duration-200 ${isActive('/profile') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  } before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-blue-600 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300`}
              >
                chat
              </Link>
            )}

            {!isAuthenticated && (
              <Link
                to="/register"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
