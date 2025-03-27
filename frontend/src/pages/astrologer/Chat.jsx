import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import styled from 'styled-components';
import { FaArrowLeft, FaPaperPlane, FaUser } from 'react-icons/fa';

const ChatContainer = styled.div`
  padding: 1rem;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color);
  margin-bottom: 1rem;
  font-weight: 500;
  
  &:hover {
    color: var(--accent-color);
  }
`;

const ChatCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CustomerImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-image: url('/placeholder.svg?height=40&width=40');
  background-size: cover;
  background-position: center;
`;

const CustomerInfo = styled.div``;

const CustomerName = styled.div`
  font-weight: 600;
`;

const BookingInfo = styled.div`
  font-size: 0.8rem;
  color: var(--light-text);
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  gap: 0.5rem;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  background-color: ${props => props.isUser ? 'var(--accent-color)' : '#F5F5F5'};
  color: ${props => props.isUser ? 'white' : 'var(--text-color)'};
  border-bottom-right-radius: ${props => props.isUser ? '0.25rem' : '1rem'};
  border-bottom-left-radius: ${props => !props.isUser ? '0.25rem' : '1rem'};
`;

const MessageTime = styled.div`
  font-size: 0.7rem;
  color: var(--light-text);
`;

const ChatFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid var(--border-color);
`;

const MessageForm = styled.form`
  display: flex;
  gap: 0.5rem;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 2rem;
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

const SendButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--accent-color);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #7B1FA2;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const NoConversation = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--light-text);
  text-align: center;
  padding: 2rem;
`;

// const Chat = () => {
//   const { bookingId } = useParams();
//   const { user } = useAuth();
//   const chatBodyRef = useRef(null);
  
//   const [booking, setBooking] = useState(null);
//   const [conversation, setConversation] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   useEffect(() => {
//     const fetchBookingAndConversation = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch booking details
//         const bookingResponse = await axios.get(`http://localhost:9000/api/bookings/astrologer/${bookingId}/`);
//         setBooking(bookingResponse.data);
        
//         // Fetch or create conversation
//         const conversationResponse = await axios.get(`http://localhost:9000/api/bookings/conversation/${bookingId}/`);
//         setConversation(conversationResponse.data);
//         setMessages(conversationResponse.data.messages);
        
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError('Failed to load conversation');
//         setLoading(false);
//       }
//     };
    
//     fetchBookingAndConversation();
    
//     // Set up polling for new messages
//     const intervalId = setInterval(() => {
//       if (conversation) {
//         fetchNewMessages();
//       }
//     }, 5000);
    
//     return () => clearInterval(intervalId);
//   }, [bookingId, conversation]);
  
//   const fetchNewMessages = async () => {
//     try {
//       const response = await axios.get(`http://localhost:9000/api/bookings/conversation/${bookingId}/`);
//       setMessages(response.data.messages);
//     } catch (err) {
//       console.error('Error fetching new messages:', err);
//     }
//   };
  
//   useEffect(() => {
//     // Scroll to bottom when messages change
//     if (chatBodyRef.current) {
//       chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
//     }
//   }, [messages]);
  
//   const handleSendMessage = async (e) => {
//     e.preventDefault();
    
//     if (!newMessage.trim()) return;
    
//     try {
//       const response = await axios.post(`http://localhost:9000/api/bookings/conversation/${conversation.id}/messages/`, {
//         content: newMessage
//       });
      
//       // Add new message to the list
//       setMessages([...messages, response.data]);
      
//       // Clear input
//       setNewMessage('');
//     } catch (err) {
//       console.error('Error sending message:', err);
//     }
//   };
  
//   if (loading) {
//     return <div>Loading conversation...</div>;
//   }
  
//   if (error) {
//     return <div>Error: {error}</div>;
//   }
  
//   if (!booking) {
//     return <div>Booking not found</div>;
//   }
  
//   // Group messages by sender
//   const groupedMessages = [];
//   let currentGroup = null;
  
//   messages.forEach(message => {
//     const isUser = message.sender === user.id;
    
//     if (!currentGroup || currentGroup.isUser !== isUser) {
//       currentGroup = {
//         isUser,
//         messages: [message]
//       };
//       groupedMessages.push(currentGroup);
//     } else {
//       currentGroup.messages.push(message);
//     }
//   });
  
const Chat = () => {
  const { bookingId } = useParams();
  const { user } = useAuth();
  const chatBodyRef = useRef(null);
  
  const [booking, setBooking] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch booking and conversation data
  useEffect(() => {
    const fetchBookingAndConversation = async () => {
      try {
        setLoading(true);

        // Fetch booking details
        const bookingResponse = await axios.get(`http://localhost:9000/api/bookings/astrologer/${bookingId}/`);
        setBooking(bookingResponse.data);

        // Fetch or create conversation
        const conversationResponse = await axios.get(`http://localhost:9000/api/bookings/conversation/${bookingId}/`);
        setConversation(conversationResponse.data);
        setMessages(conversationResponse.data.messages); // Set messages data initially

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load conversation');
        setLoading(false);
      }
    };

    fetchBookingAndConversation();
  }, [bookingId]); // Fetch booking and conversation only on bookingId change

  // Set up polling for new messages every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (conversation) {
        fetchNewMessages(); // Fetch new messages periodically
      }
    }, 5000);

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, [conversation]); // Only rely on conversation for polling

  // Fetch new messages for conversation
  const fetchNewMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/bookings/conversation/${bookingId}/`);
      if (JSON.stringify(response.data.messages) !== JSON.stringify(messages)) {
        setMessages(response.data.messages); // Only update if new messages are different
      }
    } catch (err) {
      console.error('Error fetching new messages:', err);
    }
  };

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]); // Scroll to bottom on message change

  // Handle sending new messages
  // const handleSendMessage = async (e) => {
  //   e.preventDefault();

  //   if (!newMessage.trim()) return;

  //   try {
  //     const response = await axios.post(`http://localhost:9000/api/bookings/conversation/${conversation.id}/messages/`, {
  //       content: newMessage,
  //     });

  //     // Add new message to the list immediately
  //     setMessages((prevMessages) => [...prevMessages, response.data]);

  //     // Clear input
  //     setNewMessage('');
  //   } catch (err) {
  //     console.error('Error sending message:', err);
  //   }
  // };

  const handleSendMessage = async (e) => {
    e.preventDefault();
  
    if (!newMessage.trim()) return;
  
    try {
      console.log('Sending message:', newMessage);
      console.log('Conversation ID:', conversation.id);
      
      // Prepare message data
      const messageData = {
        content: newMessage,
        conversation: conversation.id,  // Include conversation ID
        sender: user.id  // Include sender ID (assuming `user.id` is the sender)
      };
  
      // Send message request
      const response = await axios.post(`http://localhost:9000/api/bookings/conversation/${conversation.id}/messages/`, messageData);
  
      console.log('Message sent successfully:', response.data);
  
      // Add new message to the list immediately
      setMessages((prevMessages) => [...prevMessages, response.data]);
  
      // Clear input
      setNewMessage('');
    } catch (err) {
      // Log detailed error info
      console.error('Error sending message:', err.response ? err.response.data : err.message);
    }
  };

  


  

  if (loading) {
    return <div>Loading conversation...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!booking) {
    return <div>Booking not found</div>;
  }

  // Group messages by sender
  const groupedMessages = [];
  let currentGroup = null;

  messages.forEach(message => {
    const isUser = message.sender === user.id;

    if (!currentGroup || currentGroup.isUser !== isUser) {
      currentGroup = {
        isUser,
        messages: [message],
      };
      groupedMessages.push(currentGroup);
    } else {
      currentGroup.messages.push(message);
    }
  });


  return (
    <ChatContainer>
      <BackLink to={`/astrologer/bookings/${bookingId}`}>
        <FaArrowLeft /> Back to Booking
      </BackLink>
      
      <ChatCard>
        <ChatHeader>
          <CustomerImage />
          <CustomerInfo>
            <CustomerName>
              {booking.customer_details.first_name} {booking.customer_details.last_name}
            </CustomerName>
            <BookingInfo>
              {new Date(booking.booking_date).toLocaleDateString()} • {booking.start_time} - {booking.end_time}
            </BookingInfo>
          </CustomerInfo>
        </ChatHeader>
        
        <ChatBody ref={chatBodyRef}>
          {groupedMessages.length > 0 ? (
            groupedMessages.map((group, groupIndex) => (
              <MessageGroup key={groupIndex} isUser={group.isUser}>
                {group.messages.map((message, messageIndex) => (
                  <div key={message.id || messageIndex}>
                    <MessageBubble isUser={group.isUser}>
                      {message.content}
                    </MessageBubble>
                    <MessageTime>
                      {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </MessageTime>
                  </div>
                ))}
              </MessageGroup>
            ))
          ) : (
            <NoConversation>
              <FaUser size={40} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <h3>Start a conversation</h3>
              <p>Send a message to begin chatting with the customer</p>
            </NoConversation>
          )}
        </ChatBody>
        
        <ChatFooter>
          <MessageForm onSubmit={handleSendMessage}>
            <MessageInput
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <SendButton type="submit">
              <FaPaperPlane />
            </SendButton>
          </MessageForm>
        </ChatFooter>
      </ChatCard>
    </ChatContainer>
  );
};

export default Chat;
