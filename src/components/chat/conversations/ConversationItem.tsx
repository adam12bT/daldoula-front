import React from 'react';
import Avatar from '../common/Avatar';
import { ConversationType } from '../../../../../../../project/src/types';

interface ConversationItemProps {
  conversation: ConversationType;
}

const ConversationItem: React.FC<ConversationItemProps> = ({ conversation }) => {
  const { name,  online, active } = conversation;
  
const avatar= conversation.image || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAvgMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABQYHAQMEAv/EADwQAAIBAgQCAw0FCQAAAAAAAAABAgMEBQYRITFBElFxFCIyQkNSYXKBkaHB0RNisbLhFSMkRFNjg5Lx/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwDUgAaZAAAAAAAAAD81JxpwlOpOMYRWspN7ID9Aq2JZvp05Onh9L7Vrys9l7EQlXMuK1JNq5UF1RikBonuBn9vmnFKMtZ1IVV1Tj9Cx4Rma0v5KlWXc9Z8FJ97LsfICdA0/4AAAAAAAAAAAAAAAAAAAAAADkpRjFynJRilq23skZ9mLG6mJ13SpNxs4PvYef95k9nTEHQs4WdN6Srbz9RfUpHJdfModu4AKgHutHw6gCEW/KmOznKNhez6T8jUl+Vsthk0JOElKD0knqn1dXxNLwW+/aOG0a78PTSfrLiRX3AAAAAAAAAAAAAAAAAAAAArPM2V3Xxyum9VT0giHJHMKaxu8T/qfIjis0ABQAApAt+Q676N3btvopxmvwKgWjIafdty+Spr8TKrn2gAAAAAAAAAAAAAAAAAAAAM9zbRdLG6za2qJTXuIYueeLF1aFO9prX7LvZ6ea+DKYUAAVAACkC4ZDotU7qvps2oJlQW+2mreyNJy/YuwwqlRloqkl059r30MqkQAAAAAAAAAAAAAAAAAAAAH4q04VqU6VWKlCa6Mk+DRn2O4JWwuq5xi52kn3tRLwfRLqZohySjKLjKKlFrRppNP3gZMzhf7zKuGXGsqcJ202/Iy1j/q9iOnkpJ/u7/b71Hf4MoqI5Fwp5Lp+Vvp6f26S1fvZL4fgGHWEo1KVv8AaVF5SrLptdmuyIIPLGX5upC+v6fQhHelSkt2/Oa5LqLgGAAAAAAAAAAAAAAAAAAAAAHnWq06VKVSrUjCEVq5SeiQHoceiWr4db4FVxPN8IuVLDafT02+2qrb2R5lavcSvb2Td1czn6NdEvYgNCuMXw+3bVW8oprkpav4HySzPhMdlcN/42Z77AU1osMy4TP+a6PbBo+23v7O50VC5o1PQp7mWjg01otOYTWt9qBm1hjuI2Oip3DlT506nfJ/MtWFZotL1qlcruaty6T1hLsfIi6nwFvw3AAAAAAAAAAAAAAAAPC9uqNlbVLi4l0YQWvb6APLE8Rt8NtnWuZbPwYLjN9SKBi+L3WK1XKvLo0l4FKL2j9X6TzxXEa2J3cq9Z7eJBcIo+MAACoAAoAAAH6QCUifwHMdWwcbe7bq2r233lT7OtegvNGtTr0o1aU1OnNaqS5mTk7ljG3h1dULiX8LUej18R9aCr8Diaa1T1XX1nSAAAAAAAAAAABRM4Ym7u97kpS1o273a4Snz9xbcavVh+F3Fx40Y9GHrPZfUzNtttt6tvXUDnZwABQABUAAAAAAAAByAJSLvk3E3c2zsq0tatBd43xcP0LIZfhd48PxCjdLwYSXTXnR5o09NSScXqmk01zTIroAAAAAAAABx8AKrny4ap2lrylJ1ZLs2XzKeT+dajnjfRfiUopfF/MgCgACoAAAAAAAAAAAACBoufA0bLFw7nBLaUnrKnF0m/V4fDQzkuuRKjlh9zT5Rqpr2r9AqzAAgAAAAAAAAzzNr1x+416oflIcAqUABQAAAAAAAAAAAAAC35Bfe3q5dKH4M4CUW0AEaAAEf//Z'; // Placeholder image if none provided

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