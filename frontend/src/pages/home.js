import React, { useState } from "react";
import "./Home.css";

const Home = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make a POST request to the backend with the username
    fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container">
      <div className="search-form">
        <h4>GitHub Search User</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="search-results">
        {users.map((user) => (
          <div className="user" key={user.id}>
            <div className="user-info">
              <h4>{user.name}</h4>
              <small>{user.id}</small>
              <a href={`/user/${user.username}`}>View Profile</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;