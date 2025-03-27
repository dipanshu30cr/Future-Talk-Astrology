"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import axios from "axios"
import styled from "styled-components"
import { FaCalendarCheck, FaStar } from "react-icons/fa"

const DashboardContainer = styled.div`
  padding: 1rem;
`

const WelcomeSection = styled.div`
  background: linear-gradient(135deg, #FF9800 0%, #FF5722 100%);
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

const WelcomeButton = styled(Link)`
  display: inline-block;
  background-color: white;
  color: var(--primary-color);
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
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

const UpcomingBookings = styled.div`
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
    border-color: var(--primary-color);
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
  background-color: ${(props) => (props.primary ? "var(--primary-color)" : "transparent")};
  color: ${(props) => (props.primary ? "white" : "var(--primary-color)")};
  border: 1px solid ${(props) => (props.primary ? "var(--primary-color)" : "var(--border-color)")};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${(props) => (props.primary ? "#E64A19" : "#FFF8E1")};
  }
`

const NoBookings = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--light-text);
`

const RecommendedAstrologers = styled.div`
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
    border-color: var(--primary-color);
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

const AstrologerSpecialty = styled.div`
  font-size: 0.8rem;
  color: var(--light-text);
  margin-bottom: 0.25rem;
`

const AstrologerRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: var(--secondary-color);
`

const ViewProfileButton = styled(Link)`
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
`

const Dashboard = () => {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [astrologers, setAstrologers] = useState([])
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedBookings: 0,
    upcomingBookings: 0,
    totalSpent: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch bookings
        const bookingsResponse = await axios.get("http://localhost:9000/api/bookings/customer/")
        setBookings(bookingsResponse.data)

        // Calculate stats
        const totalBookings = bookingsResponse.data.length
        const completedBookings = bookingsResponse.data.filter((booking) => booking.status === "COMPLETED").length
        const upcomingBookings = bookingsResponse.data.filter((booking) => booking.status === "CONFIRMED").length
        const totalSpent = bookingsResponse.data
          .filter((booking) => booking.status === "COMPLETED")
          .reduce((sum, booking) => sum + Number.parseFloat(booking.amount), 0)

        setStats({
          totalBookings,
          completedBookings,
          upcomingBookings,
          totalSpent,
        })

        // Fetch recommended astrologers
        const astrologersResponse = await axios.get("http://localhost:9000/api/astrologers/")
        // Just take the top 3 by rating for recommendations
        const recommendedAstrologers = [...astrologersResponse.data].sort((a, b) => b.rating - a.rating).slice(0, 3)
        setAstrologers(recommendedAstrologers)

        setLoading(false)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Get upcoming bookings (confirmed and pending, sorted by date)
  const upcomingBookings = bookings
    .filter((booking) => ["CONFIRMED", "PENDING"].includes(booking.status))
    .sort((a, b) => new Date(a.booking_date) - new Date(b.booking_date))
    .slice(0, 3)

  if (loading) {
    return <div>Loading dashboard...</div>
  }

  return (
    <DashboardContainer>
      <WelcomeSection>
        <WelcomeContent>
          <WelcomeTitle>Welcome, {user.first_name}!</WelcomeTitle>
          <WelcomeText>
            Explore your cosmic journey with our expert astrologers. Book consultations, track your appointments, and
            discover insights about your future.
          </WelcomeText>
          <WelcomeButton to="/astrologers">Find an Astrologer</WelcomeButton>
        </WelcomeContent>
      </WelcomeSection>

      <StatsGrid>
        <StatCard>
          <StatIcon bgColor="#FFF8E1" color="#FF9800">
            <FaCalendarCheck />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.totalBookings}</StatValue>
            <StatLabel>Total Bookings</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon bgColor="#E8F5E9" color="#4CAF50">
            <FaCalendarCheck />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.completedBookings}</StatValue>
            <StatLabel>Completed Sessions</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon bgColor="#E3F2FD" color="#2196F3">
            <FaCalendarCheck />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.upcomingBookings}</StatValue>
            <StatLabel>Upcoming Sessions</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon bgColor="#FBE9E7" color="#FF5722">
            <FaCalendarCheck />
          </StatIcon>
          <StatContent>
            {/* <StatValue>${stats.totalSpent.toFixed(2)}</StatValue> */}
            {/* <StatValue>${typeof stats.totalSpent === 'number' ? stats.totalSpent.toFixed(2) : 'N/A'}</StatValue> */}
            <StatValue>${Number(stats.totalSpent).toFixed(2)}</StatValue>
            <StatLabel>Total Spent</StatLabel>
          </StatContent>
        </StatCard>
      </StatsGrid>

      <GridContainer>
        <UpcomingBookings>
          <SectionTitle>Upcoming Bookings</SectionTitle>
          {upcomingBookings.length > 0 ? (
            <BookingsList>
              {upcomingBookings.map((booking) => (
                <BookingCard key={booking.id}>
                  <BookingImage />
                  <BookingInfo>
                    <BookingTitle>
                      {booking.astrologer_details.user.first_name} {booking.astrologer_details.user.last_name}
                    </BookingTitle>
                    <BookingDetails>
                      {new Date(booking.booking_date).toLocaleDateString()} • {booking.start_time} - {booking.end_time}
                    </BookingDetails>
                    <BookingStatus status={booking.status}>{booking.status}</BookingStatus>
                  </BookingInfo>
                  <BookingActions>
                    <BookingButton to={`/customer/bookings/${booking.id}`}>View</BookingButton>
                    {booking.status === "CONFIRMED" && (
                      <BookingButton to={`/customer/chat/${booking.id}`} primary>
                        Chat
                      </BookingButton>
                    )}
                  </BookingActions>
                </BookingCard>
              ))}

              <BookingButton to="/customer/bookings" primary>
                View All Bookings
              </BookingButton>
            </BookingsList>
          ) : (
            <NoBookings>
              <p>You don't have any upcoming bookings.</p>
              <BookingButton to="/astrologers" primary style={{ marginTop: "1rem" }}>
                Book a Consultation
              </BookingButton>
            </NoBookings>
          )}
        </UpcomingBookings>

        <RecommendedAstrologers>
          <SectionTitle>Recommended Astrologers</SectionTitle>
          <AstrologersList>
            {astrologers.map((astrologer) => (
              <AstrologerCard key={astrologer.id}>
                <AstrologerImage />
                <AstrologerInfo>
                  <AstrologerName>
                    {astrologer.user.first_name} {astrologer.user.last_name}
                  </AstrologerName>
                  <AstrologerSpecialty>
                    {astrologer.specializations.map((spec) => spec.name).join(", ")}
                  </AstrologerSpecialty>
                  <AstrologerRating>
                    <FaStar />
                    {/* <span>{astrologer.rating.toFixed(1)}</span> */}
                    {/* <span>{typeof astrologer.rating === 'number' ? astrologer.rating.toFixed(1) : 'N/A'}</span> */}
                    <span>{Number(astrologer.rating).toFixed(1)}</span>
                    <span>({astrologer.reviews.length} reviews)</span>
                  </AstrologerRating>
                </AstrologerInfo>
                <ViewProfileButton to={`/astrologers/${astrologer.id}`}>View</ViewProfileButton>
              </AstrologerCard>
            ))}

            <BookingButton to="/astrologers" primary>
              View All Astrologers
            </BookingButton>
          </AstrologersList>
        </RecommendedAstrologers>
      </GridContainer>
    </DashboardContainer>
  )
}

export default Dashboard

