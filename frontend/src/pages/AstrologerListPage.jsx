"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"
import { FaStar, FaSearch } from "react-icons/fa"

const PageContainer = styled.div`
  padding: 2rem 0;
`

const PageHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 1rem;
`

const PageDescription = styled.p`
  max-width: 700px;
  margin: 0 auto;
  color: var(--light-text);
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

const AstrologersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

const AstrologerCard = styled.div`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`

const AstrologerHeader = styled.div`
  height: 120px;
  background: linear-gradient(135deg, #FF9800 0%, #FF5722 100%);
  position: relative;
`

// const AstrologerImage = styled.div`
//   width: 100px;
//   height: 100px;
//   border-radius: 50%;
//   background-size: cover;
//   background-position: center;
//   border: 4px solid white;
//   position: absolute;
//   bottom: -50px;
//   left: 20px;
// `
const AstrologerImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
`;


const AstrologerContent = styled.div`
  padding: 3rem 1.5rem 1.5rem;
`

const AstrologerName = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const AstrologerSpecialty = styled.p`
  color: var(--light-text);
  font-size: 0.9rem;
  margin-bottom: 1rem;
`

const AstrologerRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: var(--secondary-color);
`

const AstrologerInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`

const InfoItem = styled.div`
  text-align: center;
  
  span {
    display: block;
    font-weight: 600;
    color: var(--primary-color);
  }
`

const AstrologerActions = styled.div`
  display: flex;
  gap: 1rem;
`

const ViewProfileButton = styled(Link)`
  flex: 1;
  text-align: center;
  padding: 0.75rem;
  background-color: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
`

const BookNowButton = styled(Link)`
  flex: 1;
  text-align: center;
  padding: 0.75rem;
  background-color: var(--primary-color);
  color: white;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #E64A19;
  }
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
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

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`

const AstrologerListPage = () => {
  const [astrologers, setAstrologers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [sortBy, setSortBy] = useState("rating")
  const [currentPage, setCurrentPage] = useState(1)
  const [specializations, setSpecializations] = useState([])

  useEffect(() => {
    const fetchAstrologers = async () => {
      try {
        setLoading(true)
        const response = await axios.get("http://localhost:9000/api/astrologers/")
        setAstrologers(response.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch astrologers")
        setLoading(false)
      }
    }

    const fetchSpecializations = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/astrologers/specializations/")
        setSpecializations(response.data)
      } catch (err) {
        console.error("Failed to fetch specializations", err)
      }
    }

    fetchAstrologers()
    fetchSpecializations()
  }, [])

  // Filter and sort astrologers
  const filteredAstrologers = astrologers.filter((astrologer) => {
    const matchesSearch =
      astrologer.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      astrologer.user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      astrologer.user.last_name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSpecialization =
      specialization === "" || astrologer.specializations.some((spec) => spec.id.toString() === specialization)

    return matchesSearch && matchesSpecialization
  })

  // Sort astrologers
  const sortedAstrologers = [...filteredAstrologers].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating
    } else if (sortBy === "experience") {
      return b.experience_years - a.experience_years
    } else if (sortBy === "price_low") {
      return a.hourly_rate - b.hourly_rate
    } else if (sortBy === "price_high") {
      return b.hourly_rate - a.hourly_rate
    }
    return 0
  })

  // Pagination
  const astrologersPerPage = 9
  const indexOfLastAstrologer = currentPage * astrologersPerPage
  const indexOfFirstAstrologer = indexOfLastAstrologer - astrologersPerPage
  const currentAstrologers = sortedAstrologers.slice(indexOfFirstAstrologer, indexOfLastAstrologer)
  const totalPages = Math.ceil(sortedAstrologers.length / astrologersPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (loading) {
    return <div>Loading astrologers...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Our Expert Astrologers</PageTitle>
        <PageDescription>
          Connect with our experienced astrologers for personalized guidance on your life's journey. Choose from a
          variety of specializations and book a consultation today.
        </PageDescription>
      </PageHeader>

      <FiltersContainer>
        <FilterRow>
          <SearchContainer>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search astrologers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          <FilterGroup>
            <FilterLabel>Specialization</FilterLabel>
            <FilterSelect value={specialization} onChange={(e) => setSpecialization(e.target.value)}>
              <option value="">All Specializations</option>
              {specializations.map((spec) => (
                <option key={spec.id} value={spec.id}>
                  {spec.name}
                </option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Sort By</FilterLabel>
            <FilterSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="rating">Top Rated</option>
              <option value="experience">Most Experienced</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </FilterSelect>
          </FilterGroup>
        </FilterRow>
      </FiltersContainer>

      {currentAstrologers.length > 0 ? (
        <>
          <AstrologersGrid>
            {currentAstrologers.map((astrologer) => (
              <AstrologerCard key={astrologer.id}>
                <AstrologerHeader>
                  <AstrologerImage src={astrologer.user.profile_picture ? `http://localhost:9000${astrologer.user.profile_picture}` : "/placeholder.svg"} alt="Profile" />
                </AstrologerHeader>
                <AstrologerContent>
                  <AstrologerName>
                    {astrologer.user.first_name} {astrologer.user.last_name}
                  </AstrologerName>
                  <AstrologerSpecialty>
                    {astrologer.specializations.map((spec) => spec.name).join(", ")}
                  </AstrologerSpecialty>
                  <AstrologerRating>
                    <FaStar />
                    {/* <span>{astrologer.rating.toFixed(1)}</span> */}
                    <span>{typeof astrologer.rating === 'number' ? astrologer.rating.toFixed(1) : 'N/A'}</span>

                    <span>({astrologer.reviews.length} reviews)</span>
                  </AstrologerRating>
                  <AstrologerInfo>
                    <InfoItem>
                      <span>Rs(₹){astrologer.hourly_rate}</span>
                      per hour
                    </InfoItem>
                    <InfoItem>
                      <span>{astrologer.experience_years}</span>
                      years exp.
                    </InfoItem>
                    <InfoItem>
                      <span>{astrologer.total_consultations}</span>
                      sessions
                    </InfoItem>
                  </AstrologerInfo>
                  <AstrologerActions>
                    <ViewProfileButton to={`/astrologers/${astrologer.id}`}>View Profile</ViewProfileButton>
                    <BookNowButton to={`/astrologers/${astrologer.id}`}>Book Now</BookNowButton>
                  </AstrologerActions>
                </AstrologerContent>
              </AstrologerCard>
            ))}
          </AstrologersGrid>

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
        <NoResults>
          <h3>No astrologers found</h3>
          <p>Try adjusting your search criteria</p>
        </NoResults>
      )}
    </PageContainer>
  )
}

export default AstrologerListPage

