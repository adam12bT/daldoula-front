import React from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseIcon, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <BriefcaseIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">Couvrini</span>
            </Link>
            <p className="mt-4 text-gray-500">
              Hey there! We're here to help you find amazing local pros for all your needs. Simple as that! 😊
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/services" className="text-gray-500 hover:text-gray-900">Find Help</Link></li>
              <li><Link to="/professionals" className="text-gray-500 hover:text-gray-900">Join as a Pro</Link></li>
              <li><Link to="/pricing" className="text-gray-500 hover:text-gray-900">Our Rates</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Get to Know Us</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/about" className="text-gray-500 hover:text-gray-900">Our Story</Link></li>
              <li><Link to="/careers" className="text-gray-500 hover:text-gray-900">Work with Us</Link></li>
              <li><Link to="/blog" className="text-gray-500 hover:text-gray-900">Latest Updates</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">The Fine Print</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/privacy" className="text-gray-500 hover:text-gray-900">Privacy Stuff</Link></li>
              <li><Link to="/terms" className="text-gray-500 hover:text-gray-900">The Rules</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-gray-900">Say Hello!</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-400 text-sm">
              Made with ❤️ by the Couvrini team © {new Date().getFullYear()}
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500 transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;