// src/components/UserSearch.js
import React, { useState } from "react";

const UserSearch = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleInputChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        onSearch(newQuery); // Trigger the search on every input change
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Search users..." 
                value={query} 
                onChange={handleInputChange} 
            />
        </div>
    );
};

export default UserSearch;
