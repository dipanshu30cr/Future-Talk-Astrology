"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios"
import { toast } from "react-toastify"
import styled from "styled-components"
import { FaStar, FaLanguage, FaCheck, FaMapMarkerAlt, FaVideo } from "react-icons/fa"

const PageContainer = styled.div`
  padding: 2rem 0;
`

const BreadcrumbNav = styled.div`
  margin-bottom: 2rem;
  
  a {
    color: var(--light-text);
    
    &:hover {
      color: var(--primary-color);
    }
  }
  
  span {
    margin: 0 0.5rem;
    color: var(--light-text);
  }
`

const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`

const ProfileLeft = styled.div``

const ProfileHeader = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  gap: 2rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`

const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-image: url('/placeholder.svg?height=150&width=150');
  background-size: cover;
  background-position: center;
  border: 5px solid #FFF8E1;
  flex-shrink: 0;
`

const ProfileInfo = styled.div`
  flex: 1;
`

const ProfileName = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`

const ProfileSpecialty = styled.p`
  color: var(--light-text);
  margin-bottom: 1rem;
`

const ProfileRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  
  span {
    color: var(--secondary-color);
  }
`

const ProfileStats = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 576px) {
    justify-content: center;
  }
`

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  span:first-child {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
  }
  
  span:last-child {
    font-size: 0.9rem;
    color: var(--light-text);
  }
`

const ProfileSection = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
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

const ProfileBio = styled.p`
  line-height: 1.6;
  margin-bottom: 1.5rem;
`

const ExpertiseList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

const ExpertiseItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: var(--success-color);
  }
`

const LanguagesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const LanguageTag = styled.div`
  background-color: #F5F5F5;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: var(--primary-color);
  }
`

const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const ReviewItem = styled.div`
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1.5rem;
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
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
  font-size: 0.9rem;
  color: var(--light-text);
`

const ReviewRating = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
  color: var(--secondary-color);
`

const ReviewContent = styled.p`
  line-height: 1.6;
`

const ProfileRight = styled.div``

const BookingCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 2rem;
`

const BookingTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
`

const PriceTag = styled.div`
  background-color: #FFF8E1;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 1.5rem;
  
  span:first-child {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary-color);
  }
  
  span:last-child {
    font-size: 1rem;
    color: var(--light-text);
  }
`

const BookingForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormGroup = styled.div``

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`

const FormSelect = styled.select`
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

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`

const TimeSlotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-top: 0.5rem;
`

const TimeSlot = styled.button`
  padding: 0.5rem;
  border: 1px solid ${(props) => (props.selected ? "var(--primary-color)" : "var(--border-color)")};
  background-color: ${(props) => (props.selected ? "var(--primary-color)" : "white")};
  color: ${(props) => (props.selected ? "white" : "var(--text-color)")};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--primary-color);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const BookingButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
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

const LoginPrompt = styled.div`
  text-align: center;
  margin-top: 1rem;
  
  a {
    color: var(--primary-color);
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const MeetingTypeContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`

const MeetingTypeOption = styled.div`
  flex: 1;
  border: 2px solid ${(props) => (props.selected ? "var(--primary-color)" : "var(--border-color)")};
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${(props) => (props.selected ? "#FFF8E1" : "white")};
  
  &:hover {
    border-color: var(--primary-color);
  }
`

const MeetingTypeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: ${(props) => (props.selected ? "var(--primary-color)" : "var(--text-color)")};
  font-weight: 600;
`

const MeetingTypeDescription = styled.p`
  font-size: 0.9rem;
  color: var(--light-text);
`

const LocationInfo = styled.div`
  background-color: #F5F5F5;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  
  svg {
    color: var(--primary-color);
    margin-top: 0.2rem;
  }
`

const LocationText = styled.div`
  font-size: 0.9rem;
  line-height: 1.5;
`

const AstrologerDetailPage = () => {
  const { id } = useParams()
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()

  const [astrologer, setAstrologer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Booking form state
  const [consultationType, setConsultationType] = useState("VEDIC")
  const [meetingType, setMeetingType] = useState("ONLINE")
  const [bookingDate, setBookingDate] = useState("")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  const [bookingLoading, setBookingLoading] = useState(false)

  // Mock time slots (in a real app, these would come from the API)
  const timeSlots = [
    { id: 1, time: "09:00 AM" },
    { id: 2, time: "10:10 AM" },
    { id: 3, time: "11:20 AM" },
    { id: 4, time: "01:00 PM" },
    { id: 5, time: "02:10 PM" },
    { id: 6, time: "03:20 PM" },
    { id: 7, time: "04:30 PM" },
    { id: 8, time: "05:40 PM" },
    { id: 9, time: "06:50 PM" },
  ]

  useEffect(() => {
    const fetchAstrologer = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:9000/api/astrologers/${id}/`)
        setAstrologer(response.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch astrologer details")
        setLoading(false)
      }
    }

    fetchAstrologer()
  }, [id])

  const handleBooking = async (e) => {
    e.preventDefault()

    if (!isAuthenticated) {
      toast.info("Please login to book a consultation")
      navigate("/login")
      return
    }

    if (!bookingDate || !selectedTimeSlot) {
      toast.error("Please select a date and time slot")
      return
    }

    try {
      setBookingLoading(true)

      // Calculate end time (1 hour after start time)
      const startTime = selectedTimeSlot.time
      const [hourStr, minuteStr] = startTime.split(":")
      const hour = Number.parseInt(hourStr)
      const minute = Number.parseInt(minuteStr.split(" ")[0])
      const isPM = startTime.includes("PM")

      let startHour24 = hour
      if (isPM && hour !== 12) startHour24 += 12
      if (!isPM && hour === 12) startHour24 = 0

      let endHour24 = startHour24 + 1
      if (endHour24 > 23) endHour24 = 0

      const endTime = `${endHour24.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`

      const bookingData = {
        astrologer: astrologer.id,
        booking_date: bookingDate,
        start_time: `${startHour24.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
        end_time: endTime,
        consultation_type: consultationType,
        meeting_type: meetingType,
        amount: astrologer.hourly_rate,
        notes: "",
      }

      const response = await axios.post("http://localhost:9000/api/bookings/customer/", bookingData)

      toast.success("Booking successful!")
      navigate(`/customer/bookings/${response.data.id}`)
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to create booking")
    } finally {
      setBookingLoading(false)
    }
  }

  if (loading) {
    return <div>Loading astrologer details...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!astrologer) {
    return <div>Astrologer not found</div>
  }

  return (
    <PageContainer>
      <BreadcrumbNav>
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/astrologers">Astrologers</Link>
        <span>/</span>
        {astrologer.user.first_name} {astrologer.user.last_name}
      </BreadcrumbNav>

      <ProfileContainer>
        <ProfileLeft>
          <ProfileHeader>
            <ProfileImage />
            <ProfileInfo>
              <ProfileName>
                {astrologer.user.first_name} {astrologer.user.last_name}
              </ProfileName>
              <ProfileSpecialty>{astrologer.specializations.map((spec) => spec.name).join(", ")}</ProfileSpecialty>
              <ProfileRating>
                <FaStar />
                <span>{Number(astrologer.rating).toFixed(1)}</span>
                <span>({astrologer.reviews.length} reviews)</span>
              </ProfileRating>
              <ProfileStats>
                <StatItem>
                  <span>{astrologer.experience_years}</span>
                  <span>Years Exp.</span>
                </StatItem>
                <StatItem>
                  <span>{astrologer.total_consultations}</span>
                  <span>Consultations</span>
                </StatItem>
                <StatItem>
                  <span>${astrologer.hourly_rate}</span>
                  <span>Per Hour</span>
                </StatItem>
              </ProfileStats>
            </ProfileInfo>
          </ProfileHeader>

          <ProfileSection>
            <SectionTitle>About Me</SectionTitle>
            <ProfileBio>{astrologer.bio}</ProfileBio>
          </ProfileSection>

          <ProfileSection>
            <SectionTitle>Areas of Expertise</SectionTitle>
            <ExpertiseList>
              {astrologer.expertise_areas.split(",").map((area, index) => (
                <ExpertiseItem key={index}>
                  <FaCheck /> {area.trim()}
                </ExpertiseItem>
              ))}
            </ExpertiseList>
          </ProfileSection>

          <ProfileSection>
            <SectionTitle>Languages</SectionTitle>
            <LanguagesList>
              {astrologer.languages.split(",").map((language, index) => (
                <LanguageTag key={index}>
                  <FaLanguage /> {language.trim()}
                </LanguageTag>
              ))}
            </LanguagesList>
          </ProfileSection>

          <ProfileSection>
            <SectionTitle>Reviews</SectionTitle>
            {astrologer.reviews.length > 0 ? (
              <ReviewsList>
                {astrologer.reviews.map((review) => (
                  <ReviewItem key={review.id}>
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
                  </ReviewItem>
                ))}
              </ReviewsList>
            ) : (
              <p>No reviews yet.</p>
            )}
          </ProfileSection>
        </ProfileLeft>

        <ProfileRight>
          <BookingCard>
            <BookingTitle>Book a Consultation</BookingTitle>
            <PriceTag>
              <span>${astrologer.hourly_rate}</span>
              <span> / hour</span>
            </PriceTag>

            <BookingForm onSubmit={handleBooking}>
              <FormGroup>
                <FormLabel>Meeting Type</FormLabel>
                <MeetingTypeContainer>
                  <MeetingTypeOption selected={meetingType === "ONLINE"} onClick={() => setMeetingType("ONLINE")}>
                    <MeetingTypeHeader selected={meetingType === "ONLINE"}>
                      <FaVideo /> Online Meeting
                    </MeetingTypeHeader>
                    <MeetingTypeDescription>
                      Connect with the astrologer via our online chat platform.
                    </MeetingTypeDescription>
                  </MeetingTypeOption>

                  <MeetingTypeOption selected={meetingType === "PHYSICAL"} onClick={() => setMeetingType("PHYSICAL")}>
                    <MeetingTypeHeader selected={meetingType === "PHYSICAL"}>
                      <FaMapMarkerAlt /> Physical Meeting
                    </MeetingTypeHeader>
                    <MeetingTypeDescription>
                      Visit the astrologer at their location for an in-person consultation.
                    </MeetingTypeDescription>
                  </MeetingTypeOption>
                </MeetingTypeContainer>

                {meetingType === "PHYSICAL" && (
                  <LocationInfo>
                    <FaMapMarkerAlt />
                    <LocationText>
                      <strong>Location:</strong> Kailash Nagar Irgu Road, Near Kailash Mandir.
                      <br />
                      <small>Payment will be made directly to the astrologer at the start of the meeting.</small>
                    </LocationText>
                  </LocationInfo>
                )}

                {meetingType === "ONLINE" && (
                  <LocationInfo>
                    <FaVideo />
                    <LocationText>
                      <strong>Online Session:</strong> Payment will be processed by the astrologer at the start of the
                      chat.
                      <br />
                      <small>There will be a 10-minute setup and payment time before the 1-hour chat begins.</small>
                    </LocationText>
                  </LocationInfo>
                )}
              </FormGroup>

              <FormGroup>
                <FormLabel>Consultation Type</FormLabel>
                <FormSelect value={consultationType} onChange={(e) => setConsultationType(e.target.value)}>
                  <option value="VEDIC">Vedic Astrology</option>
                  <option value="NADI">Nadi Astrology</option>
                  <option value="NUMEROLOGY">Numerology</option>
                  <option value="TAROT">Tarot Reading</option>
                  <option value="PALMISTRY">Palmistry</option>
                </FormSelect>
              </FormGroup>

              <FormGroup>
                <FormLabel>Select Date</FormLabel>
                <FormInput
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Select Time Slot</FormLabel>
                <TimeSlotGrid>
                  {timeSlots.map((slot) => (
                    <TimeSlot
                      key={slot.id}
                      selected={selectedTimeSlot?.id === slot.id}
                      onClick={() => setSelectedTimeSlot(slot)}
                      type="button"
                    >
                      {slot.time}
                    </TimeSlot>
                  ))}
                </TimeSlotGrid>
                <small style={{ display: "block", marginTop: "0.5rem", color: "var(--light-text)" }}>
                  Time slots are spaced with 1 hour 10 minutes gap to allow for setup and payment time.
                </small>
              </FormGroup>

              <BookingButton type="submit" disabled={bookingLoading}>
                {bookingLoading ? "Processing..." : "Book Now"}
              </BookingButton>
            </BookingForm>

            {!isAuthenticated && (
              <LoginPrompt>
                <Link to="/login">Login</Link> to book a consultation
              </LoginPrompt>
            )}
          </BookingCard>
        </ProfileRight>
      </ProfileContainer>
    </PageContainer>
  )
}

export default AstrologerDetailPage

