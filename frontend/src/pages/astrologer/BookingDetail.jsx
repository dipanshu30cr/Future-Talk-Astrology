"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import styled from "styled-components"
import {
  FaCalendarAlt,
  FaClock,
  FaRupeeSign,
  FaUser,
  FaArrowLeft,
  FaComments,
  FaCheckCircle,
  FaTimesCircle,
  FaMapMarkerAlt,
  FaVideo,
} from "react-icons/fa"

const PageContainer = styled.div`
  padding: 1rem;
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color);
  margin-bottom: 1.5rem;
  font-weight: 500;

  &:hover {
    color: var(--accent-color);
  }
`

const BookingDetailCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`

const BookingHeader = styled.div`
  background: linear-gradient(135deg, #673AB7 0%, #9C27B0 100%);
  color: white;
  padding: 2rem;
  position: relative;
`

const BookingStatus = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: ${(props) => {
    switch (props.status) {
      case "PENDING":
        return "rgba(255, 255, 255, 0.2)"
      case "CONFIRMED":
        return "rgba(76, 175, 80, 0.2)"
      case "COMPLETED":
        return "rgba(33, 150, 243, 0.2)"
      case "CANCELLED":
        return "rgba(244, 67, 54, 0.2)"
      default:
        return "rgba(255, 255, 255, 0.2)"
    }
  }};
  color: white;
`

const BookingTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`

const BookingSubtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
`

const BookingContent = styled.div`
  padding: 2rem;
`

const BookingSection = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const SectionTitle = styled.h2`
  font-size: 1.3rem;
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
    background-color: var(--accent-color);
  }
`

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const DetailIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: #F3E5F5;
  color: var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`

const DetailContent = styled.div``

const DetailLabel = styled.div`
  font-size: 0.9rem;
  color: var(--light-text);
  margin-bottom: 0.25rem;
`

const DetailValue = styled.div`
  font-weight: 500;
`

const CustomerSection = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`

const CustomerImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url('/placeholder.svg?height=100&width=100');
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`

const CustomerInfo = styled.div`
  flex: 1;
`

const CustomerName = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const CustomerDetail = styled.p`
  color: var(--light-text);
  margin-bottom: 0.5rem;

  strong {
    color: var(--text-color);
  }
`

const PaymentSection = styled.div`
  background-color: #F5F5F5;
  border-radius: 8px;
  padding: 1.5rem;
`

const PaymentRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
    font-weight: 600;
  }
`

const PaymentLabel = styled.div``

const PaymentValue = styled.div``

const BookingActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`

const ActionButton = styled(Link)`
  flex: 1;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-align: center;
  font-weight: 500;
  background-color: ${(props) => (props.primary ? "var(--accent-color)" : "transparent")};
  color: ${(props) => (props.primary ? "white" : "var(--accent-color)")};
  border: 1px solid ${(props) => (props.primary ? "var(--accent-color)" : "var(--border-color)")};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.primary ? "#7B1FA2" : "#F3E5F5")};
  }
`

const StatusButton = styled.button`
  flex: 1;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-align: center;
  font-weight: 500;
  background-color: ${(props) => (props.primary ? "var(--success-color)" : "transparent")};
  color: ${(props) => (props.primary ? "white" : "var(--success-color)")};
  border: 1px solid ${(props) => (props.primary ? "var(--success-color)" : "var(--border-color)")};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.primary ? "#2E7D32" : "#E8F5E9")};
  }
`

// New components for payment status
const PaymentStatusSection = styled.div`
  background-color: ${(props) => (props.isPaid ? "#E8F5E9" : "#FFF8E1")};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`

const PaymentStatusIcon = styled.div`
  font-size: 2rem;
  color: ${(props) => (props.isPaid ? "var(--success-color)" : "var(--warning-color)")};
`

const PaymentStatusContent = styled.div`
  flex: 1;
`

const PaymentStatusTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${(props) => (props.isPaid ? "var(--success-color)" : "var(--warning-color)")};
`

const PaymentStatusText = styled.p`
  margin: 0;
`

const BookingDetail = () => {
  const { id } = useParams()

  const [booking, setBooking] = useState(null)
  const [payment, setPayment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:9000/api/bookings/astrologer/${id}/`)
        setBooking(response.data)

        // Try to fetch payment info
        try {
          // In a real app, this would be a proper endpoint
          const paymentResponse = await axios.get(`http://localhost:9000/api/bookings/admin/payments/`)
          const bookingPayment = paymentResponse.data.find((p) => p.booking === Number.parseInt(id))
          if (bookingPayment) {
            setPayment(bookingPayment)
          }
        } catch (payErr) {
          console.error("Error fetching payment:", payErr)
        }

        setLoading(false)
      } catch (err) {
        setError("Failed to fetch booking details")
        setLoading(false)
      }
    }

    fetchBooking()
  }, [id])

  const handleUpdateStatus = async (newStatus) => {
    try {
      await axios.put(`http://localhost:9000/api/bookings/astrologer/${id}/`, {
        status: newStatus,
      })

      // Update the booking status in the state
      setBooking({ ...booking, status: newStatus })
      toast.success(`Booking ${newStatus.toLowerCase()} successfully`)
    } catch (err) {
      console.error("Failed to update booking status:", err)
      toast.error("Failed to update booking status")
    }
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

  if (loading) {
    return <div>Loading booking details...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!booking) {
    return <div>Booking not found</div>
  }

  const isPaid = payment && payment.status === "COMPLETED"
  const canStartChat = booking.status === "CONFIRMED" && isPaid

  return (
    <PageContainer>
      <BackLink to="/astrologer/bookings">
        <FaArrowLeft /> Back to Bookings
      </BackLink>

      <BookingDetailCard>
        <BookingHeader>
          <BookingStatus status={booking.status}>{booking.status}</BookingStatus>
          <BookingTitle>Booking #{booking.id}</BookingTitle>
          <BookingSubtitle>{getConsultationTypeName(booking.consultation_type)} Session</BookingSubtitle>
        </BookingHeader>

        <BookingContent>
          {/* Payment Status Section */}
          {booking.status === "CONFIRMED" && (
            <PaymentStatusSection isPaid={isPaid}>
              <PaymentStatusIcon isPaid={isPaid}>{isPaid ? <FaCheckCircle /> : <FaTimesCircle />}</PaymentStatusIcon>
              <PaymentStatusContent>
                <PaymentStatusTitle isPaid={isPaid}>
                  {isPaid ? "Payment Completed" : "Payment Pending"}
                </PaymentStatusTitle>
                <PaymentStatusText>
                  {isPaid
                    ? "The customer has completed the payment. You can now start the consultation."
                    : "Waiting for the customer to complete the payment. Chat will be available once payment is made."}
                </PaymentStatusText>
              </PaymentStatusContent>
            </PaymentStatusSection>
          )}

          {booking.meeting_type === "PHYSICAL" && (
            <PaymentStatusSection style={{ backgroundColor: "#E8F5E9" }}>
              <PaymentStatusIcon>
                <FaMapMarkerAlt />
              </PaymentStatusIcon>
              <PaymentStatusContent>
                <PaymentStatusTitle>Physical Meeting</PaymentStatusTitle>
                <PaymentStatusText>
                  This is a physical meeting. The customer will visit you at Kailash Nagar Irgu Road, Near Kailash
                  Mandir. Payment will be collected directly from the customer at the start of the session.
                </PaymentStatusText>
              </PaymentStatusContent>
            </PaymentStatusSection>
          )}

          <BookingSection>
            <SectionTitle>Booking Details</SectionTitle>
            <DetailsGrid>
              <DetailItem>
                <DetailIcon>
                  <FaCalendarAlt />
                </DetailIcon>
                <DetailContent>
                  <DetailLabel>Date</DetailLabel>
                  <DetailValue>{new Date(booking.booking_date).toLocaleDateString()}</DetailValue>
                </DetailContent>
              </DetailItem>

              <DetailItem>
                <DetailIcon>
                  <FaClock />
                </DetailIcon>
                <DetailContent>
                  <DetailLabel>Time</DetailLabel>
                  <DetailValue>
                    {booking.start_time} - {booking.end_time}
                  </DetailValue>
                </DetailContent>
              </DetailItem>

              <DetailItem>
                <DetailIcon>
                  <FaUser />
                </DetailIcon>
                <DetailContent>
                  <DetailLabel>Consultation Type</DetailLabel>
                  <DetailValue>{getConsultationTypeName(booking.consultation_type)}</DetailValue>
                </DetailContent>
              </DetailItem>

              <DetailItem>
                <DetailIcon>{booking.meeting_type === "PHYSICAL" ? <FaMapMarkerAlt /> : <FaVideo />}</DetailIcon>
                <DetailContent>
                  <DetailLabel>Meeting Type</DetailLabel>
                  <DetailValue>
                    {booking.meeting_type === "PHYSICAL" ? "Physical Meeting" : "Online Meeting"}
                    {booking.meeting_type === "PHYSICAL" && (
                      <div style={{ fontSize: "0.8rem", color: "var(--light-text)", marginTop: "0.25rem" }}>
                        Location: Kailash Nagar Irgu Road, Near Kailash Mandir
                      </div>
                    )}
                  </DetailValue>
                </DetailContent>
              </DetailItem>

              <DetailItem>
                <DetailIcon>
                  <FaRupeeSign />
                </DetailIcon>
                <DetailContent>
                  <DetailLabel>Amount</DetailLabel>
                  <DetailValue>${Number(booking.amount).toFixed()}</DetailValue>
                </DetailContent>
              </DetailItem>
            </DetailsGrid>
          </BookingSection>

          <BookingSection>
            <SectionTitle>Customer Information</SectionTitle>
            <CustomerSection>
              <CustomerImage />
              <CustomerInfo>
                <CustomerName>
                  {booking.customer_details.first_name} {booking.customer_details.last_name}
                </CustomerName>
                <CustomerDetail>
                  <strong>Email:</strong> {booking.customer_details.email}
                </CustomerDetail>
                {booking.customer_details.phone_number && (
                  <CustomerDetail>
                    <strong>Phone:</strong> {booking.customer_details.phone_number}
                  </CustomerDetail>
                )}
                {booking.customer_details.birth_date && (
                  <CustomerDetail>
                    <strong>Birth Date:</strong> {new Date(booking.customer_details.birth_date).toLocaleDateString()}
                  </CustomerDetail>
                )}
                {booking.customer_details.birth_place && (
                  <CustomerDetail>
                    <strong>Birth Place:</strong> {booking.customer_details.birth_place}
                  </CustomerDetail>
                )}
              </CustomerInfo>
            </CustomerSection>
          </BookingSection>

          <BookingSection>
            <SectionTitle>Payment Details</SectionTitle>
            <PaymentSection>
              <PaymentRow>
                <PaymentLabel>Consultation Fee</PaymentLabel>
                <PaymentValue>${Number(booking.amount).toFixed()}</PaymentValue>
              </PaymentRow>
              <PaymentRow>
                <PaymentLabel>Platform Fee</PaymentLabel>
                <PaymentValue>$0.00</PaymentValue>
              </PaymentRow>
              <PaymentRow>
                <PaymentLabel>Your Earnings</PaymentLabel>
                <PaymentValue>${Number(booking.amount).toFixed()}</PaymentValue>
              </PaymentRow>
              {payment && (
                <PaymentRow>
                  <PaymentLabel>Payment Status</PaymentLabel>
                  <PaymentValue
                    style={{
                      color:
                        payment.status === "COMPLETED"
                          ? "var(--success-color)"
                          : payment.status === "FAILED"
                            ? "var(--error-color)"
                            : "var(--warning-color)",
                    }}
                  >
                    {payment.status}
                  </PaymentValue>
                </PaymentRow>
              )}
            </PaymentSection>
          </BookingSection>

          <BookingActions>
            {canStartChat && (
              <ActionButton to={`/astrologer/chat/${booking.id}`} primary>
                <FaComments /> Chat with Customer
              </ActionButton>
            )}

            {booking.status === "PENDING" && (
              <StatusButton primary onClick={() => handleUpdateStatus("CONFIRMED")}>
                Confirm Booking
              </StatusButton>
            )}

            {booking.status === "CONFIRMED" && (
              <StatusButton primary onClick={() => handleUpdateStatus("COMPLETED")}>
                Mark as Completed
              </StatusButton>
            )}
          </BookingActions>
        </BookingContent>
      </BookingDetailCard>
    </PageContainer>
  )
}

export default BookingDetail

