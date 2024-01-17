import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const User = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [commitData, setCommitData] = useState({});

  useEffect(() => {
    // Fetch user data and repositories
    const fetchUserData = async () => {
      try {
        // Extract the username from the URL
        const username = location.pathname.replace('/username=', '');

        // Fetch user data and repositories from the server
        const response = await fetch(`/${username}`);
        const { user, repos } = await response.json();
        console.log('Fetched repos:', repos); // Add this console.log statement

        // Update the state with the fetched data
        setUserData(user);
        setRepos(repos);

        // Fetch commits for each repository
        if (repos.length > 0) {
          // Create an array of promises to fetch commits for each repository
          const commitPromises = repos.map((repo) => fetchCommits(repo));
          // Wait for all the commit promises to resolve
          Promise.all(commitPromises).then((commitResults) => {
            const commitData = {};
            // Associate the commit results with their respective repository IDs
            repos.forEach((repo, index) => {
              commitData[repo.id] = commitResults[index];
            });
            // Update the state with the commit data
            setCommitData(commitData);
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [location.search]);

  // Fetch commits for a repository
  const fetchCommits = async (repo) => {
    try {
      // Fetch the commits for a repository from the GitHub API
      const commitsResponse = await fetch(repo.commits_url.replace('{/sha}', ''));
      const commitsData = await commitsResponse.json();

       // Get the last 5 commits
      const lastCommits = [];
      for (let i = 0; i < Math.min(5, commitsData.length); i++) {
        lastCommits.push(commitsData[i]);
      }
      return lastCommits;
    } catch (error) {
      console.error('Error fetching commits:', error);
      return [];
    }
  };

  return (
    <div>
      <h2>Welcome to the user page</h2>
      {userData ? (
        <div>
          <h3>Welcome {userData.name}</h3>
          <p>{userData.bio}</p>
          <p>Followers: {userData.followers}</p>
          <p>Public Repos: {userData.public_repos}</p>

          <h3>Repositories:</h3>
          {console.log('Current repos:', repos)} {/* Add this console.log statement */}

          {repos.map((repo) => (
            <div key={repo.id}>
              <h4>{repo.name}</h4>
              <p>Creation Date: {repo.created_at}</p>
              <p>Last Commit Date: {repo.updated_at}</p>
              <p>Description: {repo.description}</p>

              <h4>Last 5 Commits:</h4>
              <ul>
                {commitData[repo.id] &&
                  commitData[repo.id].map((commit) => (
                    <li key={commit.sha}>{commit.commit.message}</li>
                  ))}
              </ul>
            </div>
          ))}

          <img src={userData.avatar_url} alt="User Avatar" />
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default User;