import React, { useState, useEffect, useContext } from "react";
import { getFriendRequests, acceptFriendRequest } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUserCheck, FaSpinner } from "react-icons/fa";

const FriendRequests = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?._id) {
            getFriendRequests(user._id)
                .then((res) => setRequests(res.data))
                .catch((err) => {
                    console.error("Error fetching requests:", err);
                    toast.error("Failed to load friend requests.");
                })
                .finally(() => setLoading(false));
        }
    }, [user?._id]);

    // Accept Friend Request with Toast Notification
    const handleAccept = async (friendId) => {
        try {
            await acceptFriendRequest(user._id, friendId);
            setRequests(requests.filter((req) => req._id !== friendId));
            toast.success("Friend request accepted successfully!");
        } catch (error) {
            console.error("Error accepting request:", error);
            toast.error("Error accepting friend request. Please try again.");
        }
    };

    return loading ? (
        <p className="text-gray-500 text-center flex items-center justify-center">
            <FaSpinner className="animate-spin mr-2" /> Loading friend requests...
        </p>
    ) : requests.length > 0 ? (
        <ul className="space-y-3">
            {requests.map((req) => (
                <li key={req._id} className="flex justify-between items-center p-3 border border-gray-300 rounded-lg">
                    <span className="text-gray-700 font-medium">{req.username}</span>
                    <button
                        onClick={() => handleAccept(req._id)}
                        className="text-green-600 hover:text-green-800 transition flex items-center"
                    >
                        <FaUserCheck className="mr-2" /> Accept
                    </button>
                </li>
            ))}
        </ul>
    ) : (
        <p className="text-gray-500 text-center">No pending friend requests.</p>
    );
};

export default FriendRequests;
