import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaSearch, FaCalendarAlt, FaClock, FaRupeeSign, FaEdit, FaTrash } from 'react-icons/fa';

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

const BookingsTable = styled.div`
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

const BookingStatus = styled.div`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: ${props => {
    switch (props.status) {
      case 'PENDING': return '#FFF8E1';
      case 'CONFIRMED': return '#E8F5E9';
      case 'COMPLETED': return '#E3F2FD';
      case 'CANCELLED': return '#FFEBEE';
      default: return '#F5F5F5';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'PENDING': return '#F57C00';
      case 'CONFIRMED': return '#388E3C';
      case 'COMPLETED': return '#1976D2';
      case 'CANCELLED': return '#D32F2F';
      default: return 'var(--text-color)';
    }
  }};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const EditButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: #E3F2FD;
  color: #2196F3;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('date_desc');
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:9000/api/bookings/admin/');
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch bookings');
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, []);
  
  const handleDeleteBooking = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await axios.delete(`http://localhost:9000/api/bookings/admin/${id}/`);
        
        // Remove deleted booking from state
        setBookings(bookings.filter(booking => booking.id !== id));
      } catch (err) {
        console.error('Failed to delete booking:', err);
      }
    }
  };
  
  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    const customerName = `${booking.customer_details.first_name} ${booking.customer_details.last_name}`.toLowerCase();
    const astrologerName = `${booking.astrologer_details.user.first_name} ${booking.astrologer_details.user.last_name}`.toLowerCase();
    const searchValue = searchTerm.toLowerCase();
    
    const matchesSearch = customerName.includes(searchValue) || astrologerName.includes(searchValue);
    const matchesStatus = statusFilter === '' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Sort bookings
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (sortBy === 'date_desc') {
      return new Date(b.booking_date) - new Date(a.booking_date);
    } else if (sortBy === 'date_asc') {
      return new Date(a.booking_date) - new Date(b.booking_date);
    } else if (sortBy === 'price_high') {
      return parseFloat(b.amount) - parseFloat(a.amount);
    } else if (sortBy === 'price_low') {
      return parseFloat(a.amount) - parseFloat(b.amount);
    }
    return 0;
  });
  
  // Pagination
  const bookingsPerPage = 10;
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = sortedBookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(sortedBookings.length / bookingsPerPage);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  if (loading) {
    return <div>Loading bookings...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Manage Bookings</PageTitle>
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
            <FilterSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>Sort By</FilterLabel>
            <FilterSelect
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date_desc">Date: Newest First</option>
              <option value="date_asc">Date: Oldest First</option>
              <option value="price_high">Price: High to Low</option>
              <option value="price_low">Price: Low to High</option>
            </FilterSelect>
          </FilterGroup>
        </FilterRow>
      </FiltersContainer>
      
      <BookingsTable>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Customer</TableHeader>
              <TableHeader>Astrologer</TableHeader>
              <TableHeader>Date & Time</TableHeader>
              <TableHeader>Amount</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {currentBookings.length > 0 ? (
              currentBookings.map(booking => (
                <TableRow key={booking.id}>
                  <TableCell>
                    {booking.customer_details.first_name} {booking.customer_details.last_name}
                  </TableCell>
                  <TableCell>
                    {booking.astrologer_details.user.first_name} {booking.astrologer_details.user.last_name}
                  </TableCell>
                  <TableCell>
                    <div>{new Date(booking.booking_date).toLocaleDateString()}</div>
                    <div style={{ color: 'var(--light-text)', fontSize: '0.9rem' }}>
                      {booking.start_time} - {booking.end_time}
                    </div>
                  </TableCell>
                  <TableCell>${booking.amount}</TableCell>
                  <TableCell>
                    <BookingStatus status={booking.status}>
                      {booking.status}
                    </BookingStatus>
                  </TableCell>
                  <TableCell>
                    <ActionButtons>
                      <EditButton onClick={() => alert('Edit functionality to be implemented')}>
                        <FaEdit />
                      </EditButton>
                      <DeleteButton onClick={() => handleDeleteBooking(booking.id)}>
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
                    <h3>No bookings found</h3>
                    <p>Try adjusting your search criteria</p>
                  </NoResults>
                </TableCell>
              </TableRow>
            )}
          </tbody>
        </Table>
      </BookingsTable>
      
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

export default Bookings;

