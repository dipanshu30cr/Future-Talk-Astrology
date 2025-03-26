"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import styled from "styled-components"
import { FaUser, FaSignOutAlt, FaHome, FaInfoCircle, FaEnvelope, FaUserAstronaut } from "react-icons/fa"
import { GiHamburgerMenu } from "react-icons/gi"
import { AiFillCloseCircle } from "react-icons/ai"

import { FaSun, FaMoon } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";





const NavbarContainer = styled.nav`
  background-color: #FFF8E1;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`

const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  span {
    color: var(--accent-color);
  }
`

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`

const NavLink = styled(Link)`
  color: var(--text-color);
  font-weight: 500;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: var(--primary-color);
  }
`

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`

const LoginButton = styled(Link)`
  padding: 0.5rem 1rem;
  border: 1px solid var(--primary-color);
  border-radius: 4px;
  color: var(--primary-color);
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
`

const RegisterButton = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  border-radius: 4px;
  color: white;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #E64A19;
  }
`

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: var(--text-color);
  font-weight: 500;
  cursor: pointer;
  
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }
`

const UserDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 200px;
  z-index: 10;
  overflow: hidden;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  color: var(--text-color);
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f5f5f5;
  }
`

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  color: var(--error-color);
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f5f5f5;
  }
`

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 70%;
  max-width: 300px;
  background-color: white;
  z-index: 1000;
  padding: 2rem;
  transform: ${(props) => (props.isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.5rem;
  cursor: pointer;
`

const MobileNavLink = styled(Link)`
  color: var(--text-color);
  font-weight: 500;
  padding: 0.75rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid var(--border-color);
`

const MobileAuthButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, user, logout } = useAuth()
  const imageUrl = user?.profile_picture
    ? user.profile_picture.startsWith("http")
      ? user.profile_picture
      : `http://localhost:9000${user.profile_picture}`
    : "/placeholder.svg"; 

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const getDashboardLink = () => {
    if (user?.role === "ADMIN") return "/admin"
    if (user?.role === "ASTROLOGER") return "/astrologer"
    return "/customer"
  }

  return (
    <NavbarContainer>
      <NavbarContent>
        <Logo to="/">
          <FaUserAstronaut />
          Future<span>Talk</span>
        </Logo>

        <NavLinks>
          <NavLink to="/">
            <FaHome /> Home
          </NavLink>
          <NavLink to="/astrologers">
            <FaUserAstronaut /> Astrologers
          </NavLink>
          <NavLink to="/about">
            <FaInfoCircle /> About
          </NavLink>
          <NavLink to="/contact">
            <FaEnvelope /> Contact
          </NavLink>
        </NavLinks>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>

        {isAuthenticated ? (
          <UserMenu>
            {/* <UserButton onClick={toggleUserMenu}>
              {user?.profile_picture ? (
                <img src={user.profile_picture || "/placeholder.svg"} alt={user.username} />
              ) : (
                <FaUser />
              )}

              {user?.username}
            </UserButton> */}


            <UserButton onClick={toggleUserMenu}>
              {imageUrl ? (
                <img src={imageUrl} alt={user?.username} />
              ) : (
                <FaUser />
              )}
              {user?.username}
            </UserButton>


            <UserDropdown isOpen={isUserMenuOpen}>
              <DropdownItem to={getDashboardLink()}>Dashboard</DropdownItem>
              <DropdownItem to={`${getDashboardLink()}/profile`}>Profile</DropdownItem>
              <LogoutButton onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </LogoutButton>
            </UserDropdown>
          </UserMenu>
        ) : (
          <AuthButtons>
            <LoginButton to="/login">Login</LoginButton>
            <RegisterButton to="/register">Register</RegisterButton>
          </AuthButtons>
        )}

        <MobileMenuButton onClick={toggleMobileMenu}>
          <GiHamburgerMenu />
        </MobileMenuButton>
      </NavbarContent>

      <Overlay isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />

      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileMenuHeader>
          <Logo to="/" onClick={toggleMobileMenu}>
            Future<span>Talk</span>
          </Logo>
          <CloseButton onClick={toggleMobileMenu}>
            <AiFillCloseCircle />
          </CloseButton>
        </MobileMenuHeader>

        <MobileNavLink to="/" onClick={toggleMobileMenu}>
          <FaHome /> Home
        </MobileNavLink>
        <MobileNavLink to="/astrologers" onClick={toggleMobileMenu}>
          <FaUserAstronaut /> Astrologers
        </MobileNavLink>
        <MobileNavLink to="/about" onClick={toggleMobileMenu}>
          <FaInfoCircle /> About
        </MobileNavLink>
        <MobileNavLink to="/contact" onClick={toggleMobileMenu}>
          <FaEnvelope /> Contact
        </MobileNavLink>

        {isAuthenticated ? (
          <>
            <MobileNavLink to={getDashboardLink()} onClick={toggleMobileMenu}>
              Dashboard
            </MobileNavLink>
            <MobileNavLink to={`${getDashboardLink()}/profile`} onClick={toggleMobileMenu}>
              Profile
            </MobileNavLink>
            <LogoutButton
              onClick={() => {
                handleLogout()
                toggleMobileMenu()
              }}
            >
              <FaSignOutAlt /> Logout
            </LogoutButton>
          </>
        ) : (
          <MobileAuthButtons>
            <LoginButton to="/login" onClick={toggleMobileMenu}>
              Login
            </LoginButton>
            <RegisterButton to="/register" onClick={toggleMobileMenu}>
              Register
            </RegisterButton>
          </MobileAuthButtons>
        )}
      </MobileMenu>
    </NavbarContainer>
  )
}

export default Navbar

