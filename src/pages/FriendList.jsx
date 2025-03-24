import { useState, useEffect, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

const FriendList = () => {
    const { user } = useContext(AuthContext);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            const { data } = await API.get(`/friends/${user._id}`);
            setFriends(data);
        };
        fetchFriends();
    }, [user]);

    return (
        <div>
            <h3>Friends</h3>
            <ul>
                {friends.map(friend => (
                    <li key={friend._id}>{friend.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default FriendList;
