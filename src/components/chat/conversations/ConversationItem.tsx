import React from 'react';
import Avatar from '../common/Avatar';
import { ConversationType } from '../../../../../../../project/src/types';

interface ConversationItemProps {
  conversation: ConversationType;
}

const ConversationItem: React.FC<ConversationItemProps> = ({ conversation }) => {
  const { name,  online, active } = conversation;
  
const avatar="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp"

  return (
    <div 
      className={`px-3 py-2 flex items-center gap-3 cursor-pointer transition-colors hover:bg-gray-100 ${
        active ? 'bg-gray-100' : ''
      }`}
    >
      <Avatar src={avatar} alt={name} online={online} />
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h4 className="font-medium truncate">{name}</h4>
       
        </div>
        

      </div>
    </div>
  );
};

export default ConversationItem;