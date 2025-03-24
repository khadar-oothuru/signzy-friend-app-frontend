import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { updateProfile } from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaEnvelope, FaSave } from "react-icons/fa";

const UpdateProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateProfile(user._id, { username, email });
      setUser(updatedUser.data);
      localStorage.setItem("user", JSON.stringify(updatedUser.data));
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="bg-blue-50 p-8 shadow-lg rounded-xl border border-blue-200 w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-6">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-blue-900 font-medium mb-1 flex items-center">
              <FaUser className="mr-2" /> Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            />
          </div>
          <div>
            <label className="block text-blue-900 font-medium mb-1 flex items-center">
              <FaEnvelope className="mr-2" /> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 text-lg font-semibold hover:bg-blue-700 transition"
          >
            <FaSave /> Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;