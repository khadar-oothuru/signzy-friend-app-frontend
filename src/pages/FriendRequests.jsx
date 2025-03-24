import { useState, useEffect, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

const FriendRequests = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            const { data } = await API.get(`/friend-requests/${user._id}`);
            setRequests(data);
        };
        fetchRequests();
    }, [user]);

    const acceptRequest = async (friendId) => {
        await API.post("/friends/accept", { userId: user._id, friendId });
        setRequests(requests.filter(req => req._id !== friendId));
    };

    return (
        <div>
            <h3>Friend Requests</h3>
            <ul>
                {requests.map(req => (
                    <li key={req._id}>
                        {req.username} 
                        <button onClick={() => acceptRequest(req._id)}>Accept</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendRequests;
