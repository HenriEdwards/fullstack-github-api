
const express = require("express");
const app = express();
const port = 8080;
const fetch = require("node-fetch");

app.use(express.json());

// Search endpoint
app.post("/search", (req, res) => {
  const { username } = req.body;

  // Make a GET request to the GitHub API to search for users
  fetch(`https://api.github.com/search/users?q=${username}`, {
    headers: {
      Authorization: "token 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", // Replace with your actual token
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
        Authorization: "token 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", // Replace with your actual token
      },
    });
    const user = await userResponse.json();

    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=5`, {
      headers: {
        Authorization: "token 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", // Replace with your actual token
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