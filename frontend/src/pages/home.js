import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="container">
      <div className="search-form">
        <h4>GitHub Search User</h4>
        <form>
          <input type="text" />
          <button>Search</button>
        </form>
      </div>
      <div className="search-results">
        <div className="user">
          <div className="image">
            <h3>image will be here</h3>
          </div>
          <div className="user-info">
            <h4>Name of user here</h4>
            <small>ID34144124</small>
            <a href="">View Profile</a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;