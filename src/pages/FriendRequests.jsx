import React, { useState, useEffect, useContext } from "react";
import { getFriendRequests, acceptFriendRequest } from "../api/api";
import { AuthContext } from "../context/AuthContext";

const FriendRequests = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        if (user) {
            getFriendRequests(user._id).then((res) => setRequests(res.data));
        }
    }, [user]);

    const handleAccept = async (friendId) => {
        await acceptFriendRequest(user._id, friendId);
        setRequests(requests.filter(id => id !== friendId));
    };

    return (
        <div>
            <h3>Friend Requests</h3>
            {requests.length > 0 ? (
                <ul>
                    {requests.map((id) => (
                        <li key={id}>
                            {id} <button onClick={() => handleAccept(id)}>Accept</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No friend requests.</p>
            )}
        </div>
    );
};

export default FriendRequests;
