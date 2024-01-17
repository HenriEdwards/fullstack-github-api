// const fetch = require("node-fetch");
// const API_KEY = require('./config');
// const app = require('./server');

// // Snapshot test for the "/search" endpoint
// describe("POST /search", () => {
//   it("should return the expected user data", async () => {
//     const response = await fetch("http://localhost:8081/search", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username: "HenriEdwards" }),
//     });
//     const data = await response.json();
//     expect(data).toMatchSnapshot();
//   });
// });

// // Unit test for the "/:username" endpoint
// describe("GET /:username", () => {
//   it("should return the user and repos data", async () => {
//     const username = "HenriEdwards";
//     const userResponse = await fetch(`http://localhost:8081/${username}`, {
//       headers: {
//         'Authorization': `token ${API_KEY}`,
//         'Content-Type': 'application/json'
//       },
//     });
//     const userData = await userResponse.json();

//     const reposResponse = await fetch(`http://localhost:8081/${username}/repos?per_page=5`, {
//       headers: {
//         'Authorization': `token ${API_KEY}`,
//         'Content-Type': 'application/json'
//       },
//     });
//     const reposData = await reposResponse.json();

//     expect(userData).toMatchSnapshot();
//     expect(reposData).toMatchSnapshot();
//   });
// });