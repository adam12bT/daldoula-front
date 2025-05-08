export interface Message {
    senderId: string; // User's ID who sent the message
    receiverId: string; // User's ID who will receive the message
    content: string; // Message content
  }
  