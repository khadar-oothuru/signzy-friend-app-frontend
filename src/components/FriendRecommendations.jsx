import { useState, useEffect, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

const FriendRecommendations = () => {
    const { user } = useContext(AuthContext);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            const { data } = await API.get(`/friends/recommendations/${user._id}`);
            setRecommendations(data);
        };
        fetchRecommendations();
    }, [user]);

    return (
        <div>
            <h3>Friend Recommendations</h3>
            <ul>
                {recommendations.map(rec => (
                    <li key={rec._id}>{rec.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default FriendRecommendations;
