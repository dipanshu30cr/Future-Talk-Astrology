"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import styled from "styled-components"
import {
  FaCalendarAlt,
  FaClock,
  FaRupeeSign,
  FaUser,
  FaStar,
  FaArrowLeft,
  FaComments,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
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

// Enhanced payment components
const PaymentRequiredSection = styled.div`
  background-color: #FFF8E1;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
`

const PaymentRequiredTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--primary-color);
`

const PaymentRequiredText = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.6;
`

const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;
  border: 2px dashed #FF9800;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: white;
`

const QRCodeImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 8px;
  object-fit: contain;
`

const PaymentAmount = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin: 0.5rem 0;
`

const PaymentUPI = styled.div`
  background-color: #E8F5E9;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`

const PaymentInstructions = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  text-align: left;
  line-height: 1.6;
  border: 1px solid #E0E0E0;
`

const PaymentMethodsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
`

const PaymentMethodIcon = styled.div`
  width: 60px;
  height: 40px;
  background-color: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.8rem;
  border: 1px solid #E0E0E0;
`

const PaymentVerifyButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 1rem auto;
  width: 100%;
  max-width: 300px;

  &:hover {
    background-color: #E64A19;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

const PaymentSuccessSection = styled.div`
  background-color: #E8F5E9;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

const PaymentSuccessIcon = styled.div`
  font-size: 3rem;
  color: var(--success-color);
`

const PaymentSuccessTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--success-color);
`

const PaymentTransactionDetails = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  width: 100%;
  max-width: 400px;
  margin: 0.5rem auto;
  border: 1px solid #E0E0E0;
`

const TransactionRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const TransactionLabel = styled.div`
  color: var(--light-text);
`

const TransactionValue = styled.div`
  font-weight: 500;
`

const PaymentCancelSection = styled.div`
  background-color: #FFEBEE;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  text-align: center;
`

const PaymentCancelTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--error-color);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`

const PaymentCancelText = styled.p`
  margin-bottom: 1rem;
  font-size: 0.9rem;
`

const PaymentCancelButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: var(--error-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background-color: #C62828;
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

  // Payment state
  const [payment, setPayment] = useState(null)
  const [paymentStatus, setPaymentStatus] = useState("PENDING") // PENDING, VERIFYING, COMPLETED
  const [verifyingPayment, setVerifyingPayment] = useState(false)
  const [utrNumber, setUtrNumber] = useState("")
  const [showRefundRequest, setShowRefundRequest] = useState(false)
  const [refundReason, setRefundReason] = useState("")
  const [processingRefund, setProcessingRefund] = useState(false)

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:9000/api/bookings/customer/${id}/`)
        setBooking(response.data)

        // Check if payment exists
        try {
          const paymentResponse = await axios.get(`http://localhost:9000/api/bookings/customer/${id}/payment/`)
          setPayment(paymentResponse.data)
          setPaymentStatus(paymentResponse.data.status)
        } catch (paymentErr) {
          // Payment doesn't exist yet, that's okay
          console.log("No payment found for this booking")
        }

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

      // If payment was made, show refund request option
      if (payment && payment.status === "COMPLETED") {
        setShowRefundRequest(true)
      }
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

  const handleMakePayment = async () => {
    try {
      // Create a payment record
      const paymentData = {
        amount: booking.amount,
        payment_method: "UPI",
      }

      const response = await axios.post(
        `http://localhost:9000/api/bookings/customer/${booking.id}/payment/`,
        paymentData,
      )
      setPayment(response.data)
      toast.success("Payment initiated. Please complete the payment using the QR code.")
    } catch (err) {
      console.error("Failed to initiate payment:", err)
      toast.error("Failed to initiate payment")
    }
  }

  const handleVerifyPayment = async (e) => {
    e.preventDefault()

    if (!utrNumber) {
      toast.error("Please enter the UTR/Reference number")
      return
    }

    try {
      setVerifyingPayment(true)

      // In a real app, this would verify with a payment gateway
      // For this demo, we'll simulate a verification process
      setTimeout(async () => {
        try {
          // Update payment status to COMPLETED
          const response = await axios.put(`http://localhost:9000/api/bookings/admin/payments/${payment.id}/`, {
            status: "COMPLETED",
            transaction_id: utrNumber,
          })

          setPayment(response.data)
          setPaymentStatus("COMPLETED")
          toast.success("Payment verified successfully!")
        } catch (err) {
          console.error("Failed to update payment status:", err)
          toast.error("Failed to verify payment")
        } finally {
          setVerifyingPayment(false)
        }
      }, 2000)
    } catch (err) {
      console.error("Failed to verify payment:", err)
      toast.error("Failed to verify payment")
      setVerifyingPayment(false)
    }
  }

  const handleRequestRefund = async () => {
    if (!refundReason) {
      toast.error("Please provide a reason for the refund")
      return
    }

    try {
      setProcessingRefund(true)

      // In a real app, this would create a refund request in the database
      // For this demo, we'll simulate a refund request
      setTimeout(async () => {
        try {
          // Update payment status to REFUND_REQUESTED
          const response = await axios.put(`http://localhost:9000/api/bookings/admin/payments/${payment.id}/`, {
            status: "REFUND_REQUESTED",
            refund_reason: refundReason,
          })

          setPayment(response.data)
          setPaymentStatus("REFUND_REQUESTED")
          setShowRefundRequest(false)
          toast.success("Refund request submitted successfully! Our team will process it within 5-7 business days.")
        } catch (err) {
          console.error("Failed to request refund:", err)
          toast.error("Failed to request refund")
        } finally {
          setProcessingRefund(false)
        }
      }, 1500)
    } catch (err) {
      console.error("Failed to request refund:", err)
      toast.error("Failed to request refund")
      setProcessingRefund(false)
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

  // Determine if payment is required
  const isPaymentRequired = booking.status === "CONFIRMED" && (!payment || payment.status !== "COMPLETED")

  // Determine if chat is available
  const isChatAvailable = booking.status === "CONFIRMED" && payment && payment.status === "COMPLETED"

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-IN", options)
  }

  // Format time for display
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

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
          {/* Payment Required Section */}
          {isPaymentRequired && (
            <PaymentRequiredSection>
              <PaymentRequiredTitle>Payment Required</PaymentRequiredTitle>
              <PaymentRequiredText>
                Your booking has been confirmed by the astrologer. Please complete the payment to start the
                consultation.
              </PaymentRequiredText>

              {!payment && <SubmitButton onClick={handleMakePayment}>Make Payment (₹{booking.amount})</SubmitButton>}

              {payment && payment.status === "PENDING" && (
                <>
                  {/* <QRCodeContainer>
                    <QRCodeImage src="/placeholder.svg?height=200&width=200" alt="Payment QR Code" />
                    <PaymentAmount>₹{booking.amount}</PaymentAmount>
                    <PaymentUPI>
                      <FaInfoCircle /> UPI ID: futuretalk@ybl
                    </PaymentUPI>
                  </QRCodeContainer> */}

                  <PaymentMethodsContainer>
                    <PaymentMethodIcon>GPay</PaymentMethodIcon>
                    <PaymentMethodIcon>PhonePe</PaymentMethodIcon>
                    <PaymentMethodIcon>Paytm</PaymentMethodIcon>
                    <PaymentMethodIcon>BHIM</PaymentMethodIcon>
                  </PaymentMethodsContainer>

                  <PaymentInstructions>
                    <p>
                      <strong>Instructions:</strong>
                    </p>
                    <ol>
                      <li>Open your UPI app (Google Pay, PhonePe, Paytm, etc.)</li>
                      <li>Scan the QR code or enter the upi-id given by astrologer</li>
                      <li>Enter the exact amount: ₹{booking.amount} as it will be verified by astrologer</li>
                      <li>Complete the payment</li>
                      <li>Enter the UTR/Reference number below</li>
                      <li>Click "Verify Payment" to confirm your payment</li>
                    </ol>
                  </PaymentInstructions>

                  <form onSubmit={handleVerifyPayment}>
                    <FormGroup>
                      <FormLabel>UTR/Reference Number</FormLabel>
                      <TextArea
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                        placeholder="Enter the UTR/Reference number from your payment receipt"
                        required
                        style={{ minHeight: "60px" }}
                      />
                    </FormGroup>

                    <PaymentVerifyButton type="submit" disabled={verifyingPayment}>
                      {verifyingPayment ? "Verifying..." : "Verify Payment"}
                    </PaymentVerifyButton>
                  </form>
                </>
              )}
            </PaymentRequiredSection>
          )}

          {/* Payment Success Section */}
          {payment && payment.status === "COMPLETED" && (
            <PaymentSuccessSection>
              <PaymentSuccessIcon>
                <FaCheckCircle />
              </PaymentSuccessIcon>
              <PaymentSuccessTitle>Payment Completed</PaymentSuccessTitle>

              <PaymentTransactionDetails>
                <TransactionRow>
                  <TransactionLabel>Transaction ID:</TransactionLabel>
                  <TransactionValue>{payment.transaction_id}</TransactionValue>
                </TransactionRow>
                <TransactionRow>
                  <TransactionLabel>Amount:</TransactionLabel>
                  <TransactionValue>₹{booking.amount}</TransactionValue>
                </TransactionRow>
                <TransactionRow>
                  <TransactionLabel>Payment Method:</TransactionLabel>
                  <TransactionValue>{payment.payment_method}</TransactionValue>
                </TransactionRow>
                <TransactionRow>
                  <TransactionLabel>Date:</TransactionLabel>
                  <TransactionValue>{new Date(payment.updated_at).toLocaleDateString()}</TransactionValue>
                </TransactionRow>
              </PaymentTransactionDetails>

              <p>You can now chat with your astrologer at the scheduled time.</p>

              {booking.status === "CONFIRMED" && (
                <PaymentCancelSection>
                  <PaymentCancelTitle>
                    <FaExclamationTriangle /> Need to Cancel?
                  </PaymentCancelTitle>
                  <PaymentCancelText>
                    If you cancel after payment, you can request a refund. Refunds will be processed within 5-7 business
                    days.
                  </PaymentCancelText>
                  <PaymentCancelButton onClick={handleCancelBooking}>Cancel & Request Refund</PaymentCancelButton>
                </PaymentCancelSection>
              )}
            </PaymentSuccessSection>
          )}

          {/* Refund Request Form */}
          {showRefundRequest && (
            <PaymentRequiredSection style={{ backgroundColor: "#FFEBEE" }}>
              <PaymentRequiredTitle style={{ color: "var(--error-color)" }}>Request Refund</PaymentRequiredTitle>
              <PaymentRequiredText>
                Your booking has been cancelled. Please provide a reason for your refund request.
              </PaymentRequiredText>

              <FormGroup>
                <FormLabel>Reason for Refund</FormLabel>
                <TextArea
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  placeholder="Please explain why you're requesting a refund"
                  required
                />
              </FormGroup>

              <SubmitButton
                onClick={handleRequestRefund}
                disabled={processingRefund}
                style={{ backgroundColor: "var(--error-color)" }}
              >
                {processingRefund ? "Processing..." : "Submit Refund Request"}
              </SubmitButton>
            </PaymentRequiredSection>
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
                  <DetailValue>{formatDate(booking.booking_date)}</DetailValue>
                </DetailContent>
              </DetailItem>

              <DetailItem>
                <DetailIcon>
                  <FaClock />
                </DetailIcon>
                <DetailContent>
                  <DetailLabel>Time</DetailLabel>
                  <DetailValue>
                    {formatTime(booking.start_time)} - {formatTime(booking.end_time)}
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
                  <DetailValue>₹{Number(booking.amount).toFixed(2)}</DetailValue>
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
                <PaymentValue>₹{Number(booking.amount).toFixed(2)}</PaymentValue>
              </PaymentRow>
              <PaymentRow>
                <PaymentLabel>GST (18%)</PaymentLabel>
                <PaymentValue>₹{(Number(booking.amount) * 0.18).toFixed(2)}</PaymentValue>
              </PaymentRow>
              <PaymentRow>
                <PaymentLabel>Total Amount</PaymentLabel>
                <PaymentValue>₹{(Number(booking.amount) * 1.18).toFixed(2)}</PaymentValue>
              </PaymentRow>
              {payment && (
                <PaymentRow>
                  <PaymentLabel>Payment Status</PaymentLabel>
                  <PaymentValue
                    style={{
                      color:
                        payment.status === "COMPLETED"
                          ? "var(--success-color)"
                          : payment.status === "FAILED" || payment.status === "REFUND_REQUESTED"
                            ? "var(--error-color)"
                            : "var(--warning-color)",
                    }}
                  >
                    {payment.status === "REFUND_REQUESTED" ? "Refund Requested" : payment.status}
                  </PaymentValue>
                </PaymentRow>
              )}
            </PaymentSection>
          </BookingSection>

          <BookingActions>
            {isChatAvailable && (
              <ActionButton to={`/customer/chat/${booking.id}`} primary>
                <FaComments /> Chat with Astrologer
              </ActionButton>
            )}

            {(booking.status === "PENDING" || booking.status === "CONFIRMED") && !payment && (
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

      {booking.meeting_type === "PHYSICAL" && (
        <PaymentSuccessSection style={{ backgroundColor: "#E8F5E9" }}>
          <PaymentSuccessIcon>
            <FaMapMarkerAlt />
          </PaymentSuccessIcon>
          <PaymentSuccessTitle>Physical Meeting</PaymentSuccessTitle>
          <p>Please visit the astrologer at the following location:</p>
          <PaymentTransactionDetails>
            <TransactionRow>
              <TransactionLabel>Address:</TransactionLabel>
              <TransactionValue>Kailash Nagar Irgu Road, Near Kailash Mandir</TransactionValue>
            </TransactionRow>
            <TransactionRow>
              <TransactionLabel>Payment:</TransactionLabel>
              <TransactionValue>To be made directly to the astrologer</TransactionValue>
            </TransactionRow>
          </PaymentTransactionDetails>
          <p>Please arrive 10 minutes early for setup and payment processing.</p>
        </PaymentSuccessSection>
      )}
    </PageContainer>
  )
}

export default BookingDetail

