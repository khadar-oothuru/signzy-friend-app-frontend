import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import FriendList from "../pages/FriendList";
import FriendRequests from "../pages/FriendRequests";
import FriendRecommendations from "../components/FriendRecommendations";

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h2>Dashboard</h2>
            <h3>Welcome, {user.username}!</h3>
            <FriendList />
            <FriendRequests />
            <FriendRecommendations />
        </div>
    );
};

export default Dashboard;
