import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './User.css';

const User = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${username}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUser();
  }, [username]);

  if (!userData) {
    return (
      <div className="container">
        <h2>Loading user data...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Welcome to user page</h2>
      <h3>User Name: {userData.name}</h3>
      <p>Profile URL: {userData.profileUrl}</p>
    </div>
  );
};

export default User;