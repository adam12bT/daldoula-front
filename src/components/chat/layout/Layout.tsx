import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import { useLocation } from 'react-router-dom';
import { User } from '../../../entity/user';

const Layout: React.FC = () => {
  const location = useLocation();
  const initialId = location.state?.id || null;
  const [selectedReceiver, setSelectedReceiver] = useState<string | null>(initialId);

  // Update state when location changes (e.g., navigation with state)
  useEffect(() => {
    if (location.state?.id) {
      setSelectedReceiver(location.state.id);
    }
  }, [location]);

  // Log whenever selectedReceiver changes
  useEffect(() => {
    if (selectedReceiver) {
      console.log("Receiver changed to:", selectedReceiver);
    }
  }, [selectedReceiver]);
  console.log("Receiver changed to:", selectedReceiver);

  return (
    <div className="flex  bg-gray-50 text-gray-900 overflow-hidden">

      <Sidebar
      
      onSelectUser={(user: User) => {
        console.log("plsssssssssssss"+user._id)
        setSelectedReceiver(user._id);
      }} />

      {/* ChatArea receives the selected receiver ID */}
      <ChatArea id={selectedReceiver} />
    </div>
  );
};

export default Layout;
