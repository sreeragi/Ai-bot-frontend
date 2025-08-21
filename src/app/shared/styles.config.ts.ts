export interface UserStyle {
  primaryColor: string;
  headerBg: string;
  headerText: string;
  greeting: string;
  botMessageBg: string;
  userMessageBg: string;
  userMessageText: string;
   bgColor?: string; 
}

export const USER_STYLES: Record<'user1' | 'user2' | 'user3', UserStyle> = {
  user1: {
    primaryColor: '#007bff',
    headerBg: '#004085',
    headerText: 'Chat with us',
    greeting: 'Hi John! How can I help you today?',
    botMessageBg: '#f1f1f1',
    userMessageBg: '#007bff',
    userMessageText: '#fff',
   
  },
  user2: {
    primaryColor: '#28a745',
    headerBg: '#155724',
    headerText: 'Customer Support',
    greeting: 'Hello Alice! Need help?',
    botMessageBg: '#e8f5e9',
    userMessageBg: '#28a745',
    userMessageText: '#fff',
    bgColor: '#f9fafb'

  },
  user3: {
    primaryColor: '#ffc107',
    headerBg: '#856404',
    headerText: 'Support Desk',
    greeting: 'Hey Bob! What can I do for you today?',
    botMessageBg: '#fff3cd',
    userMessageBg: '#ffc107',
    userMessageText: '#000',
    bgColor: '#f9fafb'

  }
};
