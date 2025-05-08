import React from 'react';
import { Shield, Users, Globe } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Active Professionals', value: '10,000+' },
    { label: 'Satisfied Customers', value: '50,000+' },
    { label: 'Services Completed', value: '100,000+' },
    { label: 'Cities Covered', value: '100+' }
  ];

  const values = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: 'Trust & Safety',
      description: 'We verify all professionals and ensure your safety is our top priority.'
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: 'Community',
      description: 'Building strong connections between professionals and customers.'
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: 'Accessibility',
      description: 'Making professional services accessible to everyone, everywhere.'
    }
  ];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            About Couvrini
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
            We're on a mission to revolutionize how people connect with skilled professionals.
            Our platform makes it easy to find, book, and manage professional services.
          </p>
        </div>

        {/* Stats Section */}
        <div className="mt-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-extrabold text-blue-600">
                  {stat.value}
                </p>
                <p className="mt-2 text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Our Values
          </h2>
          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center">{value.icon}</div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  {value.title}
                </h3>
                <p className="mt-2 text-gray-500">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Our Team
          </h2>
          <p className="mt-4 text-xl text-gray-500 text-center max-w-3xl mx-auto">
            We're a dedicated team of professionals working to create the best
            platform for service providers and customers alike.
          </p>
          <img
            className="mt-12 w-full h-96 object-cover rounded-lg"
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
            alt="Our team"
          />
        </div>
      </div>
    </div>
  );
};

export default About;