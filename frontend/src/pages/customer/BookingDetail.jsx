"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import styled from "styled-components"
import { FaCalendarAlt, FaClock, FaRupeeSign, FaUser, FaStar, FaArrowLeft, FaComments } from "react-icons/fa"

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
    color: var(--primary-color);
  }
`

const BookingDetailCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`

const BookingHeader = styled.div`
  background: linear-gradient(135deg, #FF9800 0%, #FF5722 100%);
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
    background-color: var(--primary-color);
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
  background-color: #FFF8E1;
  color: var(--primary-color);
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

const AstrologerSection = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`

const AstrologerImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url('/placeholder.svg?height=100&width=100');
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`

const AstrologerInfo = styled.div`
  flex: 1;
`

const AstrologerName = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const AstrologerSpecialty = styled.p`
  color: var(--light-text);
  margin-bottom: 0.5rem;
`

const AstrologerRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  
  svg {
    color: var(--secondary-color);
  }
`

const ViewProfileButton = styled(Link)`
  display: inline-block;
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
  background-color: ${(props) => (props.primary ? "var(--primary-color)" : "transparent")};
  color: ${(props) => (props.primary ? "white" : "var(--primary-color)")};
  border: 1px solid ${(props) => (props.primary ? "var(--primary-color)" : "var(--border-color)")};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${(props) => (props.primary ? "#E64A19" : "#FFF8E1")};
  }
`

const CancelButton = styled.button`
  flex: 1;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-align: center;
  font-weight: 500;
  background-color: transparent;
  color: var(--error-color);
  border: 1px solid var(--error-color);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background-color: #FFEBEE;
  }
`

const ReviewSection = styled.div`
  margin-top: 2rem;
`

const ReviewForm = styled.form`
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`

const RatingContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`

const RatingStar = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${(props) => (props.active ? "var(--secondary-color)" : "#E0E0E0")};
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--secondary-color);
  }
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #E64A19;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

const BookingDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Review state
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [submittingReview, setSubmittingReview] = useState(false)

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:9000/api/bookings/customer/${id}/`)
        setBooking(response.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch booking details")
        setLoading(false)
      }
    }

    fetchBooking()
  }, [id])

  const handleCancelBooking = async () => {
    try {
      await axios.put(`http://localhost:9000/api/bookings/customer/${id}/`, {
        status: "CANCELLED",
      })

      // Update the booking status in the state
      setBooking({ ...booking, status: "CANCELLED" })
      toast.success("Booking cancelled successfully")
    } catch (err) {
      console.error("Failed to cancel booking:", err)
      toast.error("Failed to cancel booking")
    }
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()

    if (rating === 0) {
      toast.error("Please select a rating")
      return
    }

    try {
      setSubmittingReview(true)
      await axios.post(`http://localhost:9000/api/astrologers/${booking.astrologer}/reviews/`, {
        rating,
        comment,
      })

      toast.success("Review submitted successfully")
      // Refresh the booking data to show the review
      const response = await axios.get(`http://localhost:9000/api/bookings/customer/${id}/`)
      setBooking(response.data)

      // Reset form
      setRating(0)
      setComment("")
    } catch (err) {
      console.error("Failed to submit review:", err)
      toast.error("Failed to submit review")
    } finally {
      setSubmittingReview(false)
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

  // Check if user has already reviewed this astrologer
  const hasReviewed = booking.astrologer_details.reviews.some((review) => review.customer === booking.customer)

  return (
    <PageContainer>
      <BackLink to="/customer/bookings">
        <FaArrowLeft /> Back to Bookings
      </BackLink>

      <BookingDetailCard>
        <BookingHeader>
          <BookingStatus status={booking.status}>{booking.status}</BookingStatus>
          <BookingTitle>Booking #{booking.id}</BookingTitle>
          <BookingSubtitle>{getConsultationTypeName(booking.consultation_type)} Session</BookingSubtitle>
        </BookingHeader>

        <BookingContent>
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
                <DetailIcon>
                  <FaRupeeSign />
                </DetailIcon>
                <DetailContent>
                  <DetailLabel>Amount</DetailLabel>
                  <DetailValue>${booking.amount}</DetailValue>
                </DetailContent>
              </DetailItem>
            </DetailsGrid>
          </BookingSection>

          <BookingSection>
            <SectionTitle>Astrologer</SectionTitle>
            <AstrologerSection>
              <AstrologerImage />
              <AstrologerInfo>
                <AstrologerName>
                  {booking.astrologer_details.user.first_name} {booking.astrologer_details.user.last_name}
                </AstrologerName>
                <AstrologerSpecialty>
                  {booking.astrologer_details.specializations.map((spec) => spec.name).join(", ")}
                </AstrologerSpecialty>
                <AstrologerRating>
                  <FaStar />
                  
                  {/* <span>{typeof booking.astrologer_details.rating === 'number' ? booking.astrologer_details.rating.toFixed(1) : 'N/A'}</span> */}
                  <span>{Number(booking.astrologer_details.rating).toFixed(1)}</span>
                  <span>({booking.astrologer_details.reviews.length} reviews)</span>
                </AstrologerRating>
                <ViewProfileButton to={`/astrologers/${booking.astrologer}`}>View Profile</ViewProfileButton>
              </AstrologerInfo>
            </AstrologerSection>
          </BookingSection>

          <BookingSection>
            <SectionTitle>Payment Details</SectionTitle>
            <PaymentSection>
              <PaymentRow>
                <PaymentLabel>Consultation Fee</PaymentLabel>
                <PaymentValue>${booking.amount}</PaymentValue>
              </PaymentRow>
              <PaymentRow>
                <PaymentLabel>Tax</PaymentLabel>
                <PaymentValue>$0.00</PaymentValue>
              </PaymentRow>
              <PaymentRow>
                <PaymentLabel>Total Amount</PaymentLabel>
                <PaymentValue>${booking.amount}</PaymentValue>
              </PaymentRow>
            </PaymentSection>
            <div style={{ textAlign: 'center' , fontSize: '14px', fontStyle: 'italic', color: '#555'}}>You will have to pay this amount at the</div>
            <div style={{ textAlign: 'center' , fontSize: '14px', fontStyle: 'italic', color: '#555'}}>start of the chat(time not included in Hour) or </div>
            <div style={{ textAlign: 'center' , fontSize: '14px', fontStyle: 'italic', color: '#555'}}>If Physical meeting will occur then pay at that time only.</div>

          </BookingSection>

          <BookingActions>
            {booking.status === "CONFIRMED" && (
              <ActionButton to={`/customer/chat/${booking.id}`} primary>
                <FaComments /> Chat with Astrologer
              </ActionButton>
            )}

            {(booking.status === "PENDING" || booking.status === "CONFIRMED") && (
              <CancelButton onClick={handleCancelBooking}>Cancel Booking</CancelButton>
            )}

            <ActionButton to={`/astrologers/${booking.astrologer}`}>Book Again</ActionButton>
          </BookingActions>
        </BookingContent>
      </BookingDetailCard>

      {booking.status === "COMPLETED" && !hasReviewed && (
        <ReviewSection>
          <SectionTitle>Leave a Review</SectionTitle>
          <ReviewForm onSubmit={handleSubmitReview}>
            <FormGroup>
              <FormLabel>Rating</FormLabel>
              <RatingContainer>
                {[1, 2, 3, 4, 5].map((star) => (
                  <RatingStar key={star} type="button" active={star <= rating} onClick={() => setRating(star)}>
                    <FaStar />
                  </RatingStar>
                ))}
              </RatingContainer>
            </FormGroup>

            <FormGroup>
              <FormLabel>Comment</FormLabel>
              <TextArea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with the astrologer..."
              />
            </FormGroup>

            <SubmitButton type="submit" disabled={submittingReview}>
              {submittingReview ? "Submitting..." : "Submit Review"}
            </SubmitButton>
          </ReviewForm>
        </ReviewSection>
      )}
    </PageContainer>
  )
}

export default BookingDetail

