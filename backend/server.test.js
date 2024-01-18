const fetch = require('node-fetch');
const app = require('./server.js');
const API_KEY = require('./config');
const request = require('supertest');

jest.mock('node-fetch');

describe('API Tests', () => {
  let server;

  beforeAll((done) => {
    // Start express server
    server = app.listen(0, () => {
      done();
    });
  });

  afterAll((done) => {
    // Close express server
    server.close(done);
  });

  it('should return user data from GitHub API for a given username', async () => {
    const username = 'testuser';
    const userData = {};

     // Mock the fetch function to return a response with the desired user data structure
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        items: [userData],
      }),
    });

    // Send a request to the server endpoint
    const response = await request(server)
      .post('/search')
      .send({ username })
      .expect(200);

    // Verify that 'fetch' is called once
    expect(fetch).toHaveBeenCalledTimes(1);

    // Verify that 'fetch' is called with specific arguments
    expect(fetch).toHaveBeenCalledWith(

      // Verify that the URL passed to the 'fetch' contains expected API
      expect.stringContaining(`https://api.github.com/search/users?q=${username}`),

      // Verify header passed to 'fetch' contains expected structure and values
      expect.objectContaining({
        headers: {
          // Verify content type
          'Content-Type': 'application/json',

          // Verify auth
          'Authorization': `token ${API_KEY}`,
        },
      })
    );

    // Check that the response body matches the expected user data
    expect(response.body).toEqual([userData]);
  });
});