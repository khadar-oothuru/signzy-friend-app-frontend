// src/api/api.js
import axios from "axios";

const API = axios.create({ baseURL: "https://signzy-friend-app-backend.vercel.app/api/users" });

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export const registerUser = (userData) => API.post("/signup", userData);
export const loginUser = (userData) => API.post("/login", userData);
export const searchUsers = (query) => API.get(`/search?query=${query}`);
export const sendFriendRequest = (senderId, receiverId) => API.post("/send-request", { senderId, receiverId });
export const acceptFriendRequest = (userId, friendId) => API.post("/accept-request", { userId, friendId });
export const removeFriend = (userId, friendId) => API.post("/remove-friend", { userId, friendId });
export const getFriendList = (userId) => API.get(`/${userId}/friends`);
export const getFriendRequests = (userId) => API.get(`/${userId}/requests`);
export const getFriendRecommendations = (userId) => API.get(`/recommend/${userId}`);
export const updateProfile = (userId, userData) => API.put(`/${userId}`, userData);

export default API;