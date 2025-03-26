"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import styled from "styled-components"
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa"

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

const AddForm = styled.form`
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`

const FormTitle = styled.h2`
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
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const FormGroup = styled.div``

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
    border-color: #3F51B5;
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
    border-color: #3F51B5;
  }
`

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 100%;
  padding: 0 1.5rem;
  background-color: #3F51B5;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #303F9F;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

const SpecializationsTable = styled.div`
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

const SaveButton = styled(EditButton)`
  background-color: #E8F5E9;
  color: #4CAF50;
  
  &:hover {
    background-color: #4CAF50;
    color: white;
  }
`

const CancelButton = styled(DeleteButton)`
  background-color: #FFEBEE;
  color: #F44336;
  
  &:hover {
    background-color: #F44336;
    color: white;
  }
`

const EditableInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #3F51B5;
  border-radius: 4px;
  
  &:focus {
    outline: none;
  }
`

const EditableTextarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #3F51B5;
  border-radius: 4px;
  resize: vertical;
  min-height: 80px;
  
  &:focus {
    outline: none;
  }
`

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
`

const Specializations = () => {
  const [specializations, setSpecializations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })

  // Edit form state
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
  })

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        setLoading(true)
        const response = await axios.get("http://localhost:9000/api/astrologers/specializations/")
        setSpecializations(response.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch specializations")
        setLoading(false)
      }
    }

    fetchSpecializations()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleEditInputChange = (e) => {
    const { name, value } = e.target
    setEditFormData({
      ...editFormData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.description) {
      toast.error("Please fill all fields")
      return
    }

    try {
      const response = await axios.post("http://localhost:9000/api/astrologers/admin/specializations/", formData)

      // Add new specialization to state
      setSpecializations([...specializations, response.data])

      // Reset form
      setFormData({
        name: "",
        description: "",
      })

      toast.success("Specialization added successfully")
    } catch (err) {
      console.error("Failed to add specialization:", err)
      toast.error("Failed to add specialization")
    }
  }

  const handleEdit = (specialization) => {
    setEditingId(specialization.id)
    setEditFormData({
      name: specialization.name,
      description: specialization.description,
    })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
  }

  const handleSaveEdit = async (id) => {
    if (!editFormData.name || !editFormData.description) {
      toast.error("Please fill all fields")
      return
    }

    try {
      const response = await axios.put(
        `http://localhost:9000/api/astrologers/admin/specializations/${id}/`,
        editFormData,
      )

      // Update specialization in state
      setSpecializations(specializations.map((spec) => (spec.id === id ? response.data : spec)))

      setEditingId(null)
      toast.success("Specialization updated successfully")
    } catch (err) {
      console.error("Failed to update specialization:", err)
      toast.error("Failed to update specialization")
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this specialization?")) {
      try {
        await axios.delete(`http://localhost:9000/api/astrologers/admin/specializations/${id}/`)

        // Remove deleted specialization from state
        setSpecializations(specializations.filter((spec) => spec.id !== id))

        toast.success("Specialization deleted successfully")
      } catch (err) {
        console.error("Failed to delete specialization:", err)
        toast.error("Failed to delete specialization")
      }
    }
  }

  if (loading) {
    return <div>Loading specializations...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Manage Specializations</PageTitle>
      </PageHeader>

      <AddForm onSubmit={handleSubmit}>
        <FormTitle>Add New Specialization</FormTitle>
        <FormGrid>
          <div>
            <FormGroup>
              <FormLabel>Name</FormLabel>
              <FormInput
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter specialization name"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Description</FormLabel>
              <FormTextarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter specialization description"
              />
            </FormGroup>
          </div>

          <AddButton type="submit">
            <FaPlus /> Add
          </AddButton>
        </FormGrid>
      </AddForm>

      <SpecializationsTable>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {specializations.length > 0 ? (
              specializations.map((specialization) => (
                <TableRow key={specialization.id}>
                  <TableCell>
                    {editingId === specialization.id ? (
                      <EditableInput
                        type="text"
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditInputChange}
                      />
                    ) : (
                      specialization.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === specialization.id ? (
                      <EditableTextarea
                        name="description"
                        value={editFormData.description}
                        onChange={handleEditInputChange}
                      />
                    ) : (
                      specialization.description
                    )}
                  </TableCell>
                  <TableCell>
                    <ActionButtons>
                      {editingId === specialization.id ? (
                        <>
                          <SaveButton onClick={() => handleSaveEdit(specialization.id)}>
                            <FaSave />
                          </SaveButton>
                          <CancelButton onClick={handleCancelEdit}>
                            <FaTimes />
                          </CancelButton>
                        </>
                      ) : (
                        <>
                          <EditButton onClick={() => handleEdit(specialization)}>
                            <FaEdit />
                          </EditButton>
                          <DeleteButton onClick={() => handleDelete(specialization.id)}>
                            <FaTrash />
                          </DeleteButton>
                        </>
                      )}
                    </ActionButtons>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="3">
                  <NoResults>
                    <h3>No specializations found</h3>
                    <p>Add a new specialization using the form above</p>
                  </NoResults>
                </TableCell>
              </TableRow>
            )}
          </tbody>
        </Table>
      </SpecializationsTable>
    </PageContainer>
  )
}

export default Specializations

