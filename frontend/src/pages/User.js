import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './User.css';
import githubImage from "../assets/GitHub_Logo_White.png";

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
            // Associate the commit results with their respective repository ids
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
      {userData ? (
        <div>
           <div className='top-section'>
              {/* Render user info */}
              <h3 className='heading-main'>Welcome {userData.name}</h3>
              <p className='bio'>{userData.bio} | Followers: {userData.followers} | Public Repos: {userData.public_repos}</p>
              <p><a className='github-link' href={userData.html_url} target="_blank" rel="noopener noreferrer">View GitHub Profile</a></p>
              <img src={userData.avatar_url} alt="User Avatar" />
          </div>
          <div>
            <h3 className='repo-header'>Repositories</h3>
            <hr></hr>
            {repos.map((repo) => (
              <div key={repo.id}>
                <div className='repo-section'>
                  {/* Render repo info */}
                  <h4 className='repo-name'><a className='github-link' href={repo.html_url} target="_blank">{repo.name}</a></h4>
                  {repo.description ? (<p className='repo-description'>{""+ repo.description}</p>):(<p className='repo-description'>No description</p>)}
                  <p className='date'>Creation Date: {repo.created_at.slice(0, 10)}</p>
                  <p className='date'>Last Commit Date: {repo.updated_at.slice(0, 10)}</p>
                  <h4 className='commit-header'>Last 5 Commits:</h4>
                  <ul>
                    {/* Render commit info */}
                    {commitData[repo.id] &&
                      commitData[repo.id].map((commit) => (
                        <li key={commit.sha}>{commit.commit.message}</li>
                      ))}
                  </ul>
                </div>
                <hr></hr>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <img className='loading-image' src={githubImage} alt="loading..." />
      )}
    </div>
  );
};

export default User;