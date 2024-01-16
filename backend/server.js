
const express = require("express");
const app = express();
const port = 8080;
const fetch = require("node-fetch");

app.use(express.json());

// Search endpoint
app.post("/search", (req, res) => {
  const { username } = req.body;

  // Make a GET request to the GitHub API to search for users
  fetch(`https://api.github.com/search/users?q=${username}`)
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
app.get("/user/:username", (req, res) => {
  const { username } = req.params;

  // Make a GET request to the GitHub API to fetch user details
  fetch(`https://api.github.com/users/${username}`)
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred" });
    });
});

// Start the server
app.listen(port, () => console.log("Listening engaged"));