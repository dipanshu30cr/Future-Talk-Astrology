"use client"

import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import styled from "styled-components"
import { FaUserAstronaut, FaLock } from "react-icons/fa"

const LoginContainer = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`

const LoginTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`

const LoginSubtitle = styled.p`
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

const RegisterLink = styled.div`
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

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
})

const LoginPage = () => {
  const { isAuthenticated, login } = useAuth()
  const [loginError, setLoginError] = useState("")

  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoginError("")
    const success = await login(values.username, values.password)

    if (!success) {
      setLoginError("Invalid username or password")
    }

    setSubmitting(false)
  }

  return (
    <LoginContainer>
      <LoginHeader>
        <LoginTitle>Welcome Back</LoginTitle>
        <LoginSubtitle>Sign in to access your account</LoginSubtitle>
      </LoginHeader>

      <Formik initialValues={{ username: "", password: "" }} validationSchema={LoginSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <InputWrapper>
                <InputIcon>
                  <FaUserAstronaut />
                </InputIcon>
                <StyledField type="text" name="username" id="username" placeholder="Enter your username" />
              </InputWrapper>
              <ErrorMessage name="username" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <InputWrapper>
                <InputIcon>
                  <FaLock />
                </InputIcon>
                <StyledField type="password" name="password" id="password" placeholder="Enter your password" />
              </InputWrapper>
              <ErrorMessage name="password" component={ErrorText} />
            </FormGroup>

            {loginError && <ErrorText>{loginError}</ErrorText>}

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign In"}
            </SubmitButton>
          </Form>
        )}
      </Formik>

      <RegisterLink>
        Don't have an account? <Link to="/register">Register now</Link>
      </RegisterLink>
    </LoginContainer>
  )
}

export default LoginPage

