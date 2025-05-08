import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BriefcaseIcon, UserCircleIcon } from 'lucide-react';
import { User } from '../entity/user';
import { getOneUser } from '../service/service';
import { jwtDecode } from 'jwt-decode';
import Avatar from './chat/common/Avatar';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem('token');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

    const [profile, setProfile] = useState<User>({});
    const [error, setError] = useState('');


  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);


  let userId = null;




  if (token) {
    try {
      const decodedToken = jwtDecode<{ _id: string }>(token);
      console.log(decodedToken)
      userId = decodedToken.id; // Extract user ID
      console.log(userId)
    } catch (error) {
      console.error("Invalid token:", error);
      setError("Invalid token. Please log in again.");
    }
  } else {
    console.error("No token found");
    setError("Authentication required. Please log in.");
  }

  const fetchUserById = async () => {
    if (!userId || !token) {
      console.error("User ID or token missing");
      return;
    }

    try {
      const response = await getOneUser(userId, token);
      console.log(response)
      if (response) {
        setProfile(response.user);
      } else {
        setError("Failed to fetch user data.");
      }
    } catch (error) {
      console.error("API error:", error);
      setError("Error fetching user data. Please try again.");
    }
  };

  useEffect(() => {
    fetchUserById();

  }, []);





  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setShowDropdown(false);
  };

  const isActive = (path: string) => location.pathname === path;
  console.log(profile.image)

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
            {isAuthenticated && (
              <Link
                to="/services"
                className={`relative px-1 py-2 text-base font-medium transition-colors duration-200 ${
                  isActive('/services') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                } before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-blue-600 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300`}
              >
                Find Services
              </Link>
            )}
            {isAuthenticated && (
              <Link
                to="/professionals"
                className={`relative px-1 py-2 text-base font-medium transition-colors duration-200 ${
                  isActive('/professionals') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                } before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-blue-600 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300`}
              >
                Add a post
              </Link>
            )}

            {isAuthenticated && (
              <div className="relative z-50" ref={dropdownRef}>
                <button
                  ref={buttonRef}
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 focus:outline-none z-10"
                >
  <Avatar
    src={profile?.image || 'https://via.placeholder.com/40'}
    alt={profile?.name || 'Anonymous'}
    size="lg"
  />
              </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-20">
                    
                    <Link
                      to="/profile"
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/chat"
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Chat
                    </Link>
                    <Link
                      to="/login"
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Log Out
                    </Link>
                  </div>
                )}
              </div>
            )}

            {!isAuthenticated && (
              <Link
                to="/about"
                className={`relative px-1 py-2 text-base font-medium transition-colors duration-200 ${
                  isActive('/about') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                } before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-blue-600 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300`}
              >
                About
              </Link>
            )}

            {!isAuthenticated && (
              <Link
                to="/login"
                className={`relative px-1 py-2 text-base font-medium transition-colors duration-200 ${
                  isActive('/login') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                } before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-blue-600 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300`}
              >
                Login
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