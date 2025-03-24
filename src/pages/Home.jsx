import React, { useState, useEffect, useContext } from "react";
import { getFriendRecommendations, sendFriendRequest } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { MdPersonAdd, MdSearch } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
    const { user } = useContext(AuthContext);
    const [recommendations, setRecommendations] = useState([]);
    const [filteredRecommendations, setFilteredRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sendingRequest, setSendingRequest] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // State to store search query

    useEffect(() => {
        if (user?._id) {
            getFriendRecommendations(user._id)
                .then((res) => {
                    setRecommendations(res.data);
                    setFilteredRecommendations(res.data); // Initialize filtered recommendations
                })
                .catch((err) => {
                    console.error("Error fetching recommendations:", err);
                    toast.error("Failed to fetch recommendations");
                })
                .finally(() => setLoading(false));
        }
    }, [user?._id]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = recommendations.filter((rec) =>
            rec.username.toLowerCase().includes(query.toLowerCase().trim())
        );
        setFilteredRecommendations(filtered);
    };

    const handleSendRequest = async (receiverId) => {
        setSendingRequest(receiverId);
        try {
            await sendFriendRequest(user._id, receiverId);
            setFilteredRecommendations(filteredRecommendations.filter((r) => r._id !== receiverId));
            toast.success("Friend request sent successfully!");
        } catch (error) {
            console.error("Error sending request:", error);
            toast.error("Failed to send friend request");
        } finally {
            setSendingRequest(null);
        }
    };

    return (
        <div className="space-y-6 px-4 mb-[100px] pt-20"> {/* Added pt-20 to add space for the navbar */}
            {/* Always visible Search Bar with Icon */}
            <div className="flex justify-center mb-4">
                <div className="relative w-full max-w-lg">
                    <input
                        type="text"
                        placeholder="Search for friends..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="p-4 w-full border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pl-12 text-gray-800 placeholder-gray-500"
                    />
                    <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl" />
                </div>
            </div>

            {loading ? (
                <p className="text-gray-500 text-center flex items-center justify-center py-4">
                    <span className="loading loading-spinner loading-md"></span> Loading recommendations...
                </p>
            ) : (
                <div className="bg-white p-4 rounded-lg shadow-lg space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                        Friend Recommendations
                    </h2>

                    {filteredRecommendations.length > 0 ? (
                        <ul className="space-y-3">
                            {filteredRecommendations.map((rec) => (
                                <li
                                    key={rec._id}
                                    className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow ease-in-out duration-200"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="font-medium text-gray-800">{rec.username}</span>
                                    </div>
                                    <button
                                        onClick={() => handleSendRequest(rec._id)}
                                        disabled={sendingRequest === rec._id}
                                        className={`relative flex items-center gap-2 px-6 py-2 rounded-lg text-white font-semibold transition-all duration-300 ${
                                            sendingRequest === rec._id
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-md hover:shadow-xl transform hover:scale-105"
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
                        <p className="text-center text-gray-500">No recommendations found matching your search.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
