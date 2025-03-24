import React from "react";
import FriendList from "../pages/FriendList";
import FriendRequests from "../pages/FriendRequests";
import FriendRecommendations from "../components/FriendRecommendations";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      
      <div className="w-full max-w-5xl">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Friend List Section - Soft Blue */}
          <div className="bg-blue-50 shadow-lg p-6 rounded-xl border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Your Friends</h3>
            <FriendList />
          </div>

          {/* Friend Requests Section - Soft Green */}
          <div className="bg-green-50 shadow-lg p-6 rounded-xl border border-green-200">
            <h3 className="text-xl font-semibold text-green-900 mb-4">Friend Requests</h3>
            <FriendRequests />
          </div>

          {/* Friend Recommendations Section - Soft Purple */}
          <div className="bg-purple-50 shadow-lg p-6 md:col-span-2 rounded-xl border border-purple-200">
            <h3 className="text-xl font-semibold text-purple-900 mb-4">Friend Recommendations</h3>
            <FriendRecommendations />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
