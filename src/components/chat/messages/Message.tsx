import React from 'react';
import { Check } from 'lucide-react';
import Avatar from '../common/Avatar';

interface MessageProps {
  message: chat;
  currentUserId: string;
  showAvatar: boolean;
  showTimestamp: boolean;
}

const Message: React.FC<MessageProps> = ({ message, currentUserId, showAvatar, showTimestamp }) => {
  const isSelf = message.senderId === currentUserId;

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex gap-2 ${isSelf ? 'flex-row-reverse' : 'flex-row'} items-end max-w-full`}>
      {showAvatar && !isSelf ? (
        <Avatar 
          src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
          alt="Contact" 
          size="sm" 
        />
      ) : (
        <div className="w-8"></div>
      )}
      
      <div className="flex flex-col max-w-[75%]">
        <div 
          className={`rounded-2xl px-4 py-2 ${isSelf ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-900 rounded-bl-none'}`}
        >
          <p className="break-words">{message.content}</p>
        </div>
        
        {showTimestamp && (
          <div className={`flex items-center mt-1 text-xs text-gray-500 ${isSelf ? 'justify-end' : 'justify-start'}`}>
            <span>{formatTime(message.timestamp)}</span>
            {isSelf && (
              <span className="ml-1 flex items-center">
                {message.read ? (
                  <span className="text-blue-500">
                    <Check size={12} className="-mr-1" />
                    <Check size={12} />
                  </span>
                ) : (
                  <Check size={12} />
                )}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
