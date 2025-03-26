"use client"

import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import styled from "styled-components"
import { FaUserAstronaut, FaLock, FaEnvelope, FaUser } from "react-icons/fa"
import axios from 'axios';

const RegisterContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`

const RegisterHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`

const RegisterTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`

const RegisterSubtitle = styled.p`
  color: var(--light-text);
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`

const InputWrapper = styled.div`
  position: relative;
`

const StyledField = styled(Field)`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`

const InputIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-50%);
  color: var(--light-text);
`

const ErrorText = styled.div`
  color: var(--error-color);
  font-size: 0.875rem;
  margin-top: 0.5rem;
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
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

const LoginLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  
  a {
    color: var(--primary-color);
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .required("Username is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
})

const RegisterPage = () => {
  const { isAuthenticated, register } = useAuth()
  const [registerError, setRegisterError] = useState("")

  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    setRegisterError("")

    // Remove confirmPassword as it's not needed in the API
    const { confirmPassword, ...userData } = values

    // Set role to CUSTOMER by default
    userData.role = "CUSTOMER"

    const success = await register(userData)

    if (!success) {
      setRegisterError("Username or Email already exists. Please try again.")
    }

    setSubmitting(false)
  }

  // const handleSubmit = async (values, { setSubmitting }) => {
  //   setRegisterError("");
  
  //   const { confirmPassword, ...userData } = values;
  //   userData.role = "CUSTOMER";
  
  //   // Check if the username already exists (make sure to handle this call properly)
  //   try {
  //     const usernameCheckResponse = await axios.get(`http://localhost:9000/api/users/username-exists/${userData.username}`);
  //     if (usernameCheckResponse.data.exists) {
  //       setRegisterError("Username already exists. Please choose a different one.");
  //       return;
  //     }
  //   } catch (error) {
  //     setRegisterError("Username already exists. Please choose a different one.");
  //     return;
  //   }
  
  //   try {
  //     const response = await axios.post("http://localhost:9000/api/users/register/", userData, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  
  //     console.log(response.data);
  //   } catch (error) {
  //     setRegisterError("Registration failed. Please try again.");
  //     console.error("Registration error:", error.response ? error.response.data : error.message);
  //   }
  
  //   setSubmitting(false);
  // };
  
  
  

  return (
    <RegisterContainer>
      <RegisterHeader>
        <RegisterTitle>Create an Account</RegisterTitle>
        <RegisterSubtitle>Join FutureTalk to connect with expert astrologers</RegisterSubtitle>
      </RegisterHeader>

      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          first_name: "",
          last_name: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormRow>
              <FormGroup>
                <Label htmlFor="first_name">First Name</Label>
                <InputWrapper>
                  <InputIcon>
                    <FaUser />
                  </InputIcon>
                  <StyledField type="text" name="first_name" id="first_name" placeholder="Enter your first name" />
                </InputWrapper>
                <ErrorMessage name="first_name" component={ErrorText} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="last_name">Last Name</Label>
                <InputWrapper>
                  <InputIcon>
                    <FaUser />
                  </InputIcon>
                  <StyledField type="text" name="last_name" id="last_name" placeholder="Enter your last name" />
                </InputWrapper>
                <ErrorMessage name="last_name" component={ErrorText} />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <InputWrapper>
                <InputIcon>
                  <FaUserAstronaut />
                </InputIcon>
                <StyledField type="text" name="username" id="username" placeholder="Choose a username" />
              </InputWrapper>
              <ErrorMessage name="username" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <InputWrapper>
                <InputIcon>
                  <FaEnvelope />
                </InputIcon>
                <StyledField type="email" name="email" id="email" placeholder="Enter your email" />
              </InputWrapper>
              <ErrorMessage name="email" component={ErrorText} />
            </FormGroup>

            <FormRow>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <InputWrapper>
                  <InputIcon>
                    <FaLock />
                  </InputIcon>
                  <StyledField type="password" name="password" id="password" placeholder="Create a password" />
                </InputWrapper>
                <ErrorMessage name="password" component={ErrorText} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <InputWrapper>
                  <InputIcon>
                    <FaLock />
                  </InputIcon>
                  <StyledField
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                  />
                </InputWrapper>
                <ErrorMessage name="confirmPassword" component={ErrorText} />
              </FormGroup>
            </FormRow>

            {registerError && <ErrorText>{registerError}</ErrorText>}

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </SubmitButton>
          </Form>
        )}
      </Formik>

      <LoginLink>
        Already have an account? <Link to="/login">Sign in</Link>
      </LoginLink>
    </RegisterContainer>
  )
}

export default RegisterPage

