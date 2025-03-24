import React, { useState, useEffect, useContext } from "react";
import { getFriendRecommendations, sendFriendRequest } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { MdPersonAdd } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FriendRecommendations = () => {
    const { user } = useContext(AuthContext);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sendingRequest, setSendingRequest] = useState(null);

    useEffect(() => {
        if (user?._id) {
            getFriendRecommendations(user._id)
                .then((res) => setRecommendations(res.data))
                .catch((err) => {
                    console.error("Error fetching recommendations:", err);
                    toast.error("Failed to fetch recommendations");
                })
                .finally(() => setLoading(false));
        }
    }, [user?._id]);

    const handleSendRequest = async (receiverId) => {
        setSendingRequest(receiverId);
        try {
            await sendFriendRequest(user._id, receiverId);
            setRecommendations(recommendations.filter((r) => r._id !== receiverId));
            toast.success("Friend request sent successfully!");
        } catch (error) {
            console.error("Error sending request:", error);
            toast.error("Failed to send friend request");
        } finally {
            setSendingRequest(null);
        }
    };

    return loading ? (
        <p className="text-gray-500 text-center flex items-center justify-center py-4">
            <span className="loading loading-spinner loading-md"></span> Loading recommendations...
        </p>
    ) : recommendations.length > 0 ? (
        <ul className="space-y-3">
            {recommendations.map((rec) => (
                <li 
                    key={rec._id} 
                    className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                    <span className="font-medium text-gray-800">{rec.username}</span>
                    <button
                        onClick={() => handleSendRequest(rec._id)}
                        disabled={sendingRequest === rec._id}
                        className={`relative flex items-center gap-2 px-5 py-2 rounded-lg text-white font-semibold transition-all duration-300 ${
                            sendingRequest === rec._id 
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-md hover:shadow-lg transform hover:scale-105"
                        }`}
                    >
                        {sendingRequest === rec._id ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                            <MdPersonAdd className="text-xl" />
                        )}
                        {sendingRequest === rec._id ? "Sending..." : "Add Friend"}
                    </button>
                </li>
            ))}
        </ul>
    ) : (
        <p className="text-center text-gray-500">No recommendations available.</p>
    );
};

export default FriendRecommendations;
