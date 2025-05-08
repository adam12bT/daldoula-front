import React, { useState, useEffect } from 'react';
import { Phone, Video, Info, Smile, Paperclip, Mic, Send } from 'lucide-react';
import Avatar from '../common/Avatar';
import MessageList from '../messages/MessageList';
import { getOneUser, socket } from '../../../service/service';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../../entity/user';

interface ChatAreaProps {
  id: string;
}

const ChatArea: React.FC<ChatAreaProps> = ({ id }) => {
  const [message, setMessage] = useState('');
  const [senderId, setSenderId] = useState<string | null>(null);
  const receiverId = id;
  const [error, setError] = useState('');
  const [profile, setProfile] = useState<User | null>(null);
  const [receiver, setReceiver] = useState<User | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode<{ id: string }>(token);
        setSenderId(decodedToken.id);
      } catch (err) {
        console.error('Invalid token:', err);
        setError('Invalid token. Please log in again.');
      }
    } else {
      setError('Authentication required. Please log in.');
    }
  }, []);

  useEffect(() => {
    if (senderId) {
      socket.emit('register_user', senderId);
    }
  }, [senderId]);

  useEffect(() => {
    if (senderId && token) {
      getOneUser(senderId, token)
        .then((res) => {
          if (res?.user) setProfile(res.user);
          else setError('Failed to fetch sender data.');
        })
        .catch((err) => {
          console.error('Fetch sender error:', err);
          setError('Error fetching sender data.');
        });
    }
  }, [senderId]);

  useEffect(() => {
    if (id && token) {
      getOneUser(id, token)
        .then((res) => {
          if (res?.user) setReceiver(res.user);
          else setError('Failed to fetch receiver data.');
        })
        .catch((err) => {
          console.error('Fetch receiver error:', err);
          setError('Error fetching receiver data.');
        });
    }
  }, [id]);

  useEffect(() => {
    if (socket) {
      socket.on('receive_message', (messageData) => {
        setMessages((prev) => [...prev, messageData]);
      });
    }
    return () => {
      socket.off('receive_message');
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && senderId) {
      const messageData = {
        senderId,
        receiverId,
        content: message,
      };
      socket.emit('send_message', messageData);
      setMessages((prev) => [...prev, messageData]);
      setMessage('');
    }
  };

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-3 flex items-center justify-between border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <Avatar
            src={receiver?.image || 'data:image/png;base64,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'}
            alt={receiver?.name}
          />
          <div>
            <div className="font-semibold">{receiver?.name}</div>
            <div className="text-xs text-gray-500">Online</div>
          </div>
        </div>
        <div className="flex gap-4">
          <Phone className="cursor-pointer text-gray-600" />
          <Video className="cursor-pointer text-gray-600" />
          <Info className="cursor-pointer text-gray-600" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <MessageList
            messages={messages}
            senderId={senderId}
            currentUserId={senderId || ''}
            receiverId={receiverId}
            setMessages={setMessages}
          />
        </div>
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 border-t border-gray-200 p-3 bg-white"
      >
        <Smile className="text-gray-500 cursor-pointer" />
        <Paperclip className="text-gray-500 cursor-pointer" />
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Mic className="text-gray-500 cursor-pointer" />
        <button type="submit">
          <Send className="text-blue-500 cursor-pointer" />
        </button>
      </form>
    </div>
  );
};

export default ChatArea;