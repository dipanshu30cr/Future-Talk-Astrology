"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import axios from "axios"
import styled from "styled-components"
import { FaArrowLeft, FaPaperPlane, FaUser } from "react-icons/fa"

const ChatContainer = styled.div`
  padding: 1rem;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color);
  margin-bottom: 1rem;
  font-weight: 500;
  
  &:hover {
    color: var(--primary-color);
  }
`

const ChatCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const ChatHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 1rem;
`

const AstrologerImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-image: url('/placeholder.svg?height=40&width=40');
  background-size: cover;
  background-position: center;
`

const AstrologerInfo = styled.div``

const AstrologerName = styled.div`
  font-weight: 600;
`

const AstrologerStatus = styled.div`
  font-size: 0.8rem;
  color: var(--success-color);
`

const ChatBody = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const MessageGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  gap: 0.5rem;
`

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => (props.isUser ? "var(--primary-color)" : "#F5F5F5")};
  color: ${(props) => (props.isUser ? "white" : "var(--text-color)")};
  border-bottom-right-radius: ${(props) => (props.isUser ? "0.25rem" : "1rem")};
  border-bottom-left-radius: ${(props) => (!props.isUser ? "0.25rem" : "1rem")};
`

const MessageTime = styled.div`
  font-size: 0.7rem;
  color: var(--light-text);
`

const ChatFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid var(--border-color);
`

const MessageForm = styled.form`
  display: flex;
  gap: 0.5rem;
`

const MessageInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 2rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`

const SendButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #E64A19;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

const NoConversation = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--light-text);
  text-align: center;
  padding: 2rem;
`

const Chat = () => {
  const { bookingId } = useParams()
  const { user } = useAuth()
  const chatBodyRef = useRef(null)

  const [booking, setBooking] = useState(null)
  const [conversation, setConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // useEffect(() => {
  //   const fetchBookingAndConversation = async () => {
  //     try {
  //       setLoading(true)

  //       // Fetch booking details
  //       const bookingResponse = await axios.get(`http://localhost:8000/api/bookings/customer/${bookingId}/`)
  //       setBooking(bookingResponse.data)

  //       // Fetch or create conversation
  //       const conversationResponse = await axios.get(`http://localhost:8000/api/bookings/conversation/${bookingId}/`)
  //       setConversation(conversationResponse.data)
  //       setMessages(conversationResponse.data.messages)

  //       setLoading(false)
  //     } catch (err) {
  //       console.error("Error fetching data:", err)
  //       setError("Failed to load conversation")
  //       setLoading(false)
  //     }
  //   }

  //   fetchBookingAndConversation()

  //   // Set up polling for new messages
  //   const intervalId = setInterval(() => {
  //     if (conversation) {
  //       fetchNewMessages()
  //     }
  //   }, 5000)

  //   return () => clearInterval(intervalId)
  // }, [bookingId, conversation])

  // const fetchNewMessages = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:8000/api/bookings/conversation/${bookingId}/`)
  //     setMessages(response.data.messages)
  //   } catch (err) {
  //     console.error("Error fetching new messages:", err)
  //   }
  // }

  // useEffect(() => {
  //   // Scroll to bottom when messages change
  //   if (chatBodyRef.current) {
  //     chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
  //   }
  // }, [messages])



  // const handleSendMessage = async (e) => {
  //   e.preventDefault()

  //   if (!newMessage.trim()) return

  //   try {
  //     const response = await axios.post(
  //       `http://localhost:8000/api/bookings/conversation/${conversation.id}/messages/`,
  //       {
  //         content: newMessage,
  //       },
  //     )

  //     // Add new message to the list
  //     setMessages([...messages, response.data])

  //     // Clear input
  //     setNewMessage("")
  //   } catch (err) {
  //     console.error("Error sending message:", err)
  //   }
  // }



// This effect will fetch the conversation data once on component mount
  useEffect(() => {
    const fetchBookingAndConversation = async () => {
      try {
        setLoading(true);

        // Fetch booking details
        const bookingResponse = await axios.get(`http://localhost:9000/api/bookings/customer/${bookingId}/`);
        setBooking(bookingResponse.data);

        // Fetch or create conversation
        const conversationResponse = await axios.get(`http://localhost:9000/api/bookings/conversation/${bookingId}/`);
        setConversation(conversationResponse.data);
        setMessages(conversationResponse.data.messages);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load conversation");
        setLoading(false);
      }
    };

    fetchBookingAndConversation();

  }, [bookingId]); // Run once when the component is first mounted

  // This function will fetch new messages when necessary
  const fetchNewMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/bookings/conversation/${bookingId}/`);
      if (response.data.messages.length > messages.length) {
        setMessages(response.data.messages); // Only update if there are new messages
      }
    } catch (err) {
      console.error("Error fetching new messages:", err);
    }
  };

  // Poll for new messages only once every 10 seconds (to reduce frequency)
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchNewMessages();
    }, 10000); // Poll every 10 seconds for new messages

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [messages]); // Only run when messages state changes

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle sending a message
  // const handleSendMessage = async (e) => {
  //   e.preventDefault();

  //   if (!newMessage.trim()) return;

  //   try {
  //     const response = await axios.post(
  //       `http://localhost:9000/api/bookings/conversation/${conversation.id}/messages/`,
  //       {
  //         content: newMessage,
  //       },
  //     );

  //     // Add new message to the list without re-fetching all messages
  //     setMessages((prevMessages) => [...prevMessages, response.data]);

  //     // Clear input
  //     setNewMessage("");
  //   } catch (err) {
  //     console.error("Error sending message:", err);
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
    return <div>Loading conversation...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!booking) {
    return <div>Booking not found</div>
  }

  // Group messages by sender
  const groupedMessages = []
  let currentGroup = null

  messages.forEach((message) => {
    const isUser = message.sender === user.id

    if (!currentGroup || currentGroup.isUser !== isUser) {
      currentGroup = {
        isUser,
        messages: [message],
      }
      groupedMessages.push(currentGroup)
    } else {
      currentGroup.messages.push(message)
    }
  })

  return (
    <ChatContainer>
      <BackLink to={`/customer/bookings/${bookingId}`}>
        <FaArrowLeft /> Back to Booking
      </BackLink>

      <ChatCard>
        <ChatHeader>
          <AstrologerImage />
          <AstrologerInfo>
            <AstrologerName>
              {booking.astrologer_details.user.first_name} {booking.astrologer_details.user.last_name}
            </AstrologerName>
            <AstrologerStatus>Online</AstrologerStatus>
          </AstrologerInfo>
        </ChatHeader>

        <ChatBody ref={chatBodyRef}>
          {groupedMessages.length > 0 ? (
            groupedMessages.map((group, groupIndex) => (
              <MessageGroup key={groupIndex} isUser={group.isUser}>
                {group.messages.map((message, messageIndex) => (
                  <div key={message.id || messageIndex}>
                    <MessageBubble isUser={group.isUser}>{message.content}</MessageBubble>
                    <MessageTime>
                      {new Date(message.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </MessageTime>
                  </div>
                ))}
              </MessageGroup>
            ))
          ) : (
            <NoConversation>
              <FaUser size={40} style={{ marginBottom: "1rem", opacity: 0.5 }} />
              <h3>Start a conversation</h3>
              <p>Send a message to begin chatting with the astrologer</p>
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
  )
}

export default Chat

