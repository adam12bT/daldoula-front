import React, { useEffect } from 'react';
import { Check } from 'lucide-react';
import Avatar from '../common/Avatar';
import { getOneUser } from '../../../service/service';
import { User } from '../../../entity/user';

interface MessageProps {
  message: chat;
  currentUserId: string;
  showAvatar: boolean;
  showTimestamp: boolean;
}

const Message: React.FC<MessageProps> = ({
  message,
  currentUserId,
  showAvatar,
  showTimestamp,
}) => {
  const isSelf = message.senderId === currentUserId;

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const [user, setUser] = React.useState<User | null>(null);

  const getUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found');
      const response = await getOneUser(message.senderId, token);
      setUser(response);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  };

  useEffect(() => { getUser(); }, [message.senderId]);

  return (
    <div className={`flex ${isSelf ? 'justify-end' : 'justify-start'} w-full`}>
      <div className={`flex gap-2 ${isSelf ? 'flex-row-reverse' : 'flex-row'} max-w-[90%]`}>
        {/* Avatar Container */}
        <div className={`flex-shrink-0 ${isSelf ? 'order-2' : 'order-1'}`}>
          {showAvatar && !isSelf ? (
            <Avatar
              src={user?.user?.image?.trim() || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
              alt="Contact"
              size="sm"
            />
          ) : (
            <div className="w-8" /> // Maintain spacing when avatar isn't shown
          )}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isSelf ? 'items-end' : 'items-start'} order-1 gap-1`}>
          <div
            className={`
              relative rounded-2xl px-4 py-2 break-words
              ${isSelf 
                ? 'bg-indigo-600 text-white rounded-tr-none ml-2' 
                : 'bg-gray-100 text-gray-900 rounded-tl-none mr-2'}
            `}
          >
            <p className="max-w-prose">{message.content}</p>
          </div>

          {/* Timestamp and Status */}
          {showTimestamp && (
            <div className={`flex items-center gap-1 ${isSelf ? 'flex-row-reverse' : 'flex-row'}`}>
              <span className="text-xs text-gray-500">
                {formatTime(message.timestamp)}
              </span>
              {isSelf && (
                <span className="flex items-center">
                  {message.read ? (
                    <>
                      <Check size={12} className="text-blue-400" />
                      <Check size={12} className="-ml-2 text-blue-400" />
                    </>
                  ) : (
                    <Check size={12} className="text-gray-400" />
                  )}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;