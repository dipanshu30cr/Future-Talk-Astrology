import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { FaCalendarAlt, FaClock, FaPlus, FaTrash } from 'react-icons/fa';

const PageContainer = styled.div`
  padding: 1rem;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const PageDescription = styled.p`
  color: var(--light-text);
`;

const AvailabilityCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
`;

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
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div``;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #7B1FA2;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const AvailabilityList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

const AvailabilityItem = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AvailabilityInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const AvailabilityDay = styled.div`
  font-weight: 600;
`;

const AvailabilityTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--light-text);
  
  svg {
    color: var(--accent-color);
  }
`;

const DeleteButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #FFEBEE;
  color: var(--error-color);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--error-color);
    color: white;
  }
`;

const NoAvailability = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--light-text);
  border: 1px dashed var(--border-color);
  border-radius: 8px;
`;

const WeeklyScheduleCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const DayCard = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
`;

const DayHeader = styled.div`
  background-color: var(--accent-color);
  color: white;
  padding: 0.5rem;
  text-align: center;
  font-weight: 600;
`;

const DayContent = styled.div`
  padding: 0.5rem;
  min-height: 100px;
`;

const TimeSlot = styled.div`
  background-color: #F3E5F5;
  color: var(--accent-color);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    font-size: 0.8rem;
  }
`;

const Availability = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    day_of_week: 0,
    start_time: '',
    end_time: ''
  });
  
  useEffect(() => {
    const fetchAvailabilities = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:9000/api/astrologers/availability/');
        setAvailabilities(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch availabilities:', err);
        setLoading(false);
      }
    };
    
    fetchAvailabilities();
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.day_of_week || !formData.start_time || !formData.end_time) {
      toast.error('Please fill all fields');
      return;
    }
    
    // Validate time range
    if (formData.start_time >= formData.end_time) {
      toast.error('End time must be after start time');
      return;
    }
    
    try {
      setSubmitting(true);
      const response = await axios.post('http://localhost:9000/api/astrologers/availability/', formData);
      
      // Add new availability to state
      setAvailabilities([...availabilities, response.data]);
      
      // Reset form
      setFormData({
        day_of_week: 0,
        start_time: '',
        end_time: ''
      });
      
      toast.success('Availability added successfully');
    } catch (err) {
      console.error('Failed to add availability:', err);
      toast.error('Failed to add availability');
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/astrologers/availability/${id}/`);
      
      // Remove deleted availability from state
      setAvailabilities(availabilities.filter(item => item.id !== id));
      
      toast.success('Availability removed successfully');
    } catch (err) {
      console.error('Failed to delete availability:', err);
      toast.error('Failed to remove availability');
    }
  };
  
  // Group availabilities by day
  const availabilitiesByDay = availabilities.reduce((acc, item) => {
    if (!acc[item.day_of_week]) {
      acc[item.day_of_week] = [];
    }
    acc[item.day_of_week].push(item);
    return acc;
  }, {});
  
  // Get day name
  const getDayName = (dayIndex) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[dayIndex];
  };
  
  if (loading) {
    return <div>Loading availabilities...</div>;
  }
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Manage Availability</PageTitle>
        <PageDescription>
          Set your available time slots for consultations. Customers will only be able to book during these times.
        </PageDescription>
      </PageHeader>
      
      <AvailabilityCard>
        <SectionTitle>Add New Availability</SectionTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel>Day of Week</FormLabel>
            <FormSelect
              name="day_of_week"
              value={formData.day_of_week}
              onChange={handleInputChange}
            >
              <option value={0}>Monday</option>
              <option value={1}>Tuesday</option>
              <option value={2}>Wednesday</option>
              <option value={3}>Thursday</option>
              <option value={4}>Friday</option>
              <option value={5}>Saturday</option>
              <option value={6}>Sunday</option>
            </FormSelect>
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Start Time</FormLabel>
            <FormInput
              type="time"
              name="start_time"
              value={formData.start_time}
              onChange={handleInputChange}
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel>End Time</FormLabel>
            <FormInput
              type="time"
              name="end_time"
              value={formData.end_time}
              onChange={handleInputChange}
            />
          </FormGroup>
          
          <AddButton type="submit" disabled={submitting}>
            <FaPlus /> Add Time Slot
          </AddButton>
        </Form>
        
        <SectionTitle>Current Availabilities</SectionTitle>
        {availabilities.length > 0 ? (
          <AvailabilityList>
            {availabilities.map(item => (
              <AvailabilityItem key={item.id}>
                <AvailabilityInfo>
                  <AvailabilityDay>{getDayName(item.day_of_week)}</AvailabilityDay>
                  <AvailabilityTime>
                    <FaClock />
                    {item.start_time} - {item.end_time}
                  </AvailabilityTime>
                </AvailabilityInfo>
                <DeleteButton onClick={() => handleDelete(item.id)}>
                  <FaTrash />
                </DeleteButton>
              </AvailabilityItem>
            ))}
          </AvailabilityList>
        ) : (
          <NoAvailability>
            <p>You haven't added any availability yet.</p>
          </NoAvailability>
        )}
      </AvailabilityCard>
      
      <WeeklyScheduleCard>
        <SectionTitle>Weekly Schedule</SectionTitle>
        <WeekGrid>
          {[0, 1, 2, 3, 4, 5, 6].map(day => (
            <DayCard key={day}>
              <DayHeader>{getDayName(day)}</DayHeader>
              <DayContent>
                {availabilitiesByDay[day]?.map(item => (
                  <TimeSlot key={item.id}>
                    <FaClock />
                    {item.start_time} - {item.end_time}
                  </TimeSlot>
                ))}
                {!availabilitiesByDay[day] && (
                  <div style={{ color: 'var(--light-text)', fontSize: '0.9rem', textAlign: 'center', marginTop: '1rem' }}>
                    Not Available
                  </div>
                )}
              </DayContent>
            </DayCard>
          ))}
        </WeekGrid>
      </WeeklyScheduleCard>
    </PageContainer>
  );
};

export default Availability;
