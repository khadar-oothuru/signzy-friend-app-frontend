import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { updateProfile } from "../api/api";

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
      alert("Profile updated successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Update Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
