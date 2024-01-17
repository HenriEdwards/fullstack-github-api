
const express = require("express");
const app = express();
const port = 8080;
const fetch = require("node-fetch");
const API_KEY = require('./config');
const helmet = require('helmet');

app.use(helmet());
app.use(express.json());

// Search endpoint
app.post("/search", (req, res) => {
  const { username } = req.body;

  // Make a GET request to the GitHub API to search for users
  fetch(`https://api.github.com/search/users?q=${username}`, {
    headers: {
      'Authorization': `token ${API_KEY}`,
      'Content-Type': 'application/json'
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Extract the relevant user data
      const users = data.items.map((item) => ({
        id: item.id,
        name: item.login,
        profileUrl: item.html_url,
      }));

      res.json(users);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred" });
    });
});

// User endpoint
app.get("/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Authorization': `token ${API_KEY}`,
        'Content-Type': 'application/json'
      },
    });
    const user = await userResponse.json();

    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=5`, {
      headers: {
        'Authorization': `token ${API_KEY}`,
        'Content-Type': 'application/json'
      },
    });
    const repos = await reposResponse.json();

    res.json({ user, repos });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Error fetching user data" });
  }
});


// Start the server
app.listen(port, () => console.log("Listening engaged"));