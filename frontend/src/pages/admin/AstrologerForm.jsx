import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { FaArrowLeft, FaSave, FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaRupeeSign, FaLanguage } from 'react-icons/fa';

const PageContainer = styled.div`
  padding: 1rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color);
  margin-bottom: 1.5rem;
  font-weight: 500;
  
  &:hover {
    color: #3F51B5;
  }
`;

const FormCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const FormHeader = styled.div`
  background-color: #3F51B5;
  color: white;
  padding: 2rem;
`;

const FormTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const FormSubtitle = styled.p`
  opacity: 0.9;
`;

const FormContent = styled.div`
  padding: 2rem;
`;

const Form = styled.form``;

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
    background-color: #3F51B5;
  }
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: #3F51B5;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: #3F51B5;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: #3F51B5;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  cursor: pointer;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const CancelButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  background-color: transparent;
  color: var(--text-color);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #F5F5F5;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  background-color: #3F51B5;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #303F9F;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const AstrologerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [users, setUsers] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  
  // Form state
  const [formData, setFormData] = useState({
    user_id: '',
    bio: '',
    experience_years: 0,
    hourly_rate: 0,
    languages: '',
    expertise_areas: '',
    specialization_ids: []
  });
  
  // User form state (for new user creation)
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone_number: ''
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch users with CUSTOMER role (potential astrologers)
        const usersResponse = await axios.get('http://localhost:9000/api/users/');
        const customers = usersResponse.data.filter(user => user.role === 'CUSTOMER');
        setUsers(customers);
        
        // Fetch specializations
        const specializationsResponse = await axios.get('http://localhost:9000/api/astrologers/specializations/');
        setSpecializations(specializationsResponse.data);
        
        // If in edit mode, fetch astrologer data
        if (isEditMode) {
          const astrologerResponse = await axios.get(`http://localhost:9000/api/astrologers/admin/${id}/`);
          const astrologer = astrologerResponse.data;
          
          setFormData({
            user_id: astrologer.user.id,
            bio: astrologer.bio || '',
            experience_years: astrologer.experience_years || 0,
            hourly_rate: astrologer.hourly_rate || 0,
            languages: astrologer.languages || '',
            expertise_areas: astrologer.expertise_areas || '',
            specialization_ids: astrologer.specializations.map(spec => spec.id) || []
          });
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, isEditMode]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };
  
  const handleSpecializationChange = (e) => {
    const specId = parseInt(e.target.value);
    const isChecked = e.target.checked;
    
    if (isChecked) {
      setFormData({
        ...formData,
        specialization_ids: [...formData.specialization_ids, specId]
      });
    } else {
      setFormData({
        ...formData,
        specialization_ids: formData.specialization_ids.filter(id => id !== specId)
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      
      let userId = formData.user_id;
      
      // If creating a new user
      if (!isEditMode && !userId) {
        // Validate user data
        if (!userData.username || !userData.email || !userData.password || !userData.first_name || !userData.last_name) {
          toast.error('Please fill all required user fields');
          setSubmitting(false);
          return;
        }
        
        // Create new user
        const userResponse = await axios.post('http://localhost:9000/api/users/register/', {
          ...userData,
          role: 'CUSTOMER'  // Initially create as customer, will be upgraded to astrologer
        });
        
        userId = userResponse.data.user.id;
      }
      
      // Validate astrologer data
      if (!formData.bio || !formData.experience_years || !formData.hourly_rate || !formData.languages || !formData.expertise_areas) {
        toast.error('Please fill all required astrologer fields');
        setSubmitting(false);
        return;
      }
      
      const astrologerData = {
        ...formData,
        user_id: userId
      };
      
      if (isEditMode) {
        // Update existing astrologer
        await axios.put(`http://localhost:9000/api/astrologers/admin/${id}/`, astrologerData);
        toast.success('Astrologer updated successfully');
      } else {
        // Create new astrologer
        await axios.post('http://localhost:9000/api/astrologers/admin/', astrologerData);
        toast.success('Astrologer created successfully');
      }
      
      navigate('/admin/astrologers');
    } catch (error) {
      console.error('Error saving astrologer:', error);
      toast.error('Failed to save astrologer');
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <PageContainer>
      <BackLink to="/admin/astrologers">
        <FaArrowLeft /> Back to Astrologers
      </BackLink>
      
      <FormCard>
        <FormHeader>
          <FormTitle>{isEditMode ? 'Edit Astrologer' : 'Add New Astrologer'}</FormTitle>
          <FormSubtitle>
            {isEditMode 
              ? 'Update the astrologer\'s profile information' 
              : 'Create a new astrologer profile'}
          </FormSubtitle>
        </FormHeader>
        
        <FormContent>
          <Form onSubmit={handleSubmit}>
            {!isEditMode && (
              <FormSection>
                <SectionTitle>User Selection</SectionTitle>
                <FormGroup>
                  <FormLabel>Select Existing User or Create New</FormLabel>
                  <FormSelect
                    name="user_id"
                    value={formData.user_id}
                    onChange={handleInputChange}
                  >
                    <option value="">-- Create New User --</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.first_name} {user.last_name} ({user.email})
                      </option>
                    ))}
                  </FormSelect>
                </FormGroup>
              </FormSection>
            )}
            
            {!isEditMode && !formData.user_id && (
              <FormSection>
                <SectionTitle>New User Information</SectionTitle>
                <FormGrid>
                  <FormGroup>
                    <FormLabel>Username *</FormLabel>
                    <FormInput
                      type="text"
                      name="username"
                      value={userData.username}
                      onChange={handleUserInputChange}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel>Email *</FormLabel>
                    <FormInput
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleUserInputChange}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel>Password *</FormLabel>
                    <FormInput
                      type="password"
                      name="password"
                      value={userData.password}
                      onChange={handleUserInputChange}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel>Phone Number</FormLabel>
                    <FormInput
                      type="tel"
                      name="phone_number"
                      value={userData.phone_number}
                      onChange={handleUserInputChange}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel>First Name *</FormLabel>
                    <FormInput
                      type="text"
                      name="first_name"
                      value={userData.first_name}
                      onChange={handleUserInputChange}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel>Last Name *</FormLabel>
                    <FormInput
                      type="text"
                      name="last_name"
                      value={userData.last_name}
                      onChange={handleUserInputChange}
                      required
                    />
                  </FormGroup>
                </FormGrid>
              </FormSection>
            )}
            
            <FormSection>
              <SectionTitle>Astrologer Profile</SectionTitle>
              <FormGroup>
                <FormLabel>Bio *</FormLabel>
                <FormTextarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Professional background and expertise..."
                  required
                />
              </FormGroup>
              
              <FormGrid>
                <FormGroup>
                  <FormLabel>Experience (Years) *</FormLabel>
                  <FormInput
                    type="number"
                    name="experience_years"
                    value={formData.experience_years}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Hourly Rate (Rs(₹)) *</FormLabel>
                  <FormInput
                    type="number"
                    name="hourly_rate"
                    value={formData.hourly_rate}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Languages *</FormLabel>
                  <FormInput
                    type="text"
                    name="languages"
                    value={formData.languages}
                    onChange={handleInputChange}
                    placeholder="English, Hindi, Tamil, etc. (comma separated)"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Expertise Areas *</FormLabel>
                  <FormInput
                    type="text"
                    name="expertise_areas"
                    value={formData.expertise_areas}
                    onChange={handleInputChange}
                    placeholder="Relationship, Career, Health, etc. (comma separated)"
                    required
                  />
                </FormGroup>
              </FormGrid>
              
              <FormGroup>
                <FormLabel>Specializations</FormLabel>
                <CheckboxGroup>
                  {specializations.map(spec => (
                    <CheckboxLabel key={spec.id}>
                      <CheckboxInput
                        type="checkbox"
                        value={spec.id}
                        checked={formData.specialization_ids.includes(spec.id)}
                        onChange={handleSpecializationChange}
                      />
                      {spec.name}
                    </CheckboxLabel>
                  ))}
                </CheckboxGroup>
              </FormGroup>
            </FormSection>
            
            <FormActions>
              <CancelButton to="/admin/astrologers">Cancel</CancelButton>
              <SubmitButton type="submit" disabled={submitting}>
                <FaSave /> {submitting ? 'Saving...' : 'Save Astrologer'}
              </SubmitButton>
            </FormActions>
          </Form>
        </FormContent>
      </FormCard>
    </PageContainer>
  );
};

export default AstrologerForm;
