import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import { useLocation } from 'react-router-dom';
import { User } from '../../../entity/user';

const Layout: React.FC = () => {
  const location = useLocation();
  const initialId = location.state?.id || null;
  const [selectedReceiver, setSelectedReceiver] = useState<string | null>(initialId);

  useEffect(() => {
    if (location.state?.id) {
      setSelectedReceiver(location.state.id);
    }
  }, [location]);
  console.log("Selected user ID:", selectedReceiver)

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden">
      {/* Sidebar - 1/4 of screen */}
      <div className="flex-[1] max-w-xs border-r border-gray-200">
        <Sidebar
          onSelectUser={(user: User) => {
            console.log("Selected user ID:", user._id);
            setSelectedReceiver(user._id);
          }}
        />
      </div>

      {/* ChatArea - Remaining space */}
      <div className="flex-[3] flex flex-col overflow-hidden">
        {selectedReceiver ? (
          
          <ChatArea id={selectedReceiver} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a user to start chatting.
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;