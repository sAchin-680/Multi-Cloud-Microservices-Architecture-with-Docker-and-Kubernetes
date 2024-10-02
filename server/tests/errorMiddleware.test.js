const express = require('express');
const request = require('supertest');
const app = require('../app');
const errorHandler = require('../middleware/errorMiddleware');

const createApp = () => {
  const app = express();

  // Sample route to trigger an error
  app.get('/error', (req, res, next) => {
    const error = new Error('This is a test error');
    next(error);
  });

  // Use the error handling middleware
  app.use(errorHandler);

  return app;
};

describe('Error Handling Middleware', () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  it('should respond with a 500 status code and error message', async () => {
    const response = await request(app).get('/error');

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'This is a test error');
    expect(response.body).toHaveProperty('stack');
  });

  it('should not expose stack trace in production mode', async () => {
    process.env.NODE_ENV = 'production'; // Set environment to production

    const response = await request(app).get('/error');

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'This is a test error');
    expect(response.body).not.toHaveProperty('stack'); // Stack should not be present in production

    // Reset environment variable
    delete process.env.NODE_ENV;
  });
});
