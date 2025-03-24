import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import UpdateProfile from "./pages/UpdateProfile";

const App = () => (
    <AuthProvider>
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/update-profile" element={<UpdateProfile />} />
            </Routes>
        </Router>
    </AuthProvider>
);

export default App;
