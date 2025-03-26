import React from 'react';
import styled from 'styled-components';
import { FaUserAstronaut, FaStar, FaHistory, FaGlobe, FaUsers, FaHandHoldingHeart } from 'react-icons/fa';
import astroImage from '../images/astrologer_front.jpeg'
import dipanshuImage from '../images/dipanshu.jpeg'
import vivekImage from '../images/vivek.jpeg'
import rahulImage from '../images/2.jpeg'
import testImage from '../images/test.jpeg'

const PageContainer = styled.div`
  padding: 2rem 0;
`;

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
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: var(--primary-color);
  }
`;

const StorySection = styled.section`
  padding: 3rem 0;
`;

const StoryContent = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

// const StoryImage = styled.div`
//   flex: 1;
//   height: 600px;
//   background-image: url(${props => props.bgImage}); /* Use image from props */
//   background-size: cover;
//   background-position: center;
//   border-radius: 10px;
// `;

const StoryImage = styled.div`
  flex: 1;
  height: 600px;
  background-image: url(${props => props.bgImage});
  background-size: contain; /* Ensures the whole image is visible */
  background-repeat: no-repeat; /* Prevents tiling */
  background-position: center;
  border-radius: 10px;
`;

const StoryText = styled.div`
  flex: 1;
`;

const StoryHeading = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
`;

const StoryParagraph = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.8;
`;

const ValuesSection = styled.section`
  padding: 3rem 0;
  background-color: #FFF8E1;
  border-radius: 10px;
  margin: 3rem 0;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const ValueIcon = styled.div`
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
`;

const ValueTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ValueDescription = styled.p`
  color: var(--light-text);
  line-height: 1.6;
`;

const TeamSection = styled.section`
  padding: 3rem 0;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const TeamCard = styled.div`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const TeamMemberImage = styled.div`
  height: 250px;
  background-image: url(${props => props.bgImage}); /* Use image from props */
  background-size: cover;
  background-position: center;
`;

const TeamMemberInfo = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

const TeamMemberName = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const TeamMemberRole = styled.p`
  color: var(--primary-color);
  font-weight: 500;
  margin-bottom: 1rem;
`;

const TeamMemberBio = styled.p`
  color: var(--light-text);
  font-size: 0.9rem;
  line-height: 1.6;
`;

const AboutPage = () => {
  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>About FutureTalk</HeroTitle>
          <HeroSubtitle>
            Connecting you with expert astrologers for personalized guidance on your life's journey.
            Discover insights from ancient Hindu astrological traditions.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>
      
      <StorySection>
        <SectionTitle>Our Story</SectionTitle>
        <StoryContent>
          <StoryImage bgImage={astroImage} />
          <StoryText>
            <StoryHeading>Bridging Ancient Wisdom with Modern Technology</StoryHeading>
            <StoryParagraph>
              FutureTalk was founded in 2020 with a vision to make the ancient wisdom of Hindu astrology accessible to everyone in the modern digital age. Our founder, Rajesh Sharma, a third-generation astrologer, recognized the need for a platform that could connect people with authentic astrologers regardless of geographical boundaries.
            </StoryParagraph>
            <StoryParagraph>
              What started as a small initiative with just five astrologers has now grown into a thriving community of over 100 expert practitioners from various astrological traditions. We've helped thousands of individuals gain clarity and guidance on their life's path through personalized consultations.
            </StoryParagraph>
            <StoryParagraph>
              Our mission is to preserve and promote the authentic practices of Hindu astrology while making them relevant and accessible in today's fast-paced world. We believe that the ancient wisdom contained in these traditions can provide valuable insights and guidance for navigating life's challenges.
            </StoryParagraph>
          </StoryText>
        </StoryContent>
      </StorySection>
      
      <ValuesSection>
        <SectionTitle>Our Values</SectionTitle>
        <ValuesGrid>
          <ValueCard>
            <ValueIcon>
              <FaStar />
            </ValueIcon>
            <ValueTitle>Authenticity</ValueTitle>
            <ValueDescription>
              We are committed to preserving and sharing the authentic traditions of Hindu astrology. All our astrologers are thoroughly vetted for their knowledge and expertise.
            </ValueDescription>
          </ValueCard>
          
          <ValueCard>
            <ValueIcon>
              <FaHandHoldingHeart />
            </ValueIcon>
            <ValueTitle>Compassion</ValueTitle>
            <ValueDescription>
              We approach every consultation with empathy and understanding, recognizing that each person's journey is unique and deserving of respect.
            </ValueDescription>
          </ValueCard>
          
          <ValueCard>
            <ValueIcon>
              <FaGlobe />
            </ValueIcon>
            <ValueTitle>Accessibility</ValueTitle>
            <ValueDescription>
              We strive to make astrological guidance accessible to everyone, regardless of location, through our user-friendly digital platform.
            </ValueDescription>
          </ValueCard>
          
          <ValueCard>
            <ValueIcon>
              <FaHistory />
            </ValueIcon>
            <ValueTitle>Tradition</ValueTitle>
            <ValueDescription>
              We honor the rich heritage of Hindu astrology by maintaining the integrity of its practices while adapting them for contemporary needs.
            </ValueDescription>
          </ValueCard>
          
          <ValueCard>
            <ValueIcon>
              <FaUsers />
            </ValueIcon>
            <ValueTitle>Community</ValueTitle>
            <ValueDescription>
              We foster a supportive community where both astrologers and clients can connect, learn, and grow together.
            </ValueDescription>
          </ValueCard>
          
          <ValueCard>
            <ValueIcon>
              <FaUserAstronaut />
            </ValueIcon>
            <ValueTitle>Excellence</ValueTitle>
            <ValueDescription>
              We are dedicated to providing the highest quality of service and continuously improving our platform based on user feedback.
            </ValueDescription>
          </ValueCard>
        </ValuesGrid>
      </ValuesSection>
      
      <TeamSection>
        <SectionTitle>Our Team</SectionTitle>
        <TeamGrid>
          <TeamCard>
            <TeamMemberImage bgImage={rahulImage} />
            <TeamMemberInfo>
              <TeamMemberName>Rajesh Sharma</TeamMemberName>
              <TeamMemberRole>Founder & CEO</TeamMemberRole>
              <TeamMemberBio>
                A third-generation astrologer with over 25 years of experience in Vedic astrology. Rajesh founded FutureTalk to bridge the gap between ancient wisdom and modern technology.
              </TeamMemberBio>
            </TeamMemberInfo>
          </TeamCard>
          
          <TeamCard>
            <TeamMemberImage bgImage={dipanshuImage} />
            <TeamMemberInfo>
              <TeamMemberName>Priyank Patel</TeamMemberName>
              <TeamMemberRole>Chief Astrologer</TeamMemberRole>
              <TeamMemberBio>
                An expert in Nadi astrology with 15 years of experience. Priya oversees the quality of astrological services and mentors new astrologers joining the platform.
              </TeamMemberBio>
            </TeamMemberInfo>
          </TeamCard>
          
          <TeamCard>
            <TeamMemberImage bgImage={vivekImage} />
            <TeamMemberInfo>
              <TeamMemberName>Vikram Singh</TeamMemberName>
              <TeamMemberRole>CTO</TeamMemberRole>
              <TeamMemberBio>
                A tech enthusiast with a passion for astrology. Vikram leads the development of our platform, ensuring a seamless experience for both astrologers and clients.
              </TeamMemberBio>
            </TeamMemberInfo>
          </TeamCard>
          
          <TeamCard>
            <TeamMemberImage bgImage={testImage} />
            <TeamMemberInfo>
              <TeamMemberName>Ananya Gupta</TeamMemberName>
              <TeamMemberRole>Customer Experience</TeamMemberRole>
              <TeamMemberBio>
                With a background in psychology and customer service, Ananya ensures that every client receives personalized attention and support throughout their journey.
              </TeamMemberBio>
            </TeamMemberInfo>
          </TeamCard>
        </TeamGrid>
      </TeamSection>
    </PageContainer>
  );
};

export default AboutPage;
