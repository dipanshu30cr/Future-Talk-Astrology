"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import styled from "styled-components"
import { FaSearch, FaEdit } from "react-icons/fa"

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

const PaymentsTable = styled.div`
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

const PaymentStatus = styled.div`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: ${(props) => {
    switch (props.status) {
      case "PENDING":
        return "#FFF8E1"
      case "COMPLETED":
        return "#E8F5E9"
      case "FAILED":
        return "#FFEBEE"
      case "REFUNDED":
        return "#E3F2FD"
      default:
        return "#F5F5F5"
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "PENDING":
        return "#F57C00"
      case "COMPLETED":
        return "#388E3C"
      case "FAILED":
        return "#D32F2F"
      case "REFUNDED":
        return "#1976D2"
      default:
        return "var(--text-color)"
    }
  }};
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

const Payments = () => {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [sortBy, setSortBy] = useState("date_desc")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true)
        const response = await axios.get("http://localhost:9000/api/bookings/admin/payments/")
        setPayments(response.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch payments")
        setLoading(false)
      }
    }

    fetchPayments()
  }, [])

  const handleUpdatePayment = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:9000/api/bookings/admin/payments/${id}/`, {
        status: newStatus,
      })

      // Update payment status in state
      setPayments(payments.map((payment) => (payment.id === id ? { ...payment, status: newStatus } : payment)))
    } catch (err) {
      console.error("Failed to update payment status:", err)
    }
  }

  // Filter payments
  const filteredPayments = payments.filter((payment) => {
    const customerName =
      `${payment.booking_details.customer_details.first_name} ${payment.booking_details.customer_details.last_name}`.toLowerCase()
    const astrologerName =
      `${payment.booking_details.astrologer_details.user.first_name} ${payment.booking_details.astrologer_details.user.last_name}`.toLowerCase()
    const transactionId = payment.transaction_id ? payment.transaction_id.toLowerCase() : ""
    const searchValue = searchTerm.toLowerCase()

    const matchesSearch =
      customerName.includes(searchValue) || astrologerName.includes(searchValue) || transactionId.includes(searchValue)
    const matchesStatus = statusFilter === "" || payment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Sort payments
  const sortedPayments = [...filteredPayments].sort((a, b) => {
    if (sortBy === "date_desc") {
      return new Date(b.created_at) - new Date(a.created_at)
    } else if (sortBy === "date_asc") {
      return new Date(a.created_at) - new Date(b.created_at)
    } else if (sortBy === "amount_high") {
      return Number.parseFloat(b.amount) - Number.parseFloat(a.amount)
    } else if (sortBy === "amount_low") {
      return Number.parseFloat(a.amount) - Number.parseFloat(b.amount)
    }
    return 0
  })

  // Pagination
  const paymentsPerPage = 10
  const indexOfLastPayment = currentPage * paymentsPerPage
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage
  const currentPayments = sortedPayments.slice(indexOfFirstPayment, indexOfLastPayment)
  const totalPages = Math.ceil(sortedPayments.length / paymentsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (loading) {
    return <div>Loading payments...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Manage Payments</PageTitle>
      </PageHeader>

      <FiltersContainer>
        <FilterRow>
          <SearchContainer>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          <FilterGroup>
            <FilterLabel>Status</FilterLabel>
            <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="COMPLETED">Completed</option>
              <option value="FAILED">Failed</option>
              <option value="REFUNDED">Refunded</option>
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Sort By</FilterLabel>
            <FilterSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date_desc">Date: Newest First</option>
              <option value="date_asc">Date: Oldest First</option>
              <option value="amount_high">Amount: High to Low</option>
              <option value="amount_low">Amount: Low to High</option>
            </FilterSelect>
          </FilterGroup>
        </FilterRow>
      </FiltersContainer>

      <PaymentsTable>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Transaction ID</TableHeader>
              <TableHeader>Customer</TableHeader>
              <TableHeader>Astrologer</TableHeader>
              <TableHeader>Amount</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {currentPayments.length > 0 ? (
              currentPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.transaction_id || "N/A"}</TableCell>
                  <TableCell>
                    {payment.booking_details.customer_details.first_name}{" "}
                    {payment.booking_details.customer_details.last_name}
                  </TableCell>
                  <TableCell>
                    {payment.booking_details.astrologer_details.user.first_name}{" "}
                    {payment.booking_details.astrologer_details.user.last_name}
                  </TableCell>
                  <TableCell>${payment.amount}</TableCell>
                  <TableCell>{new Date(payment.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <PaymentStatus status={payment.status}>{payment.status}</PaymentStatus>
                  </TableCell>
                  <TableCell>
                    <ActionButtons>
                      <EditButton
                        onClick={() => {
                          const newStatus = prompt(
                            "Enter new status (PENDING, COMPLETED, FAILED, REFUNDED):",
                            payment.status,
                          )
                          if (newStatus && ["PENDING", "COMPLETED", "FAILED", "REFUNDED"].includes(newStatus)) {
                            handleUpdatePayment(payment.id, newStatus)
                          }
                        }}
                      >
                        <FaEdit />
                      </EditButton>
                    </ActionButtons>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="7">
                  <NoResults>
                    <h3>No payments found</h3>
                    <p>Try adjusting your search criteria</p>
                  </NoResults>
                </TableCell>
              </TableRow>
            )}
          </tbody>
        </Table>
      </PaymentsTable>

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

export default Payments

