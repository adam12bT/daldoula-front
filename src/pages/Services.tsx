import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { getAllProducts, getOneUser } from '../service/service';
import { User } from '../entity/user';
import { Product } from '../entity/product';
import ProfessionalModal from '../components/proflemodel';

const Services = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All Services');

  // Mapping of categories to relevant keywords
  const categoryKeywords = {
    'Plumbing': ['plumbing', 'plumber', 'leak', 'pipe'],
    'Electrical': ['electrical', 'electrician', 'wiring', 'circuit'],
    'Carpentry': ['carpentry', 'carpenter', 'woodwork', 'furniture'],
    'Gardening': ['gardening', 'gardener', 'lawn', 'plants'],
    'Cleaning': ['cleaning', 'cleaner', 'janitor', 'maid'],
    'Development': ['developer', 'development', 'programming', 'coding'],
    'Car Pooling': ['carpool', 'ride', 'driver', 'transport'],
  };

  // Fetch a user and attach it to the respective product
  const fetchUser = async (userId: string) => {
    if (!userId) return null;

    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const user = await getOneUser(userId, token);
      return user?.user;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  };

  const categories = [
    'All Services',
    'Plumbing',
    'Electrical',
    'Carpentry',
    'Gardening',
    'Cleaning',
    'Development',
    'Car Pooling'
  ];

  // Fetch all products and attach users
  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      console.log('Fetched Products:', response);

      if (response && Array.isArray(response)) {
        // Fetch users for each product
        const updatedProducts = await Promise.all(
          response.map(async (product) => {
            const userData = await fetchUser(product.posterID);
            return { ...product, user: userData }; // Attach user data to product
          })
        );

        setProducts(updatedProducts);
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Find Services</h1>
        <div className="mt-4 md:mt-0 relative">
          <input
            type="text"
            placeholder="Search services..."
            className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products
          .filter((service) => {
            if (selectedCategory === 'All Services') return true;

            const title = service.title?.toLowerCase() || '';
            const keywords = categoryKeywords[selectedCategory] || [];
            return keywords.some((keyword) => title.includes(keyword));
          })
          .map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                <p className="mt-2 text-gray-600">by {service.user.name}</p>
                <div className="mt-4 flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-gray-700">{service.user.rating}</span>
                  <span className="ml-1 text-gray-500">({service.user.reviews.length} reviews)</span>
                </div>
                <p className="mt-2 text-gray-700 font-medium">{service.price}</p>
                <div className="mt-6">
                  <button
                    onClick={() => setSelectedProfessional(service.user)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      <ProfessionalModal
        isOpen={!!selectedProfessional}
        profile={selectedProfessional}
        onClose={() => setSelectedProfessional(null)}
      />
    </div>
  );
};

export default Services;
