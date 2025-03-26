"use client"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import styled from "styled-components"
import { FaHome, FaUserAstronaut, FaUsers, FaCalendarCheck, FaRupeeSign, FaTags, FaSignOutAlt } from "react-icons/fa"

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
    color: #90CAF9;
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
  border-left: 3px solid ${(props) => (props.active ? "#90CAF9" : "transparent")};
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

const AdminSidebar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname.startsWith(path)
  }

  return (
    <SidebarContainer>
      <Logo to="/admin">
        <FaUserAstronaut />
        Future<span>Talk</span>
      </Logo>

      <NavMenu>
        <NavItem>
          <NavLink to="/admin" active={location.pathname === "/admin"}>
            <FaHome />
            Dashboard
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink to="/admin/astrologers" active={isActive("/admin/astrologers")}>
            <FaUserAstronaut />
            Astrologers
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink to="/admin/customers" active={isActive("/admin/customers")}>
            <FaUsers />
            Customers
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink to="/admin/bookings" active={isActive("/admin/bookings")}>
            <FaCalendarCheck />
            Bookings
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink to="/admin/payments" active={isActive("/admin/payments")}>
            <FaRupeeSign />
            Payments
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink to="/admin/specializations" active={isActive("/admin/specializations")}>
            <FaTags />
            Specializations
          </NavLink>
        </NavItem>
      </NavMenu>

      <UserInfo>
        <UserName>
          {user.first_name} {user.last_name}
        </UserName>
        <UserRole>Administrator</UserRole>
      </UserInfo>

      <LogoutButton onClick={logout}>
        <FaSignOutAlt />
        Logout
      </LogoutButton>
    </SidebarContainer>
  )
}

export default AdminSidebar

