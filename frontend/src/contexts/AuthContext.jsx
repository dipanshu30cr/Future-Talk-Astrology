"use client"

import { createContext, useState, useContext, useEffect } from "react"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("access_token")

      if (token) {
        try {
          // Check if token is expired
          const decodedToken = jwtDecode(token)
          const currentTime = Date.now() / 1000

          if (decodedToken.exp < currentTime) {
            // Token expired, try to refresh
            await refreshToken()
          } else {
            // Set auth headers
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

            // Get user data
            const userData = JSON.parse(localStorage.getItem("user"))
            setUser(userData)
            setIsAuthenticated(true)
          }
        } catch (error) {
          console.error("Auth initialization error:", error)
          logout()
        }
      }

      setLoading(false)
    }

    initAuth()
  }, [])

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token")

    if (!refreshToken) {
      logout()
      return
    }

    try {
      const response = await axios.post("http://localhost:9000/api/users/token/refresh/", {
        refresh: refreshToken,
      })

      const { access } = response.data

      localStorage.setItem("access_token", access)
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`

      // Get user data
      const userData = JSON.parse(localStorage.getItem("user"))
      setUser(userData)
      setIsAuthenticated(true)

      return access
    } catch (error) {
      console.error("Token refresh error:", error)
      logout()
      return null
    }
  }

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:9000/api/users/login/", {
        username,
        password,
      })

      const { access, refresh, user } = response.data

      localStorage.setItem("access_token", access)
      localStorage.setItem("refresh_token", refresh)
      localStorage.setItem("user", JSON.stringify(user))

      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`

      setUser(user)
      setIsAuthenticated(true)

      toast.success("Login successful!")

      // Redirect based on user role
      if (user.role === "ADMIN") {
        navigate("/admin")
      } else if (user.role === "ASTROLOGER") {
        navigate("/astrologer")
      } else {
        navigate("/customer")
      }

      return true
    } catch (error) {
      console.error("Login error:", error)
      toast.error(error.response?.data?.error || "Login failed. Please try again.")
      return false
    }
  }

  const register = async (userData) => {
    try {
      const response = await axios.post("http://localhost:9000/api/users/register/", userData)

      const { access, refresh, user } = response.data

      localStorage.setItem("access_token", access)
      localStorage.setItem("refresh_token", refresh)
      localStorage.setItem("user", JSON.stringify(user))

      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`

      setUser(user)
      setIsAuthenticated(true)

      toast.success("Registration successful!")
      navigate("/customer")

      return true
    } catch (error) {
      console.error("Registration error:", error)
      toast.error(error.response?.data?.error || "Registration failed. Please try again.")
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("user")

    delete axios.defaults.headers.common["Authorization"]

    setUser(null)
    setIsAuthenticated(false)

    navigate("/login")
  }

  const updateUserProfile = (updatedUser) => {
    const newUserData = { ...user, ...updatedUser }
    setUser(newUserData)
    localStorage.setItem("user", JSON.stringify(newUserData))
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateUserProfile,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

