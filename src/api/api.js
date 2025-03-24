import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Attach token to headers
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

// Authentication
export const registerUser = (userData) => API.post("/signup", userData);
export const loginUser = (userData) => API.post("/login", userData);

// Friend Requests
export const sendFriendRequest = (senderId, receiverId) => API.post("/send-request", { senderId, receiverId });
export const acceptFriendRequest = (userId, friendId) => API.post("/accept-request", { userId, friendId });

// Friend Recommendations
export const getFriendRecommendations = (userId) => API.get(`/recommend/${userId}`);

// Fetch Friend List
export const getFriendList = (userId) => API.get(`/${userId}/friends`);

// Update Profile
export const updateProfile = (userId, userData) => API.put(`/${userId}`, userData);

// User Search
export const searchUsers = async (query) => {
    try {
        const response = await API.get(`/search?query=${query}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users", error);
        throw error;
    }
};

export default API;
