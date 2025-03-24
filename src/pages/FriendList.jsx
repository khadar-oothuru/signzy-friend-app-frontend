import React, { useState, useEffect, useContext } from "react";
import { getFriendList } from "../api/api";
import { AuthContext } from "../context/AuthContext";

const FriendList = () => {
    const { user } = useContext(AuthContext);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        if (user) {
            getFriendList(user._id).then((res) => setFriends(res.data));
        }
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
