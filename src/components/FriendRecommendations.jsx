import React, { useState, useEffect, useContext } from "react";
import { getFriendRecommendations, sendFriendRequest } from "../api/api";
import { AuthContext } from "../context/AuthContext";

const FriendRecommendations = () => {
    const { user } = useContext(AuthContext);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        if (user) {
            getFriendRecommendations(user._id).then((res) => setRecommendations(res.data));
        }
    }, [user]);

    const handleSendRequest = async (receiverId) => {
        await sendFriendRequest(user._id, receiverId);
        setRecommendations(recommendations.filter(r => r._id !== receiverId));
    };

    return (
        <div>
            <h3>Recommended Friends</h3>
            {recommendations.length > 0 ? (
                <ul>
                    {recommendations.map((rec) => (
                        <li key={rec._id}>
                            {rec.username} <button onClick={() => handleSendRequest(rec._id)}>Add Friend</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No recommendations available.</p>
            )}
        </div>
    );
};

export default FriendRecommendations;
