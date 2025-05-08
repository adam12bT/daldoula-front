import React, { useEffect, useState } from 'react';
import ConversationItem from './ConversationItem';
import { getchatPartners, getOneUser } from '../../../service/service';
import { User } from '../../../entity/user';


interface ConversationListProps {
  userid: string;
  onSelectUser: (user: User) => void;
}
const ConversationList: React.FC<ConversationListProps> = ({ userid ,onSelectUser }) => {
  const [chatPartners, setChatPartners] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
const token =localStorage.getItem('token')
  useEffect(() => {
    const fetchChatUsers = async () => {
      
      try {
        const partnerIds: string[] = await getchatPartners(userid); // assumes it returns array of IDs
        const users = await Promise.all(partnerIds.map(id => getOneUser(id,token)));
        setChatPartners(users);

} catch (error) {
        console.error('Failed to fetch chat users', error);
      } finally {
        setLoading(false);
      }
    };

    if (userid) {
      fetchChatUsers();
    }
  }, [userid,token,chatPartners]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="py-2">
{chatPartners.map((user) => (
  <div key={user.id} onClick={() => onSelectUser(user.user)} className="cursor-pointer">
    <ConversationItem conversation={user.user} />
  </div>
))}

    </div>
  );
};

export default ConversationList;
