import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Smartphone, Locate, MapPin } from 'lucide-react';
import { registerUser } from '../service/service'; // Import the registerUser function from your API service

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setrole] = useState<'job_poster' | 'job_seeker'>('job_poster');
  const [loading, setLoading] = useState(false);
  const [location, setlocation] = useState('');

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const userData = {
      name,
      email,
      password,
      phone,
      role,
      location
    };

    try {
      const registeredUser = await registerUser(userData);
      console.log("User registered:", registeredUser);
      navigate('/Login'); // Redirect user to dashboard after successful registration
    } catch (err: any) {
      console.error("Registration Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full name</label>
              <div className="mt-1 relative">
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <User className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* location */}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Location</label>
              <div className="mt-1 relative">
                <input
                  id="location"
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setlocation(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <MapPin className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <div className="mt-1 relative">
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <Smartphone className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Account Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Account type</label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setrole('job_poster')}
                  className={`${role === 'job_poster'
                    ? 'border-blue-500 ring-2 ring-blue-500'
                    : 'border-gray-300'
                    } relative border rounded-lg p-4 flex flex-col items-center`}
                >
                  <span className="text-sm font-medium text-gray-900">Customer</span>
                  <span className="mt-1 text-xs text-gray-500">Looking for services</span>
                </button>
                <button
                  type="button"
                  onClick={() => setrole('job_seeker')}
                  className={`${role === 'job_seeker'
                    ? 'border-blue-500 ring-2 ring-blue-500'
                    : 'border-gray-300'
                    } relative border rounded-lg p-4 flex flex-col items-center`}
                >
                  <span className="text-sm font-medium text-gray-900">Professional</span>
                  <span className="mt-1 text-xs text-gray-500">Offering services</span>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>

          {/* Terms & Privacy */}
          <div className="mt-6">
            <p className="text-xs text-center text-gray-500">
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="text-blue-600 hover:text-blue-500">Terms of Service</Link> and{' '}
              <Link to="/privacy" className="text-blue-600 hover:text-blue-500">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
