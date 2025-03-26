import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaStar, FaUserAstronaut } from 'react-icons/fa';

const PageContainer = styled.div`
  padding: 1rem;
`;

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
`;

const PageTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
`;

const AddButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #3F51B5;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #303F9F;
  }
`;

const FiltersContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 2;
  min-width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: #3F51B5;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-50%);
  color: var(--light-text);
`;

const FilterGroup = styled.div`
  flex: 1;
  min-width: 200px;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #3F51B5;
  }
`;

const AstrologersTable = styled.div`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #F5F5F5;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid var(--border-color);
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #F5F5F5;
  }
`;

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: var(--light-text);
`;

const TableCell = styled.td`
  padding: 1rem;
`;

const AstrologerProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// const AstrologerImage = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-image: url('/placeholder.svg?height=40&width=40');
//   background-size: cover;
//   background-position: center;
// `;

const AstrologerImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
`;



const AstrologerInfo = styled.div``;

const AstrologerName = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const AstrologerEmail = styled.div`
  font-size: 0.9rem;
  color: var(--light-text);
`;

const RatingDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  svg {
    color: #FFC107;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const EditButton = styled(Link)`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: #E3F2FD;
  color: #2196F3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #2196F3;
    color: white;
  }
`;

const DeleteButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: #FFEBEE;
  color: #F44336;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #F44336;
    color: white;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.active ? '#3F51B5' : 'var(--border-color)'};
  background-color: ${props => props.active ? '#3F51B5' : 'white'};
  color: ${props => props.active ? 'white' : 'var(--text-color)'};
  border-radius: 4px;
  margin: 0 0.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #3F51B5;
    color: ${props => props.active ? 'white' : '#3F51B5'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
`;

const Astrologers = () => {
  const [astrologers, setAstrologers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    const fetchAstrologers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:9000/api/astrologers/admin/');
        setAstrologers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch astrologers');
        setLoading(false);
      }
    };
    
    fetchAstrologers();
  }, []);
  
  const handleDeleteAstrologer = async (id) => {
    if (window.confirm('Are you sure you want to delete this astrologer?')) {
      try {
        await axios.delete(`http://localhost:9000/api/astrologers/admin/${id}/`);
        
        // Remove deleted astrologer from state
        setAstrologers(astrologers.filter(astrologer => astrologer.id !== id));
      } catch (err) {
        console.error('Failed to delete astrologer:', err);
      }
    }
  };
  
  // Filter astrologers
  const filteredAstrologers = astrologers.filter(astrologer => {
    const fullName = `${astrologer.user.first_name} ${astrologer.user.last_name}`.toLowerCase();
    const email = astrologer.user.email.toLowerCase();
    const searchValue = searchTerm.toLowerCase();
    
    return fullName.includes(searchValue) || email.includes(searchValue);
  });
  
  // Sort astrologers
  const sortedAstrologers = [...filteredAstrologers].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else if (sortBy === 'experience') {
      return b.experience_years - a.experience_years;
    } else if (sortBy === 'bookings') {
      return b.total_consultations - a.total_consultations;
    } else if (sortBy === 'name') {
      return `${a.user.first_name} ${a.user.last_name}`.localeCompare(`${b.user.first_name} ${b.user.last_name}`);
    }
    return 0;
  });
  
  // Pagination
  const astrologersPerPage = 10;
  const indexOfLastAstrologer = currentPage * astrologersPerPage;
  const indexOfFirstAstrologer = indexOfLastAstrologer - astrologersPerPage;
  const currentAstrologers = sortedAstrologers.slice(indexOfFirstAstrologer, indexOfLastAstrologer);
  const totalPages = Math.ceil(sortedAstrologers.length / astrologersPerPage);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  if (loading) {
    return <div>Loading astrologers...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Manage Astrologers</PageTitle>
        <AddButton to="/admin/astrologers/add">
          <FaPlus /> Add Astrologer
        </AddButton>
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
            <FilterLabel>Sort By</FilterLabel>
            <FilterSelect
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">Rating</option>
              <option value="experience">Experience</option>
              <option value="bookings">Total Bookings</option>
              <option value="name">Name</option>
            </FilterSelect>
          </FilterGroup>
        </FilterRow>
      </FiltersContainer>
      
      <AstrologersTable>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Astrologer</TableHeader>
              <TableHeader>Experience</TableHeader>
              <TableHeader>Hourly Rate</TableHeader>
              <TableHeader>Rating</TableHeader>
              <TableHeader>Bookings</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {currentAstrologers.length > 0 ? (
              currentAstrologers.map(astrologer => (
                <TableRow key={astrologer.id}>
                  <TableCell>
                    <AstrologerProfile>
                      <AstrologerImage src={astrologer.user.profile_picture ? `http://localhost:9000${astrologer.user.profile_picture}` : "/placeholder.svg"} alt="Profile" />
                      <AstrologerInfo>
                        <AstrologerName>
                          {astrologer.user.first_name} {astrologer.user.last_name}
                        </AstrologerName>
                        <AstrologerEmail>{astrologer.user.email}</AstrologerEmail>
                      </AstrologerInfo>
                    </AstrologerProfile>
                  </TableCell>
                  <TableCell>{astrologer.experience_years} years</TableCell>
                  <TableCell>Rs(₹){astrologer.hourly_rate}/hr</TableCell>
                  <TableCell>
                    <RatingDisplay>
                      <FaStar />
                      <span>{typeof astrologer.rating === 'number' ? astrologer.rating.toFixed(1) : 'N/A'}</span>

                    </RatingDisplay>
                  </TableCell>
                  <TableCell>{astrologer.total_consultations}</TableCell>
                  <TableCell>
                    <ActionButtons>
                      <EditButton to={`/admin/astrologers/edit/${astrologer.id}`}>
                        <FaEdit />
                      </EditButton>
                      <DeleteButton onClick={() => handleDeleteAstrologer(astrologer.id)}>
                        <FaTrash />
                      </DeleteButton>
                    </ActionButtons>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6">
                  <NoResults>
                    <FaUserAstronaut size={40} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                    <h3>No astrologers found</h3>
                    <p>Try adjusting your search criteria</p>
                  </NoResults>
                </TableCell>
              </TableRow>
            )}
          </tbody>
        </Table>
      </AstrologersTable>
      
      {totalPages > 1 && (
        <Pagination>
          <PageButton
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </PageButton>
          
          {[...Array(totalPages).keys()].map(number => (
            <PageButton
              key={number + 1}
              active={currentPage === number + 1}
              onClick={() => paginate(number + 1)}
            >
              {number + 1}
            </PageButton>
          ))}
          
          <PageButton
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </PageButton>
        </Pagination>
      )}
    </PageContainer>
  );
};

export default Astrologers;
