import React, { useState, useEffect } from 'react';
import { Phone, Video, Info, Smile, Paperclip, Mic, Send } from 'lucide-react';
import Avatar from '../common/Avatar';
import MessageList from '../messages/MessageList';
import { getOneUser, socket } from '../../../service/service';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../../entity/user';

const ChatArea: React.FC = ({ id }) => {
  const [message, setMessage] = useState('');
  const [senderId, setSenderId] = useState<string | null>(null);
  const receiverId = id;
  const [error, setError] = useState('');
  const [profile, setProfile] = useState<User | null>(null);
  const [receiver, setReceiver] = useState<User | null>(null);
  const [messages, setMessages] = useState<any[]>([]); // Store incoming messages
  const token = localStorage.getItem('token');

  // Decode token and set sender ID
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode<{ _id: string }>(token);
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

  // Register user with socket on sender ID change
  useEffect(() => {
    if (senderId) {
      socket.emit('register_user', senderId);
    }
  }, [senderId]);

  // Fetch sender's profile
  useEffect(() => {
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

  // Fetch receiver's profile
  useEffect(() => {
    if (id && token) {
      getOneUser(id, token)
        .then((res) => {
          if (res?.user) {
            setReceiver(res.user);
          } else {
            setError('Failed to fetch user data.');
          }
        })
        .catch((err) => {
          console.error('API error:', err);
          setError('Error fetching user data.');
        });
    }
  }, [id]);

  // Listen for incoming messages from the socket server
  useEffect(() => {
    if (socket) {
      socket.on('receive_message', (messageData) => {
        console.log('Received message:', messageData);
        setMessages((prevMessages) => [...prevMessages, messageData]);
      });
    }

    return () => {
      if (socket) {
        socket.off('receive_message');
      }
    };
  }, []);

  // Handle message sending
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && senderId) {
      const messageData = {
        senderId,
        receiverId,
        content: message,
      };
      console.log('Sending message:', messageData);
      socket.emit('send_message', messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]); // Optionally add to message list locally
      setMessage('');
    } else {
      console.log('Message or senderId missing');
    }
  };

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-3 flex items-center justify-between border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <Avatar
            src={receiver?.avatarUrl || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'}
            alt="Contact"
            online={true}
          />
          <div>
            <h3 className="font-medium">{receiver?.name}</h3>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
            <Phone size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
            <Video size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
            <Info size={20} />
          </button>
        </div>
      </div>

      {senderId && (
        <MessageList currentUserId={profile?._id} receiverId={receiver?._id} messages={messages}     setMessages={setMessages} // Pass state handler
        />
      )}

      <div className="p-3 border-t border-gray-200 bg-white">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <button type="button" className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
            <Paperclip size={20} />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="bg-gray-100 w-full p-3 pr-10 rounded-full focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-indigo-600 transition-colors">
              <Smile size={20} />
            </button>
          </div>
          {message.trim() ? (
            <button type="submit" className="p-3 bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors text-white">
              <Send size={20} />
            </button>
          ) : (
            <button type="button" className="p-3 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
              <Mic size={20} />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
