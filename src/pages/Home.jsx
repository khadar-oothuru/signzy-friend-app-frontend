import React,{ useState, useEffect, useContext } from "react";
import API from "../api/api"; // Ensure API import is consistent
import { AuthContext } from "../context/AuthContext";
import UserSearch from "../components/UserSearch";
import FriendList from "../pages/FriendList";
import { sendFriendRequest } from "../api/api";

const Home = () => {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            API.get("/").then((res) => {
                setUsers(res.data);
                setLoading(false);
            }).catch((err) => {
                setError(err.response?.data?.message || "Error fetching users");
                setLoading(false);
            });
        }
    }, [user]);

    const handleSendRequest = async (receiverId) => {
        try {
            await sendFriendRequest(user._id, receiverId);
            alert("Friend request sent!");
            setUsers(users.filter(u => u._id !== receiverId)); // Remove from list after sending request
        } catch (error) {
            alert("Failed to send request");
        }
    };

    if (!user) return <p>Please log in to view users.</p>;
    if (loading) return <p>Loading users...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Home</h2>

            {/* User Search Component */}
            <UserSearch onSelectUser={(selectedUser) => console.log("Selected:", selectedUser)} />

            {/* Users List */}
            <h3>All Users</h3>
            <ul>
                {users.map((u) => (
                    <li key={u._id}>
                        {u.username} 
                        {u._id !== user._id && (
                            <button onClick={() => handleSendRequest(u._id)}>Add Friend</button>
                        )}
                    </li>
                ))}
            </ul>

            {/* Friend List Component */}
            <FriendList />
        </div>
    );
};

export default Home;
