import { useState, useEffect } from "react";
import { searchUsers } from "../api/api";

const UserSearch = ({ onSelectUser }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (query.length > 2) {
            searchUsers(query)
                .then((res) => setResults(res.data))
                .catch((err) => console.error("Search error:", err));
        } else {
            setResults([]);
        }
    }, [query]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search users..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {results.length > 0 && (
                <ul>
                    {results.map((user) => (
                        <li key={user._id} onClick={() => onSelectUser(user)}>
                            {user.username}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserSearch;
