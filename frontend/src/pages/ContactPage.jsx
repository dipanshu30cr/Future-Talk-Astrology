"use client"

import { useState } from "react"
import styled from "styled-components"
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"
import { toast } from "react-toastify"
import axios from "axios"

const PageContainer = styled.div`
  padding: 2rem 0;
`

const HeroSection = styled.section`
  background: linear-gradient(135deg, #FF9800 0%, #FF5722 100%);
  color: white;
  padding: 4rem 0;
  border-radius: 10px;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/placeholder.svg?height=500&width=500');
    background-size: cover;
    opacity: 0.1;
    z-index: 0;
  }
`

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`

const ContactSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`

const ContactForm = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`

const FormTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormGroup = styled.div``

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  resize: vertical;
  min-height: 150px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
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

const ContactInfo = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`

const InfoTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
`

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`

const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #FFF8E1;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
`

const InfoContent = styled.div``

const InfoLabel = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const InfoText = styled.p`
  color: var(--light-text);
  line-height: 1.6;
`

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #F5F5F5;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--primary-color);
    color: white;
    transform: translateY(-3px);
  }
`

const MapSection = styled.section`
  margin-top: 3rem;
`

const MapTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
`

const MapFrame = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #F5F5F5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--light-text);
  font-style: italic;
`

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   // Validate form
  //   if (!formData.name || !formData.email || !formData.subject || !formData.message) {
  //     toast.error("Please fill all fields")
  //     return
  //   }

  //   // Submit form
  //   setSubmitting(true)

  //   try {
  //     console.log("form-data: ",formData)
  //     const response = await axios.post("http://localhost:9000/api/contact/", formData)

  //     toast.success(response.data.success || "Your message has been sent successfully!")

  //     // Reset form
  //     setFormData({
  //       name: "",
  //       email: "",
  //       subject: "",
  //       message: "",
  //     })
  //   } catch (error) {
  //     console.error("Error sending message:", error)
  //     toast.error(error.response?.data?.error || "Failed to send message. Please try again.")
  //   } finally {
  //     setSubmitting(false)
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill all fields");
      return;
    }
  
    // Submit form
    setSubmitting(true);
  
    try {
      console.log("form-data: ", formData);
      const response = await axios.post("http://localhost:9000/api/contact/", formData);
  
      toast.success(response.data.success || "Your message has been sent successfully!");
  
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error.response?.data?.error || "Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Contact Us</HeroTitle>
          <HeroSubtitle>
            Have questions or need assistance? We're here to help. Reach out to us and our team will get back to you as
            soon as possible.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <ContactSection>
        <ContactForm>
          <FormTitle>Send Us a Message</FormTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Your Name</FormLabel>
              <FormInput
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Email Address</FormLabel>
              <FormInput
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Subject</FormLabel>
              <FormInput
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter subject"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Message</FormLabel>
              <FormTextarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
              />
            </FormGroup>

            <SubmitButton type="submit" disabled={submitting}>
              {submitting ? "Sending..." : "Send Message"}
            </SubmitButton>
          </Form>
        </ContactForm>

        <ContactInfo>
          <InfoTitle>Get in Touch</InfoTitle>
          <InfoList>
            <InfoItem>
              <InfoIcon>
                <FaMapMarkerAlt />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Our Location</InfoLabel>
                <InfoText>
                  123 Astrology Lane
                  <br />
                  Cosmic City, Universe 54321
                </InfoText>
              </InfoContent>
            </InfoItem>

            <InfoItem>
              <InfoIcon>
                <FaPhone />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Phone Number</InfoLabel>
                <InfoText>+1 (555) 123-4567</InfoText>
              </InfoContent>
            </InfoItem>

            <InfoItem>
              <InfoIcon>
                <FaEnvelope />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Email Address</InfoLabel>
                <InfoText>info@futuretalk.com</InfoText>
              </InfoContent>
            </InfoItem>
          </InfoList>

          <InfoTitle>Follow Us</InfoTitle>
          <SocialLinks>
            <SocialLink href="https://www.facebook.com/profile.php?id=100015708817180" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialLink>
            <SocialLink href="https://www.instagram.com/dipanshu_30cr?igsh=NmFzeXMxamRpYjFm" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialLink>
            <SocialLink href="https://www.youtube.com/@30cr" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </SocialLink>
          </SocialLinks>
        </ContactInfo>
      </ContactSection>

      <MapSection>
        <MapTitle>Our Location</MapTitle>
        <MapFrame>
          <iframe
            width="100%"
            height="300"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps?q=23.371992,85.307241&output=embed`}
            allowFullScreen
          ></iframe>
        </MapFrame>
      </MapSection>
    </PageContainer>
  )
}

export default ContactPage

