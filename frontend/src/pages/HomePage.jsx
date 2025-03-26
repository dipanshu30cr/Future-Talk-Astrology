import { Link } from "react-router-dom"
import styled from "styled-components"
import { FaUserAstronaut, FaStar } from "react-icons/fa"
import dipanshuImage from '../images/dipanshu.jpeg'
import vivekImage from '../images/vivek.jpeg'
import rahulImage from '../images/rahul.jpeg'
//import dipanshuImage from '../images/dipanshu.jpeg'


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

const HeroButton = styled(Link)`
  display: inline-block;
  background-color: white;
  color: var(--primary-color);
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`

const ServicesSection = styled.section`
  padding: 3rem 0;
`

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
`

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const ServiceCard = styled.div`
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
`

const ServiceIcon = styled.div`
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
`

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`

const ServiceDescription = styled.p`
  color: var(--light-text);
  line-height: 1.6;
`

const FeaturedAstrologersSection = styled.section`
  padding: 3rem 0;
  background-color: #F5F5F5;
  border-radius: 10px;
  margin: 3rem 0;
`

const AstrologersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const AstrologerCard = styled.div`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`

const AstrologerImage = styled.div`
  height: 200px;
  background-image: url(${props => props.bgImage}); /* Use image from props */
  background-size: cover;
  background-position: center;
`;

const AstrologerInfo = styled.div`
  padding: 1.5rem;
`

const AstrologerName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const AstrologerSpecialty = styled.p`
  color: var(--light-text);
  font-size: 0.9rem;
  margin-bottom: 1rem;
`

const AstrologerRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: var(--secondary-color);
`

const AstrologerButton = styled(Link)`
  display: block;
  text-align: center;
  padding: 0.75rem;
  background-color: var(--primary-color);
  color: white;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #E64A19;
  }
`

const HowItWorksSection = styled.section`
  padding: 3rem 0;
`

const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 250px;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`

const StepNumber = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`

const StepTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
`

const StepDescription = styled.p`
  color: var(--light-text);
  line-height: 1.6;
`

const TestimonialsSection = styled.section`
  padding: 3rem 0;
  background-color: #F5F5F5;
  border-radius: 10px;
  margin: 3rem 0;
`

const TestimonialsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const TestimonialCardStyled = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  position: relative;
`

const TestimonialQuote = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-style: italic;
  color: var(--text-color);
  
  &:before {
    content: '"';
    font-size: 3rem;
    color: var(--primary-color);
    opacity: 0.2;
    position: absolute;
    top: 1rem;
    left: 1rem;
  }
`

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const AuthorImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url('/placeholder.svg?height=50&width=50');
  background-size: cover;
  background-position: center;
`

const AuthorInfo = styled.div``

const AuthorName = styled.h4`
  font-weight: 600;
  margin-bottom: 0.25rem;
`

const AuthorLocation = styled.p`
  font-size: 0.9rem;
  color: var(--light-text);
`

const CTASection = styled.section`
  background: linear-gradient(135deg, #9C27B0 0%, #673AB7 100%);
  color: white;
  padding: 4rem 0;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 3rem;
`

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const CTADescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: white;
  color: var(--accent-color);
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`

const HomePage = () => {
  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Discover Your Future with Expert Astrologers</HeroTitle>
          <HeroSubtitle>
            Connect with experienced astrologers for personalized guidance on your life's journey. Explore ancient Hindu
            astrological traditions and gain insights into your destiny.
          </HeroSubtitle>
          <HeroButton to="/astrologers">Consult an Astrologer</HeroButton>
        </HeroContent>
      </HeroSection>

      <ServicesSection>
        <SectionTitle>Our Services</SectionTitle>
        <ServicesGrid>
          <ServiceCard>
            <ServiceIcon>
              <FaUserAstronaut />
            </ServiceIcon>
            <ServiceTitle>Vedic Astrology</ServiceTitle>
            <ServiceDescription>
              Discover insights from ancient Vedic traditions. Our expert astrologers analyze your birth chart to reveal
              your life path.
            </ServiceDescription>
          </ServiceCard>

          <ServiceCard>
            <ServiceIcon>
              <FaUserAstronaut />
            </ServiceIcon>
            <ServiceTitle>Nadi Astrology</ServiceTitle>
            <ServiceDescription>
              Explore the ancient Tamil system of astrology that predicts your future based on palm leaf inscriptions.
            </ServiceDescription>
          </ServiceCard>

          <ServiceCard>
            <ServiceIcon>
              <FaUserAstronaut />
            </ServiceIcon>
            <ServiceTitle>Numerology</ServiceTitle>
            <ServiceDescription>
              Understand the mystical relationship between numbers and events. Learn how numbers influence your life.
            </ServiceDescription>
          </ServiceCard>

          <ServiceCard>
            <ServiceIcon>
              <FaUserAstronaut />
            </ServiceIcon>
            <ServiceTitle>Tarot Reading</ServiceTitle>
            <ServiceDescription>
              Get guidance through tarot cards. Our readers interpret the cards to provide insights into your past,
              present, and future.
            </ServiceDescription>
          </ServiceCard>

          <ServiceCard>
            <ServiceIcon>
              <FaUserAstronaut />
            </ServiceIcon>
            <ServiceTitle>Palmistry</ServiceTitle>
            <ServiceDescription>
              Discover what your hands reveal about your character and destiny through the ancient art of palm reading.
            </ServiceDescription>
          </ServiceCard>

          <ServiceCard>
            <ServiceIcon>
              <FaUserAstronaut />
            </ServiceIcon>
            <ServiceTitle>Vastu Shastra</ServiceTitle>
            <ServiceDescription>
              Learn how to harmonize your living and working spaces with the cosmic energies for prosperity and
              well-being.
            </ServiceDescription>
          </ServiceCard>
        </ServicesGrid>
      </ServicesSection>

      <FeaturedAstrologersSection>
        <SectionTitle>Featured Astrologers</SectionTitle>
        <AstrologersGrid>
          <AstrologerCard>
            <AstrologerImage bgImage={rahulImage} />
            <AstrologerInfo>
              <AstrologerName>Rahul Raj</AstrologerName>
              <AstrologerSpecialty>Vedic Astrology, Numerology, Palm Reading, Healing</AstrologerSpecialty>
              <AstrologerRating>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <span>5.0 (120 reviews)</span>
              </AstrologerRating>
              <AstrologerButton to="/astrologers/1">Book Now</AstrologerButton>
            </AstrologerInfo>
          </AstrologerCard>

          <AstrologerCard>
            <AstrologerImage bgImage={vivekImage} />
            <AstrologerInfo>
              <AstrologerName>Vivek Kodwar Mahato</AstrologerName>
              <AstrologerSpecialty>Nadi Astrology, Palmistry, Face Readinh</AstrologerSpecialty>
              <AstrologerRating>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <span>4.9 (98 reviews)</span>
              </AstrologerRating>
              <AstrologerButton to="/astrologers/2">Book Now</AstrologerButton>
            </AstrologerInfo>
          </AstrologerCard>

          <AstrologerCard>
            <AstrologerImage />
            <AstrologerInfo>
              <AstrologerName>Nidhi Gupta</AstrologerName>
              <AstrologerSpecialty>Tarot Reading, Vastu, Healing, Tarot Reading</AstrologerSpecialty>
              <AstrologerRating>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <span>4.8 (87 reviews)</span>
              </AstrologerRating>
              <AstrologerButton to="/astrologers/3">Book Now</AstrologerButton>
            </AstrologerInfo>
          </AstrologerCard>

          <AstrologerCard>
            <AstrologerImage bgImage={dipanshuImage} />
            <AstrologerInfo>
              <AstrologerName>Dipanshu Raj</AstrologerName>
              <AstrologerSpecialty>Vedic Astrology, Vastu Shastra, Tarot Reading, Palmistry</AstrologerSpecialty>
              <AstrologerRating>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <span>4.7 (105 reviews)</span>
              </AstrologerRating>
              <AstrologerButton to="/astrologers/4">Book Now</AstrologerButton>
            </AstrologerInfo>
          </AstrologerCard>
        </AstrologersGrid>
      </FeaturedAstrologersSection>

      <HowItWorksSection>
        <SectionTitle>How It Works</SectionTitle>
        <StepsContainer>
          <Step>
            <StepNumber>1</StepNumber>
            <StepTitle>Choose an Astrologer</StepTitle>
            <StepDescription>
              Browse through our list of experienced astrologers and select one based on their expertise and reviews.
            </StepDescription>
          </Step>

          <Step>
            <StepNumber>2</StepNumber>
            <StepTitle>Book a Consultation</StepTitle>
            <StepDescription>
              Select a convenient time slot and make a booking with your chosen astrologer.
            </StepDescription>
          </Step>

          <Step>
            <StepNumber>3</StepNumber>
            <StepTitle>Make Payment</StepTitle>
            <StepDescription>Complete your booking by making a secure payment through our platform.</StepDescription>
          </Step>

          <Step>
            <StepNumber>4</StepNumber>
            <StepTitle>Get Guidance</StepTitle>
            <StepDescription>
              Connect with your astrologer at the scheduled time and receive personalized guidance.
            </StepDescription>
          </Step>
        </StepsContainer>
      </HowItWorksSection>

      <TestimonialsSection>
        <SectionTitle>What Our Clients Say</SectionTitle>
        <TestimonialsContainer>
          <TestimonialCardStyled>
            <TestimonialQuote>
              The consultation with Pandit Sharma was eye-opening. His predictions were accurate, and his guidance
              helped me make important life decisions.
            </TestimonialQuote>
            <TestimonialAuthor>
              <AuthorImage />
              <AuthorInfo>
                <AuthorName>Rahul Mehta</AuthorName>
                <AuthorLocation>Mumbai, India</AuthorLocation>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCardStyled>

          <TestimonialCardStyled>
            <TestimonialQuote>
              I was skeptical at first, but Jyotish Guruji's reading was incredibly accurate. He provided insights that
              helped me navigate a difficult period in my life.
            </TestimonialQuote>
            <TestimonialAuthor>
              <AuthorImage />
              <AuthorInfo>
                <AuthorName>Priya Singh</AuthorName>
                <AuthorLocation>Delhi, India</AuthorLocation>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCardStyled>

          <TestimonialCardStyled>
            <TestimonialQuote>
              The Vastu consultation with Acharya Mishra transformed my home's energy. My family has experienced
              positive changes since implementing his suggestions.
            </TestimonialQuote>
            <TestimonialAuthor>
              <AuthorImage />
              <AuthorInfo>
                <AuthorName>Vikram Patel</AuthorName>
                <AuthorLocation>Bangalore, India</AuthorLocation>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCardStyled>
        </TestimonialsContainer>
      </TestimonialsSection>

      <CTASection>
        <CTATitle>Ready to Discover Your Future?</CTATitle>
        <CTADescription>
          Connect with our expert astrologers today and gain insights into your life's journey. Take the first step
          towards a more enlightened path.
        </CTADescription>
        <CTAButton to="/register">Get Started Now</CTAButton>
      </CTASection>
    </>
  )
}

export default HomePage

