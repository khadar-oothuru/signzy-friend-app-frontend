import React, { useState, useEffect, useContext } from "react";
import API from "../api/api"; // Ensure default export is used
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUserMinus, FaSpinner } from "react-icons/fa";

const FriendList = () => {
    const { user } = useContext(AuthContext);
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFriends = async () => {
            if (!user?._id) return;

            try {
                const res = await API.get(`/${user._id}/friends`);
                setFriends(res.data);
            } catch (error) {
                toast.error("Error fetching friends. Please try again.");
                console.error("Error fetching friends:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFriends();
    }, [user?._id]);

    // Remove Friend Function with Styled Toast Confirmation
    const handleRemoveFriend = async (friendId) => {
        const toastId = toast(
            <div className="p-4">
                <p className="text-lg font-medium text-gray-800">Are you sure you want to remove this friend?</p>
                <div className="flex justify-center space-x-4 mt-4">
                    <button
                        onClick={async () => {
                            try {
                                await API.post("/remove-friend", {
                                    userId: user._id,
                                    friendId: friendId,
                                });
                                setFriends(friends.filter((friend) => friend._id !== friendId));
                                toast.dismiss(toastId);
                                toast.success("Friend removed successfully.");
                            } catch (error) {
                                toast.dismiss(toastId);
                                toast.error("Error removing friend. Please try again.");
                                console.error("Error removing friend:", error);
                            }
                        }}
                        className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 shadow-md"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => toast.dismiss(toastId)}
                        className="px-4 py-2 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 shadow-md"
                    >
                        No
                    </button>
                </div>
            </div>,
            { autoClose: false, closeOnClick: false, closeButton: false }
        );
    };

    return (
        <>
            {loading ? (
                <p className="text-gray-500 text-center flex items-center justify-center">
                    <FaSpinner className="animate-spin mr-2" /> Loading friends...
                </p>
            ) : friends.length > 0 ? (
                <ul className="space-y-2">
                    {friends.map((friend) => (
                        <li key={friend._id} className="flex justify-between items-center p-3 border border-gray-300 rounded-lg">
                            <span className="font-medium text-gray-700">{friend.username}</span>
                            <button
                                onClick={() => handleRemoveFriend(friend._id)}
                                className="text-red-600 hover:text-red-800 transition flex items-center"
                            >
                                <FaUserMinus className="mr-2" /> Remove
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 text-center">You have no friends yet.</p>
            )}
        </>
    );
};

export default FriendList;
