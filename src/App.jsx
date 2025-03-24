import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router"; // Updated to 'react-router-dom'
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import UpdateProfile from "./pages/UpdateProfile";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";

// Private Route Component
const PrivateRoute = ({ element }) => {
    const { user } = useContext(AuthContext);
    return user ? element : <Navigate to="/login" />;
};

// Redirect if already logged in
const AuthRoute = ({ element }) => {
    const { user } = useContext(AuthContext);
    return user ? <Navigate to="/" /> : element;
};

const App = () => (
    <AuthProvider>
        <Router>
            <Navbar />
            <Routes>
                {/* Use AuthRoute for Login and SignUp */}
                <Route path="/login" element={<AuthRoute element={<Login />} />} />
                <Route path="/signup" element={<AuthRoute element={<SignUp />} />} />

                {/* Private Routes */}
                <Route path="/" element={<PrivateRoute element={<Home />} />} />
                <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                <Route path="/update-profile" element={<PrivateRoute element={<UpdateProfile />} />} />
            </Routes>
            <Footer />
        </Router>
    </AuthProvider>
);

export default App;
