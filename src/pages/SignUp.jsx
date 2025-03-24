

import React, { useState } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "../api/api";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ username, email, password });
            toast.success("Registration successful! Please log in.");
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <div className="w-full max-w-md bg-green-50 p-6 rounded-xl shadow-lg border border-green-200">
                <h2 className="text-3xl font-semibold text-center text-green-900 mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <FaUser className="absolute left-3 top-3 text-green-600" />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-3 text-green-600" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                    <div className="relative">
                        <FaLock className="absolute left-3 top-3 text-green-600" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Already have an account? <span onClick={() => navigate("/login")} className="text-green-500 cursor-pointer hover:underline">Log in</span>
                </p>
            </div>
        </div>
    );
};

export default SignUp;