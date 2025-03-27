"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import axios from "axios"
import styled from "styled-components"
import { FaUsers, FaUserAstronaut, FaCalendarCheck, FaRupeeSign } from "react-icons/fa"

const DashboardContainer = styled.div`
  padding: 1rem;
`

const WelcomeSection = styled.div`
  background: linear-gradient(135deg, #1A237E 0%, #3F51B5 100%);
  color: white;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/placeholder.svg?height=300&width=500');
    background-size: cover;
    opacity: 0.1;
    z-index: 0;
  }
`

const WelcomeContent = styled.div`
  position: relative;
  z-index: 1;
`

const WelcomeTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`

const WelcomeText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  max-width: 600px;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

const StatCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1rem;
`

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background-color: ${(props) => props.bgColor || "#F5F5F5"};
  color: ${(props) => props.color || "var(--primary-color)"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`

const StatContent = styled.div``

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: var(--light-text);
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`

const RecentBookings = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`

const BookingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const BookingCard = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #3F51B5;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }
`

const BookingImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-image: url('/placeholder.svg?height=60&width=60');
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`

const BookingInfo = styled.div`
  flex: 1;
`

const BookingTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`

const BookingDetails = styled.div`
  font-size: 0.9rem;
  color: var(--light-text);
  margin-bottom: 0.5rem;
`

const BookingStatus = styled.div`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${(props) => {
    switch (props.status) {
      case "PENDING":
        return "#FFF8E1"
      case "CONFIRMED":
        return "#E8F5E9"
      case "COMPLETED":
        return "#E3F2FD"
      case "CANCELLED":
        return "#FFEBEE"
      default:
        return "#F5F5F5"
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "PENDING":
        return "#F57C00"
      case "CONFIRMED":
        return "#388E3C"
      case "COMPLETED":
        return "#1976D2"
      case "CANCELLED":
        return "#D32F2F"
      default:
        return "var(--text-color)"
    }
  }};
`

const BookingActions = styled.div`
  display: flex;
  gap: 0.5rem;
`

const BookingButton = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: transparent;
  color: #3F51B5;
  border: 1px solid #3F51B5;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #E8EAF6;
  }
`

const ViewAllButton = styled(Link)`
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #3F51B5;
  color: white;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #303F9F;
  }
`

const TopAstrologers = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`

const AstrologersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const AstrologerCard = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #3F51B5;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }
`

const AstrologerImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url('/placeholder.svg?height=50&width=50');
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`

const AstrologerInfo = styled.div`
  flex: 1;
`

const AstrologerName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`

const AstrologerStats = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  color: var(--light-text);
`

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

const Dashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalAstrologers: 0,
    totalBookings: 0,
    totalRevenue: 0,
  })
  const [recentBookings, setRecentBookings] = useState([])
  const [topAstrologers, setTopAstrologers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)

        // Fetch users
        const usersResponse = await axios.get("http://localhost:9000/api/users/")
        const customers = usersResponse.data.filter((user) => user.role === "CUSTOMER")
        const astrologers = usersResponse.data.filter((user) => user.role === "ASTROLOGER")

        // Fetch bookings
        const bookingsResponse = await axios.get("http://localhost:9000/api/bookings/admin/")
        const bookings = bookingsResponse.data

        // Calculate total revenue
        const revenue = bookings
          .filter((booking) => booking.status === "COMPLETED")
          .reduce((sum, booking) => sum + Number.parseFloat(booking.amount), 0)

        // Set stats
        setStats({
          totalCustomers: customers.length,
          totalAstrologers: astrologers.length,
          totalBookings: bookings.length,
          totalRevenue: revenue,
        })

        // Get recent bookings
        const recent = [...bookings].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5)
        setRecentBookings(recent)

        // Fetch astrologers
        const astrologersResponse = await axios.get("http://localhost:9000/api/astrologers/")

        // Get top astrologers by rating
        const top = [...astrologersResponse.data].sort((a, b) => b.rating - a.rating).slice(0, 5)
        setTopAstrologers(top)

        setLoading(false)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return <div>Loading dashboard...</div>
  }

  return (
    <DashboardContainer>
      <WelcomeSection>
        <WelcomeContent>
          <WelcomeTitle>Welcome, Admin {user.first_name}!</WelcomeTitle>
          <WelcomeText>
            Manage your platform, monitor astrologers and customers, and track bookings and revenue. Get a quick
            overview of your platform's performance.
          </WelcomeText>
        </WelcomeContent>
      </WelcomeSection>

      <StatsGrid>
        <StatCard>
          <StatIcon bgColor="#E8EAF6" color="#3F51B5">
            <FaUsers />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.totalCustomers}</StatValue>
            <StatLabel>Total Customers</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon bgColor="#E1F5FE" color="#03A9F4">
            <FaUserAstronaut />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.totalAstrologers}</StatValue>
            <StatLabel>Total Astrologers</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon bgColor="#E8F5E9" color="#4CAF50">
            <FaCalendarCheck />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.totalBookings}</StatValue>
            <StatLabel>Total Bookings</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon bgColor="#FFF3E0" color="#FF9800">
            <FaRupeeSign />
          </StatIcon>
          <StatContent>
            {/* <StatValue>${stats.totalRevenue.toFixed(2)}</StatValue> */}
            {/* <StatValue>₹{typeof stats.totalRevenue === 'number' ? stats.totalRevenue.toFixed(2) : 'N/A'}</StatValue> */}
            <StatValue>${Number(stats.totalRevenue).toFixed(2)}</StatValue>
            <StatLabel>Total Revenue</StatLabel>
          </StatContent>
        </StatCard>
      </StatsGrid>

      <GridContainer>
        <RecentBookings>
          <SectionTitle>Recent Bookings</SectionTitle>
          <BookingsList>
            {recentBookings.map((booking) => (
              <BookingCard key={booking.id}>
                <BookingImage />
                <BookingInfo>
                  <BookingTitle>
                    {booking.customer_details.first_name} {booking.customer_details.last_name} →{" "}
                    {booking.astrologer_details.user.first_name} {booking.astrologer_details.user.last_name}
                  </BookingTitle>
                  <BookingDetails>
                    {new Date(booking.booking_date).toLocaleDateString()} • {booking.start_time} - {booking.end_time} •
                    ${booking.amount}
                  </BookingDetails>
                  <BookingStatus status={booking.status}>{booking.status}</BookingStatus>
                </BookingInfo>
                <BookingActions>
                  <BookingButton to={`/admin/bookings/${booking.id}`}>View</BookingButton>
                </BookingActions>
              </BookingCard>
            ))}
          </BookingsList>
          <ViewAllButton to="/admin/bookings">View All Bookings</ViewAllButton>
        </RecentBookings>

        <TopAstrologers>
          <SectionTitle>Top Astrologers</SectionTitle>
          <AstrologersList>
            {topAstrologers.map((astrologer) => (
              <AstrologerCard key={astrologer.id}>
                <AstrologerImage />
                <AstrologerInfo>
                  <AstrologerName>
                    {astrologer.user.first_name} {astrologer.user.last_name}
                  </AstrologerName>
                  <AstrologerStats>
                    <StatItem>
                      <FaUserAstronaut />
                      {astrologer.total_consultations} sessions
                    </StatItem>
                    <StatItem>
                      <FaRupeeSign />Rs(₹){astrologer.hourly_rate}/hr
                    </StatItem>
                  </AstrologerStats>
                </AstrologerInfo>
              </AstrologerCard>
            ))}
          </AstrologersList>
          <ViewAllButton to="/admin/astrologers">View All Astrologers</ViewAllButton>
        </TopAstrologers>
      </GridContainer>
    </DashboardContainer>
  )
}

export default Dashboard

