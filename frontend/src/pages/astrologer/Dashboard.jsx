"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import axios from "axios"
import styled from "styled-components"
import { FaCalendarCheck, FaStar, FaRupeeSign } from "react-icons/fa"

const DashboardContainer = styled.div`
  padding: 1rem;
`

const WelcomeSection = styled.div`
  background: linear-gradient(135deg, #673AB7 0%, #9C27B0 100%);
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
  color: var(--accent-color);
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
    border-color: var(--accent-color);
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
  background-color: ${(props) => (props.primary ? "var(--accent-color)" : "transparent")};
  color: ${(props) => (props.primary ? "white" : "var(--accent-color)")};
  border: 1px solid ${(props) => (props.primary ? "var(--accent-color)" : "var(--border-color)")};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${(props) => (props.primary ? "#7B1FA2" : "#F3E5F5")};
  }
`

const NoBookings = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--light-text);
`

const RecentReviews = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`

const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ReviewCard = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
`

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`

const ReviewAuthor = styled.div`
  font-weight: 600;
`

const ReviewDate = styled.div`
  font-size: 0.8rem;
  color: var(--light-text);
`

const ReviewRating = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
  color: var(--secondary-color);
`

const ReviewContent = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
`

const NoReviews = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--light-text);
`

const Dashboard = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [bookings, setBookings] = useState([])
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedBookings: 0,
    upcomingBookings: 0,
    totalEarnings: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch astrologer profile
        const profileResponse = await axios.get("http://localhost:9000/api/astrologers/")
        const myProfile = profileResponse.data.find((profile) => profile.user.id === user.id)
        setProfile(myProfile)

        // Fetch bookings
        const bookingsResponse = await axios.get("http://localhost:9000/api/bookings/astrologer/")
        setBookings(bookingsResponse.data)

        // Calculate stats
        const totalBookings = bookingsResponse.data.length
        const completedBookings = bookingsResponse.data.filter((booking) => booking.status === "COMPLETED").length
        const upcomingBookings = bookingsResponse.data.filter((booking) => booking.status === "CONFIRMED").length
        const totalEarnings = bookingsResponse.data
          .filter((booking) => booking.status === "COMPLETED")
          .reduce((sum, booking) => sum + Number.parseFloat(booking.amount), 0)

        setStats({
          totalBookings,
          completedBookings,
          upcomingBookings,
          totalEarnings,
        })

        setLoading(false)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [user.id])

  // Get upcoming bookings (confirmed and pending, sorted by date)
  const upcomingBookings = bookings
    .filter((booking) => ["CONFIRMED", "PENDING"].includes(booking.status))
    .sort((a, b) => new Date(a.booking_date) - new Date(b.booking_date))
    .slice(0, 3)

  // Get recent reviews
  const recentReviews = profile?.reviews.slice(0, 3) || []

  if (loading) {
    return <div>Loading dashboard...</div>
  }

  return (
    <DashboardContainer>
      <WelcomeSection>
        <WelcomeContent>
          <WelcomeTitle>Welcome, {user.first_name}!</WelcomeTitle>
          <WelcomeText>
            Manage your bookings, update your availability, and connect with clients. Check your upcoming sessions and
            recent reviews.
          </WelcomeText>
          <WelcomeButton to="/astrologer/availability">Update Availability</WelcomeButton>
        </WelcomeContent>
      </WelcomeSection>

      <StatsGrid>
        <StatCard>
          <StatIcon bgColor="#F3E5F5" color="#9C27B0">
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
            <FaRupeeSign />
          </StatIcon>
          <StatContent>
            {/* <StatValue>${stats.totalEarnings.toFixed(2)}</StatValue> */}
            <StatValue>${typeof stats.totalEarnings === 'number' ? stats.totalEarnings.toFixed(2) : 'N/A'}</StatValue>

            <StatLabel>Total Earnings</StatLabel>
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
                      {booking.customer_details.first_name} {booking.customer_details.last_name}
                    </BookingTitle>
                    <BookingDetails>
                      {new Date(booking.booking_date).toLocaleDateString()} • {booking.start_time} - {booking.end_time}
                    </BookingDetails>
                    <BookingStatus status={booking.status}>{booking.status}</BookingStatus>
                  </BookingInfo>
                  <BookingActions>
                    <BookingButton to={`/astrologer/bookings/${booking.id}`}>View</BookingButton>
                    {booking.status === "CONFIRMED" && (
                      <BookingButton to={`/astrologer/chat/${booking.id}`} primary>
                        Chat
                      </BookingButton>
                    )}
                  </BookingActions>
                </BookingCard>
              ))}

              <BookingButton to="/astrologer/bookings" primary>
                View All Bookings
              </BookingButton>
            </BookingsList>
          ) : (
            <NoBookings>
              <p>You don't have any upcoming bookings.</p>
            </NoBookings>
          )}
        </UpcomingBookings>

        <RecentReviews>
          <SectionTitle>Recent Reviews</SectionTitle>
          {recentReviews.length > 0 ? (
            <ReviewsList>
              {recentReviews.map((review) => (
                <ReviewCard key={review.id}>
                  <ReviewHeader>
                    <ReviewAuthor>{review.customer_name}</ReviewAuthor>
                    <ReviewDate>{new Date(review.created_at).toLocaleDateString()}</ReviewDate>
                  </ReviewHeader>
                  <ReviewRating>
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </ReviewRating>
                  <ReviewContent>{review.comment}</ReviewContent>
                </ReviewCard>
              ))}
            </ReviewsList>
          ) : (
            <NoReviews>
              <p>You don't have any reviews yet.</p>
            </NoReviews>
          )}
        </RecentReviews>
      </GridContainer>
    </DashboardContainer>
  )
}

export default Dashboard

