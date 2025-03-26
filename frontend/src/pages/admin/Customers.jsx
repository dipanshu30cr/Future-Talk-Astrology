"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import styled from "styled-components"
import { FaSearch, FaEdit, FaTrash, FaUsers } from "react-icons/fa"

const PageContainer = styled.div`
  padding: 1rem;
`

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
`

const PageTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
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
    border-color: #3F51B5;
  }
`

const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-50%);
  color: var(--light-text);
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
    border-color: #3F51B5;
  }
`

const CustomersTable = styled.div`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const TableHead = styled.thead`
  background-color: #F5F5F5;
`

const TableRow = styled.tr`
  border-bottom: 1px solid var(--border-color);
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #F5F5F5;
  }
`

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: var(--light-text);
`

const TableCell = styled.td`
  padding: 1rem;
`

const CustomerProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const CustomerImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-image: url('/placeholder.svg?height=40&width=40');
  background-size: cover;
  background-position: center;
`

const CustomerInfo = styled.div``

const CustomerName = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`

const CustomerEmail = styled.div`
  font-size: 0.9rem;
  color: var(--light-text);
`

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`

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
`

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
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => (props.active ? "#3F51B5" : "var(--border-color)")};
  background-color: ${(props) => (props.active ? "#3F51B5" : "white")};
  color: ${(props) => (props.active ? "white" : "var(--text-color)")};
  border-radius: 4px;
  margin: 0 0.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #3F51B5;
    color: ${(props) => (props.active ? "white" : "#3F51B5")};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
`

const Customers = () => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true)
        const response = await axios.get("http://localhost:9000/api/users/")
        const customerUsers = response.data.filter((user) => user.role === "CUSTOMER")
        setCustomers(customerUsers)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch customers")
        setLoading(false)
      }
    }

    fetchCustomers()
  }, [])

  const handleDeleteCustomer = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`http://localhost:9000/api/users/${id}/`)

        // Remove deleted customer from state
        setCustomers(customers.filter((customer) => customer.id !== id))
      } catch (err) {
        console.error("Failed to delete customer:", err)
      }
    }
  }

  // Filter customers
  const filteredCustomers = customers.filter((customer) => {
    const fullName = `${customer.first_name} ${customer.last_name}`.toLowerCase()
    const email = customer.email.toLowerCase()
    const searchValue = searchTerm.toLowerCase()

    return fullName.includes(searchValue) || email.includes(searchValue)
  })

  // Sort customers
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (sortBy === "name") {
      return `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`)
    } else if (sortBy === "email") {
      return a.email.localeCompare(b.email)
    } else if (sortBy === "date") {
      return new Date(b.created_at) - new Date(a.created_at)
    }
    return 0
  })

  // Pagination
  const customersPerPage = 10
  const indexOfLastCustomer = currentPage * customersPerPage
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage
  const currentCustomers = sortedCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer)
  const totalPages = Math.ceil(sortedCustomers.length / customersPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (loading) {
    return <div>Loading customers...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Manage Customers</PageTitle>
      </PageHeader>

      <FiltersContainer>
        <FilterRow>
          <SearchContainer>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          <FilterGroup>
            <FilterLabel>Sort By</FilterLabel>
            <FilterSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="date">Registration Date</option>
            </FilterSelect>
          </FilterGroup>
        </FilterRow>
      </FiltersContainer>

      <CustomersTable>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Customer</TableHeader>
              <TableHeader>Phone</TableHeader>
              <TableHeader>Birth Details</TableHeader>
              <TableHeader>Registration Date</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {currentCustomers.length > 0 ? (
              currentCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <CustomerProfile>
                      <CustomerImage />
                      <CustomerInfo>
                        <CustomerName>
                          {customer.first_name} {customer.last_name}
                        </CustomerName>
                        <CustomerEmail>{customer.email}</CustomerEmail>
                      </CustomerInfo>
                    </CustomerProfile>
                  </TableCell>
                  <TableCell>{customer.phone_number || "N/A"}</TableCell>
                  <TableCell>
                    {customer.birth_date ? (
                      <div>
                        <div>{new Date(customer.birth_date).toLocaleDateString()}</div>
                        {customer.birth_time && <div>{customer.birth_time}</div>}
                        {customer.birth_place && <div>{customer.birth_place}</div>}
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>{new Date(customer.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <ActionButtons>
                      <EditButton onClick={() => alert("Edit functionality to be implemented")}>
                        <FaEdit />
                      </EditButton>
                      <DeleteButton onClick={() => handleDeleteCustomer(customer.id)}>
                        <FaTrash />
                      </DeleteButton>
                    </ActionButtons>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5">
                  <NoResults>
                    <FaUsers size={40} style={{ marginBottom: "1rem", opacity: 0.5 }} />
                    <h3>No customers found</h3>
                    <p>Try adjusting your search criteria</p>
                  </NoResults>
                </TableCell>
              </TableRow>
            )}
          </tbody>
        </Table>
      </CustomersTable>

      {totalPages > 1 && (
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
      )}
    </PageContainer>
  )
}

export default Customers

