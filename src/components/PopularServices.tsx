import { Link } from 'react-router-dom';
import { Wrench, Zap, Paintbrush, Car, Home, Scissors } from 'lucide-react';

const services = [
  {
    icon: <Wrench className="h-8 w-8" />,
    name: 'Plumbing',
    description: 'Expert plumbing services for your home',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: <Zap className="h-8 w-8" />,
    name: 'Electrical',
    description: 'Professional electrical installations and repairs',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: <Paintbrush className="h-8 w-8" />,
    name: 'Painting',
    description: 'Transform your space with quality painting',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: <Car className="h-8 w-8" />,
    name: 'Auto Repair',
    description: 'Expert auto repair and maintenance',
    image: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: <Home className="h-8 w-8" />,
    name: 'Home Cleaning',
    description: 'Professional home cleaning services',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: <Scissors className="h-8 w-8" />,
    name: 'Landscaping',
    description: 'Expert landscaping and lawn care',
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

const PopularServices = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Popular Services
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Discover our most requested professional services
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Link
              key={index}
              to="/services"
              className="group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-w-3 aspect-h-2">
                <img
                  src={service.image}
                  alt={service.name}
                  className="object-cover w-full h-48"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 text-blue-600">
                    {service.icon}
                  </div>
                  <h3 className="ml-3 text-xl font-medium text-gray-900">
                    {service.name}
                  </h3>
                </div>
                <p className="mt-3 text-base text-gray-500">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            View All Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopularServices;