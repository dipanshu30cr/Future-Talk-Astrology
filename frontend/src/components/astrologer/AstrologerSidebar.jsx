"use client"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import styled from "styled-components"
import { FaHome, FaCalendarCheck, FaUser, FaClock, FaSignOutAlt, FaUserAstronaut } from "react-icons/fa"

const SidebarContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
`

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  padding: 0 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    color: #CE93D8;
  }
`

const NavMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
`

const NavItem = styled.li`
  margin-bottom: 0.5rem;
`

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: ${(props) => (props.active ? "white" : "rgba(255, 255, 255, 0.7)")};
  background-color: ${(props) => (props.active ? "rgba(255, 255, 255, 0.1)" : "transparent")};
  border-left: 3px solid ${(props) => (props.active ? "#CE93D8" : "transparent")};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }
`

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: rgba(255, 255, 255, 0.7);
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }
`

const UserInfo = styled.div`
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: auto;
`

const UserName = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`

const UserRole = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
`

const AstrologerSidebar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname.startsWith(path)
  }

  return (
    <SidebarContainer>
      <Logo to="/astrologer">
        <FaUserAstronaut />
        Future<span>Talk</span>
      </Logo>

      <NavMenu>
        <NavItem>
          <NavLink to="/astrologer" active={location.pathname === "/astrologer"}>
            <FaHome />
            Dashboard
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink to="/astrologer/bookings" active={isActive("/astrologer/bookings")}>
            <FaCalendarCheck />
            Bookings
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink to="/astrologer/availability" active={isActive("/astrologer/availability")}>
            <FaClock />
            Availability
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink to="/astrologer/profile" active={isActive("/astrologer/profile")}>
            <FaUser />
            Profile
          </NavLink>
        </NavItem>
      </NavMenu>

      <UserInfo>
        <UserName>
          {user.first_name} {user.last_name}
        </UserName>
        <UserRole>Astrologer</UserRole>
      </UserInfo>

      <LogoutButton onClick={logout}>
        <FaSignOutAlt />
        Logout
      </LogoutButton>
    </SidebarContainer>
  )
}

export default AstrologerSidebar

