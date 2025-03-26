import { Link } from "react-router-dom"
import styled from "styled-components"
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaUserAstronaut } from "react-icons/fa"

const FooterContainer = styled.footer`
  background-color: #311B92;
  color: white;
  padding: 3rem 0 1rem;
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const FooterLogo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  span {
    color: var(--secondary-color);
  }
`

const FooterDescription = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
`

const FooterHeading = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: var(--secondary-color);
  }
`

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const FooterLink = styled.li`
  margin-bottom: 0.75rem;
  
  a {
    color: rgba(255, 255, 255, 0.8);
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--secondary-color);
    }
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`

const SocialLink = styled.a`
  color: white;
  font-size: 1.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--secondary-color);
  }
`

const FooterBottom = styled.div`
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
`

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterColumn>
            <FooterLogo to="/">
              <FaUserAstronaut />
              Future<span>Talk</span>
            </FooterLogo>
            <FooterDescription>
              Connect with the best astrologers for personalized guidance on your life's journey. Discover insights from
              ancient Hindu astrological traditions.
            </FooterDescription>
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
                <FaYoutube />
              </SocialLink>
            </SocialLinks>
          </FooterColumn>

          <FooterColumn>
            <FooterHeading>Quick Links</FooterHeading>
            <FooterLinks>
              <FooterLink>
                <Link to="/">Home</Link>
              </FooterLink>
              <FooterLink>
                <Link to="/astrologers">Astrologers</Link>
              </FooterLink>
              <FooterLink>
                <Link to="/about">About Us</Link>
              </FooterLink>
              <FooterLink>
                <Link to="/contact">Contact Us</Link>
              </FooterLink>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <FooterHeading>Services</FooterHeading>
            <FooterLinks>
              <FooterLink>
                <Link to="/astrologers">Vedic Astrology</Link>
              </FooterLink>
              <FooterLink>
                <Link to="/astrologers">Nadi Astrology</Link>
              </FooterLink>
              <FooterLink>
                <Link to="/astrologers">Numerology</Link>
              </FooterLink>
              <FooterLink>
                <Link to="/astrologers">Tarot Reading</Link>
              </FooterLink>
              <FooterLink>
                <Link to="/astrologers">Palmistry</Link>
              </FooterLink>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <FooterHeading>Contact Us</FooterHeading>
            <FooterDescription>
            Kailash Nagar, Near Kailash Mandir
              <br />
              Ranchi, India 834001
              <br />
              <br />
              Email: mdrax28@gmail.com
              <br />
              Phone: +91 8102320370
            </FooterDescription>
          </FooterColumn>
        </FooterGrid>

        <FooterBottom>
          <p>&copy; {new Date().getFullYear()} FutureTalk. All rights reserved.</p>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer

