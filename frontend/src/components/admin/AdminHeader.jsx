"use client"
import { useAuth } from "../../contexts/AuthContext"
import styled from "styled-components"
import { FaBell, FaEnvelope, FaSearch } from "react-icons/fa"

const HeaderContainer = styled.header`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
`

const SearchBar = styled.div`
  position: relative;
  width: 300px;
  
  @media (max-width: 768px) {
    display: none;
  }
`

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  
  &:focus {
    outline: none;
    border-color: #3F51B5;
  }
`

const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-50%);
  color: var(--light-text);
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`

const IconButton = styled.button`
  position: relative;
  background: none;
  border: none;
  color: var(--light-text);
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: #3F51B5;
  }
`

const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 16px;
  height: 16px;
  background-color: #F44336;
  color: white;
  border-radius: 50%;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-image: url('/placeholder.svg?height=36&width=36');
  background-size: cover;
  background-position: center;
`

const UserInfo = styled.div``

const UserName = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
`

const UserRole = styled.div`
  font-size: 0.8rem;
  color: var(--light-text);
`

const AdminHeader = () => {
  const { user } = useAuth()

  return (
    <HeaderContainer>
      <SearchBar>
        <SearchIcon>
          <FaSearch />
        </SearchIcon>
        <SearchInput placeholder="Search..." />
      </SearchBar>

      <HeaderActions>
        <IconButton>
          <FaBell />
          <NotificationBadge>3</NotificationBadge>
        </IconButton>

        <IconButton>
          <FaEnvelope />
          <NotificationBadge>5</NotificationBadge>
        </IconButton>

        <UserProfile>
          <UserAvatar />
          <UserInfo>
            <UserName>
              {user.first_name} {user.last_name}
            </UserName>
            <UserRole>Administrator</UserRole>
          </UserInfo>
        </UserProfile>
      </HeaderActions>
    </HeaderContainer>
  )
}

export default AdminHeader

