import React, { useEffect, useRef } from 'react';
import { getMessages } from '../../../service/service';
import { chat } from '../../../entity/chat';
import Message from './Message';
import { socket } from '../../../service/service';

interface MessageListProps {
  currentUserId: string;
  receiverId: string;
  messages: chat[];
  setMessages: React.Dispatch<React.SetStateAction<chat[]>>;
}

const MessageList: React.FC<MessageListProps> = ({
  currentUserId,
  receiverId,
  messages,
  setMessages,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getMessages(currentUserId, receiverId);
        setMessages(response);
      } catch (err) {
        console.error('Failed to fetch messages:', err);
      }
    };

    if (currentUserId && receiverId) {
      fetchMessages();
    }
  }, [currentUserId, receiverId, setMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleNewMessage = (newMessage: chat) => {
      if (
        (newMessage.senderId === currentUserId && newMessage.receiverId === receiverId) ||
        (newMessage.senderId === receiverId && newMessage.receiverId === currentUserId)
      ) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on('receive_message', handleNewMessage);
    return () => socket.off('receive_message', handleNewMessage);
  }, [currentUserId, receiverId, setMessages]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
        <div className="flex flex-col gap-4">
          {messages.map((message, index) => {
            const showAvatar =
              index === 0 || messages[index - 1].senderId !== message.senderId;
            return (
              <Message
                key={`${message._id}-${index}`}
                message={message}
                showAvatar={showAvatar}
                showTimestamp={index === messages.length - 1 || showAvatar}
                currentUserId={currentUserId}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default MessageList;