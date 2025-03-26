"use client"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"

// Layouts
import MainLayout from "./layouts/MainLayout"
import AdminLayout from "./layouts/AdminLayout"
import AstrologerLayout from "./layouts/AstrologerLayout"

// Public Pages
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import AstrologerListPage from "./pages/AstrologerListPage"
import AstrologerDetailPage from "./pages/AstrologerDetailPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"

// Customer Pages
import CustomerDashboard from "./pages/customer/Dashboard"
import CustomerBookings from "./pages/customer/Bookings"
import CustomerBookingDetail from "./pages/customer/BookingDetail"
import CustomerProfile from "./pages/customer/Profile"
import CustomerChat from "./pages/customer/Chat"

// Astrologer Pages
import AstrologerDashboard from "./pages/astrologer/Dashboard"
import AstrologerBookings from "./pages/astrologer/Bookings"
import AstrologerBookingDetail from "./pages/astrologer/BookingDetail"
import AstrologerProfile from "./pages/astrologer/Profile"
import AstrologerAvailability from "./pages/astrologer/Availability"
import AstrologerChat from "./pages/astrologer/Chat"

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard"
import AdminAstrologers from "./pages/admin/Astrologers"
import AdminAstrologerForm from "./pages/admin/AstrologerForm"
import AdminCustomers from "./pages/admin/Customers"
import AdminBookings from "./pages/admin/Bookings"
import AdminPayments from "./pages/admin/Payments"
import AdminSpecializations from "./pages/admin/Specializations"

// import { ThemeProvider } from "./components/common/ThemeContext";
import { ThemeProvider } from "./components/common/ThemeContext";


// Route Guards
const PrivateRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />
  }

  return children
}

function App() {
  return (
    <ThemeProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="astrologers" element={<AstrologerListPage />} />
          <Route path="astrologers/:id" element={<AstrologerDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        {/* Customer Routes */}
        <Route
          path="/customer"
          element={
            <PrivateRoute allowedRoles={["CUSTOMER", "ADMIN"]}>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<CustomerDashboard />} />
          <Route path="bookings" element={<CustomerBookings />} />
          <Route path="bookings/:id" element={<CustomerBookingDetail />} />
          <Route path="profile" element={<CustomerProfile />} />
          <Route path="chat/:bookingId" element={<CustomerChat />} />
        </Route>

        {/* Astrologer Routes */}
        <Route
          path="/astrologer"
          element={
            <PrivateRoute allowedRoles={["ASTROLOGER", "ADMIN"]}>
              <AstrologerLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AstrologerDashboard />} />
          <Route path="bookings" element={<AstrologerBookings />} />
          <Route path="bookings/:id" element={<AstrologerBookingDetail />} />
          <Route path="profile" element={<AstrologerProfile />} />
          <Route path="availability" element={<AstrologerAvailability />} />
          <Route path="chat/:bookingId" element={<AstrologerChat />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="astrologers" element={<AdminAstrologers />} />
          <Route path="astrologers/add" element={<AdminAstrologerForm />} />
          <Route path="astrologers/edit/:id" element={<AdminAstrologerForm />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="specializations" element={<AdminSpecializations />} />
        </Route>

        {/* Catch all - 404 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App

