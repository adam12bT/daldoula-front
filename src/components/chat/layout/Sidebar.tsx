import React, { useEffect, useState } from 'react';
import { Search, Edit, CarIcon, ArrowRightLeft, ArrowLeft } from 'lucide-react';
import Avatar from '../common/Avatar';
import ConversationList from '../conversations/ConversationList';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../../entity/user';
import { getOneUser } from '../../../service/service';
import { Link } from 'react-router-dom';

const Sidebar: React.FC<{ onSelectUser: (user: User) => void }> = ({ onSelectUser }) => {
  const [senderId, setSenderId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState<User | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode<{ _id: string }>(token);
        console.log(decodedToken)

        const id = decodedToken.id;
        setSenderId(id);
      } catch (err) {
        console.error('Invalid token:', err);
        setError('Invalid token. Please log in again.');
      }
    } else {
      setError('Authentication required. Please log in.');
    }
  }, []);

  console.log(profile)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (senderId && token) {
      getOneUser(senderId, token)
        .then((res) => {
          if (res?.user) {
            setProfile(res.user);
          } else {
            setError('Failed to fetch user data.');
          }
        })
        .catch((err) => {
          console.error('API error:', err);
          setError('Error fetching user data.');
        });
    }
  }, [senderId]);

  return (
    <div className="w-full md:w-80 border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 flex items-center justify-between border-b border-gray-200">


        <div className="flex items-center gap-2">
          <Link to="/services" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="text-indigo-500" size={30} />
          </Link>
          <Avatar
            src={profile?.image}
            alt="User"
            online={true}
          />
          <h2 className="font-medium">{profile?.name}</h2>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Edit size={20} />
        </button>
      </div>

      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search conversations..."
            className="bg-gray-100 w-full p-2 pl-10 pr-4 rounded-full focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <ConversationList userid={profile?._id} onSelectUser={onSelectUser} />
      </div>
    </div>
  );
};

export default Sidebar;
