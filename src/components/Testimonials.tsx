import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Homeowner',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content: 'Found an amazing electrician through Couvrini. The whole process was smooth and professional. Highly recommended!',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Business Owner',
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content: 'As a business owner, I rely on Couvrini to find reliable contractors. The quality of professionals is consistently excellent.',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'Property Manager',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content: 'Managing multiple properties is so much easier with Couvrini. Quick access to trusted professionals whenever we need them.',
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Don't just take our word for it - hear from some of our satisfied customers
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-8">
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="mt-4 flex text-yellow-400">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-gray-600 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;