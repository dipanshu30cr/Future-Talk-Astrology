"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"
import { FaCalendarAlt, FaClock, FaRupeeSign, FaSearch } from "react-icons/fa"

const BookingsContainer = styled.div`
  padding: 1rem;
`

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`

const PageTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
`

const BookNowButton = styled(Link)`
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #E64A19;
  }
`

const FiltersContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`

const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`

const FilterGroup = styled.div`
  flex: 1;
  min-width: 200px;
`

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`

const FilterSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`

const SearchContainer = styled.div`
  position: relative;
  flex: 2;
  min-width: 300px;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`

const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-50%);
  color: var(--light-text);
`

const BookingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const BookingCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const BookingImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-image: url('/placeholder.svg?height=80&width=80');
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`

const BookingInfo = styled.div`
  flex: 1;
`

const BookingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`

const BookingTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
`

const BookingStatus = styled.div`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
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

const BookingDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1rem;
`

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--light-text);
  
  svg {
    color: var(--primary-color);
  }
`

const BookingType = styled.div`
  font-size: 0.9rem;
  margin-bottom: 1rem;
`

const BookingActions = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`

const ActionButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: ${(props) => (props.primary ? "var(--primary-color)" : "transparent")};
  color: ${(props) => (props.primary ? "white" : "var(--primary-color)")};
  border: 1px solid ${(props) => (props.primary ? "var(--primary-color)" : "var(--border-color)")};
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover {
    background-color: ${(props) => (props.primary ? "#E64A19" : "#FFF8E1")};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: transparent;
  color: var(--error-color);
  border: 1px solid var(--error-color);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background-color: #FFEBEE;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => (props.active ? "var(--primary-color)" : "var(--border-color)")};
  background-color: ${(props) => (props.active ? "var(--primary-color)" : "white")};
  color: ${(props) => (props.active ? "white" : "var(--text-color)")};
  border-radius: 4px;
  margin: 0 0.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--primary-color);
    color: ${(props) => (props.active ? "white" : "var(--primary-color)")};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const NoBookings = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`

const Bookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [sortBy, setSortBy] = useState("date_desc")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true)
        const response = await axios.get("http://localhost:9000/api/bookings/customer/")
        console.log('response: ', response)
        setBookings(response.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch bookings")
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.put(`http://localhost:9000/api/bookings/customer/${bookingId}/`, {
        status: "CANCELLED",
      })

      // Update the booking status in the state
      setBookings(bookings.map((booking) => (booking.id === bookingId ? { ...booking, status: "CANCELLED" } : booking)))
    } catch (err) {
      console.error("Failed to cancel booking:", err)
    }
  }

  // Filter and sort bookings
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.astrologer_details.user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.astrologer_details.user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.consultation_type.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "" || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Sort bookings
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (sortBy === "date_desc") {
      return new Date(b.booking_date) - new Date(a.booking_date)
    } else if (sortBy === "date_asc") {
      return new Date(a.booking_date) - new Date(b.booking_date)
    } else if (sortBy === "price_high") {
      return Number.parseFloat(b.amount) - Number.parseFloat(a.amount)
    } else if (sortBy === "price_low") {
      return Number.parseFloat(a.amount) - Number.parseFloat(b.amount)
    }
    return 0
  })

  // Pagination
  const bookingsPerPage = 5
  const indexOfLastBooking = currentPage * bookingsPerPage
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage
  const currentBookings = sortedBookings.slice(indexOfFirstBooking, indexOfLastBooking)
  const totalPages = Math.ceil(sortedBookings.length / bookingsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (loading) {
    return <div>Loading bookings...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  // Get consultation type display name
  const getConsultationTypeName = (type) => {
    switch (type) {
      case "VEDIC":
        return "Vedic Astrology"
      case "NADI":
        return "Nadi Astrology"
      case "NUMEROLOGY":
        return "Numerology"
      case "TAROT":
        return "Tarot Reading"
      case "PALMISTRY":
        return "Palmistry"
      default:
        return type
    }
  }

  return (
    <BookingsContainer>
      <PageHeader>
        <PageTitle>My Bookings</PageTitle>
        <BookNowButton to="/astrologers">Book a Consultation</BookNowButton>
      </PageHeader>

      <FiltersContainer>
        <FilterRow>
          <SearchContainer>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          <FilterGroup>
            <FilterLabel>Status</FilterLabel>
            <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Sort By</FilterLabel>
            <FilterSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date_desc">Date: Newest First</option>
              <option value="date_asc">Date: Oldest First</option>
              <option value="price_high">Price: High to Low</option>
              <option value="price_low">Price: Low to High</option>
            </FilterSelect>
          </FilterGroup>
        </FilterRow>
      </FiltersContainer>

      {currentBookings.length > 0 ? (
        <>
          <BookingsList>
            {currentBookings.map((booking) => (
              <BookingCard key={booking.id}>
                <BookingImage />
                <BookingInfo>
                  <BookingHeader>
                    <BookingTitle>
                      {booking.astrologer_details.user.first_name} {booking.astrologer_details.user.last_name}
                    </BookingTitle>
                    <BookingStatus status={booking.status}>{booking.status}</BookingStatus>
                  </BookingHeader>
                  <BookingDetails>
                    <DetailItem>
                      <FaCalendarAlt />
                      {new Date(booking.booking_date).toLocaleDateString()}
                    </DetailItem>
                    <DetailItem>
                      <FaClock />
                      {booking.start_time} - {booking.end_time}
                    </DetailItem>
                    <DetailItem>
                      <FaRupeeSign />${booking.amount}
                    </DetailItem>
                  </BookingDetails>
                  <BookingType>
                    <strong>Consultation Type:</strong> {getConsultationTypeName(booking.consultation_type)}
                  </BookingType>
                  <BookingActions>
                    <ActionButton to={`/customer/bookings/${booking.id}`}>View Details</ActionButton>

                    {booking.status === "CONFIRMED" && (
                      <ActionButton to={`/customer/chat/${booking.id}`} primary>
                        Chat with Astrologer
                      </ActionButton>
                    )}

                    {(booking.status === "PENDING" || booking.status === "CONFIRMED") && (
                      <CancelButton onClick={() => handleCancelBooking(booking.id)}>Cancel Booking</CancelButton>
                    )}
                  </BookingActions>
                </BookingInfo>
              </BookingCard>
            ))}
          </BookingsList>

          <Pagination>
            <PageButton onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              &lt;
            </PageButton>

            {[...Array(totalPages).keys()].map((number) => (
              <PageButton key={number + 1} active={currentPage === number + 1} onClick={() => paginate(number + 1)}>
                {number + 1}
              </PageButton>
            ))}

            <PageButton onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
              &gt;
            </PageButton>
          </Pagination>
        </>
      ) : (
        <NoBookings>
          <h3>No bookings found</h3>
          <p>You haven't made any bookings yet.</p>
          <ActionButton to="/astrologers" primary style={{ marginTop: "1rem", display: "inline-block" }}>
            Book a Consultation
          </ActionButton>
        </NoBookings>
      )}
    </BookingsContainer>
  )
}

export default Bookings

