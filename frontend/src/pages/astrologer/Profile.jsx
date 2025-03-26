"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import axios from "axios"
import { toast } from "react-toastify"
import styled from "styled-components"
import { FaCamera } from "react-icons/fa"

const ProfileContainer = styled.div`
  padding: 1rem;
`

const PageTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
`

const ProfileCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`

const ProfileHeader = styled.div`
  background: linear-gradient(135deg, #673AB7 0%, #9C27B0 100%);
  color: white;
  padding: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProfileImageContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`

// const ProfileImage = styled.div`
//   width: 120px;
//   height: 120px;
//   border-radius: 50%;
//   background-size: cover;
//   background-position: center;
//   border: 4px solid white;
// `

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
`;


const UploadButton = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: white;
  color: var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  
  input {
    display: none;
  }
`

const ProfileName = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const ProfileUsername = styled.p`
  font-size: 1rem;
  opacity: 0.9;
`

const ProfileContent = styled.div`
  padding: 2rem;
`

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 2rem;
`

const Tab = styled.button`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 2px solid ${(props) => (props.active ? "var(--accent-color)" : "transparent")};
  color: ${(props) => (props.active ? "var(--accent-color)" : "var(--text-color)")};
  font-weight: ${(props) => (props.active ? "600" : "400")};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--accent-color);
  }
`

const TabContent = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
`

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`

const SubmitButton = styled.button`
  grid-column: 1 / -1;
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
`

const PasswordForm = styled.form`
  max-width: 500px;
`

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
`

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`

const CheckboxInput = styled.input`
  cursor: pointer;
`

const Profile = () => {
  const { user, updateUserProfile } = useAuth()
  const [activeTab, setActiveTab] = useState("personal")
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState(null)
  const [specializations, setSpecializations] = useState([])

  // Personal info form state
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  })

  // Profile form state
  const [profileData, setProfileData] = useState({
    bio: "",
    experience_years: 0,
    hourly_rate: 0,
    languages: "",
    expertise_areas: "",
    specialization_ids: [],
  })

  // Password form state
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  })

  // Profile picture state
  const [profilePicture, setProfilePicture] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch astrologer profile
        const profileResponse = await axios.get("http://localhost:9000/api/astrologers/")
        const myProfile = profileResponse.data.find((profile) => profile.user.id === user.id)
        setProfile(myProfile)

        // Fetch specializations
        const specializationsResponse = await axios.get("http://localhost:9000/api/astrologers/specializations/")
        setSpecializations(specializationsResponse.data)

        // Set form data
        if (user) {
          setFormData({
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            email: user.email || "",
            phone_number: user.phone_number || "",
          })
        }

        // Set profile data
        if (myProfile) {
          setProfileData({
            bio: myProfile.bio || "",
            experience_years: myProfile.experience_years || 0,
            hourly_rate: myProfile.hourly_rate || 0,
            languages: myProfile.languages || "",
            expertise_areas: myProfile.expertise_areas || "",
            specialization_ids: myProfile.specializations.map((spec) => spec.id) || [],
          })
        }

        setLoading(false)
      } catch (error) {
        console.error("Error fetching profile data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target
    setProfileData({
      ...profileData,
      [name]: value,
    })
  }

  const handleSpecializationChange = (e) => {
    const specId = Number.parseInt(e.target.value)
    const isChecked = e.target.checked

    if (isChecked) {
      setProfileData({
        ...profileData,
        specialization_ids: [...profileData.specialization_ids, specId],
      })
    } else {
      setProfileData({
        ...profileData,
        specialization_ids: profileData.specialization_ids.filter((id) => id !== specId),
      })
    }
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData({
      ...passwordData,
      [name]: value,
    })
  }

  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0])
    }
  }

  const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const response = await axios.put(`http://localhost:9000/api/users/${user.id}/`, formData)

      // Update user in context
      updateUserProfile(response.data)

      toast.success("Personal information updated successfully")
    } catch (error) {
      console.error("Error updating personal information:", error)
      toast.error("Failed to update personal information")
    } finally {
      setLoading(false)
    }
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const response = await axios.put(`http://localhost:9000/api/astrologers/admin/${profile.id}/`, {
        ...profileData,
        user_id: user.id,
      })

      setProfile(response.data)
      toast.success("Profile updated successfully")
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()

    if (passwordData.new_password !== passwordData.confirm_password) {
      toast.error("Passwords do not match")
      return
    }

    try {
      setLoading(true)
      await axios.post(`http://localhost:9000/api/users/change-password/`, {
        old_password: passwordData.current_password,
        new_password: passwordData.new_password,
      })

      // Reset form
      setPasswordData({
        current_password: "",
        new_password: "",
        confirm_password: "",
      })

      toast.success("Password changed successfully")
    } catch (error) {
      console.error("Error changing password:", error)
      toast.error("Failed to change password")
    } finally {
      setLoading(false)
    }
  }

  const handleProfilePictureSubmit = async () => {
    if (!profilePicture) return

    const formData = new FormData()
    formData.append("profile_picture", profilePicture)

    try {
      setLoading(true)
      const response = await axios.put(`http://localhost:9000/api/users/${user.id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      // Update user in context
      updateUserProfile(response.data)

      toast.success("Profile picture updated successfully")
    } catch (error) {
      console.error("Error updating profile picture:", error)
      toast.error("Failed to update profile picture")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (profilePicture) {
      handleProfilePictureSubmit()
    }
  }, [profilePicture])

  if (loading && !profile) {
    return <div>Loading profile...</div>
  }

  return (
    <ProfileContainer>
      <PageTitle>My Profile</PageTitle>

      <ProfileCard>
        <ProfileHeader>
          <ProfileImageContainer>
            {/* <ProfileImage src={user.profile_picture} /> */}
            <ProfileImage src={user.profile_picture ? `http://localhost:9000${user.profile_picture}` : "/placeholder.svg"} alt="Profile" />

            <UploadButton>
              <FaCamera />
              <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
            </UploadButton>
          </ProfileImageContainer>
          <ProfileName>
            {user.first_name} {user.last_name}
          </ProfileName>
          <ProfileUsername>@{user.username}</ProfileUsername>
        </ProfileHeader>

        <ProfileContent>
          <TabsContainer>
            <Tab active={activeTab === "personal"} onClick={() => setActiveTab("personal")}>
              Personal Information
            </Tab>
            <Tab active={activeTab === "profile"} onClick={() => setActiveTab("profile")}>
              Astrologer Profile
            </Tab>
            <Tab active={activeTab === "password"} onClick={() => setActiveTab("password")}>
              Change Password
            </Tab>
          </TabsContainer>

          <TabContent active={activeTab === "personal"}>
            <Form onSubmit={handlePersonalInfoSubmit}>
              <FormGroup>
                <FormLabel>First Name</FormLabel>
                <FormInput type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} />
              </FormGroup>

              <FormGroup>
                <FormLabel>Last Name</FormLabel>
                <FormInput type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} />
              </FormGroup>

              <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormInput type="email" name="email" value={formData.email} onChange={handleInputChange} disabled />
              </FormGroup>

              <FormGroup>
                <FormLabel>Phone Number</FormLabel>
                <FormInput type="tel" name="phone_number" value={formData.phone_number} onChange={handleInputChange} />
              </FormGroup>

              <SubmitButton type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </SubmitButton>
            </Form>
          </TabContent>

          <TabContent active={activeTab === "profile"}>
            <Form onSubmit={handleProfileSubmit}>
              <FormGroup style={{ gridColumn: "1 / -1" }}>
                <FormLabel>Bio</FormLabel>
                <FormTextarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleProfileInputChange}
                  placeholder="Tell customers about yourself and your expertise..."
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Experience (Years)</FormLabel>
                <FormInput
                  type="number"
                  name="experience_years"
                  value={profileData.experience_years}
                  onChange={handleProfileInputChange}
                  min="0"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Hourly Rate (Rs(₹))</FormLabel>
                <FormInput
                  type="number"
                  name="hourly_rate"
                  value={profileData.hourly_rate}
                  onChange={handleProfileInputChange}
                  min="0"
                  step="0.01"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Languages</FormLabel>
                <FormInput
                  type="text"
                  name="languages"
                  value={profileData.languages}
                  onChange={handleProfileInputChange}
                  placeholder="English, Hindi, Tamil, etc. (comma separated)"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Expertise Areas</FormLabel>
                <FormInput
                  type="text"
                  name="expertise_areas"
                  value={profileData.expertise_areas}
                  onChange={handleProfileInputChange}
                  placeholder="Relationship, Career, Health, etc. (comma separated)"
                />
              </FormGroup>

              <FormGroup style={{ gridColumn: "1 / -1" }}>
                <FormLabel>Specializations</FormLabel>
                <CheckboxGroup>
                  {specializations.map((spec) => (
                    <CheckboxLabel key={spec.id}>
                      <CheckboxInput
                        type="checkbox"
                        value={spec.id}
                        checked={profileData.specialization_ids.includes(spec.id)}
                        onChange={handleSpecializationChange}
                      />
                      {spec.name}
                    </CheckboxLabel>
                  ))}
                </CheckboxGroup>
              </FormGroup>

              {/* <SubmitButton type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Profile"}
              </SubmitButton> */}
            </Form>
          </TabContent>

          <TabContent active={activeTab === "password"}>
            <PasswordForm onSubmit={handlePasswordSubmit}>
              <FormGroup>
                <FormLabel>Current Password</FormLabel>
                <FormInput
                  type="password"
                  name="current_password"
                  value={passwordData.current_password}
                  onChange={handlePasswordChange}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>New Password</FormLabel>
                <FormInput
                  type="password"
                  name="new_password"
                  value={passwordData.new_password}
                  onChange={handlePasswordChange}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Confirm New Password</FormLabel>
                <FormInput
                  type="password"
                  name="confirm_password"
                  value={passwordData.confirm_password}
                  onChange={handlePasswordChange}
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={loading}>
                {loading ? "Changing..." : "Change Password"}
              </SubmitButton>
            </PasswordForm>
          </TabContent>
        </ProfileContent>
      </ProfileCard>
    </ProfileContainer>
  )
}

export default Profile

