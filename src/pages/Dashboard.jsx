import React from "react";
import FriendList from "../pages/FriendList";
import FriendRequests from "../pages/FriendRequests";
import FriendRecommendations from "../components/FriendRecommendations";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Friends</h3>
          <FriendList />
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Requests</h3>
          <FriendRequests />
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Friend Recommendations
          </h3>
          <FriendRecommendations />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
