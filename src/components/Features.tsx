import React from 'react';
import { ShieldCheckIcon, StarIcon, BriefcaseIcon } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <ShieldCheckIcon className="h-6 w-6 text-blue-600" />,
      title: 'Verified Professionals',
      description: 'All service providers are thoroughly vetted and verified for your peace of mind.'
    },
    {
      icon: <StarIcon className="h-6 w-6 text-blue-600" />,
      title: 'Quality Service',
      description: 'Read reviews and ratings from real customers to make informed decisions.'
    },
    {
      icon: <BriefcaseIcon className="h-6 w-6 text-blue-600" />,
      title: 'Easy Booking',
      description: 'Book services with just a few clicks and get instant confirmations.'
    }
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose Couvrini?
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            We make it easy to find and hire trusted professionals in your area.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {features.map((feature, index) => (
              <div key={index} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-50">
                  {feature.icon}
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.title}</p>
                <p className="mt-2 ml-16 text-base text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;