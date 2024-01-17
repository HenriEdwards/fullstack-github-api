import React, { useState } from "react";
import "./Home.css";

const Home = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);

  // Function handle form submission
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
        <h4 className='search-text'>Search GitHub by Username</h4>
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
        {/* Render the fetched users */}
        {users.map((user) => (
          <div className="user" key={user.id}>
            <div className="user-info">
              <h4 className="user-name">{user.name}</h4>
              <a className='link' href={`/username=${user.name}`}>View Profile</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;