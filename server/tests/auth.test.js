const request = require('supertest');
const app = require('../index');
const User = require('../src/models/User');
const bcrypt = require('bcrypt');

describe('Authentication Controller', () => {
  beforeAll(async () => {
    await User.deleteMany({}); // Clean the database before tests
  });

  afterAll(async () => {
    await User.deleteMany({}); // Clean the database after tests
  });

  test('User registration', async () => {
    const response = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      password: 'password123',
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('User created');
  });

  test('User login', async () => {
    const response = await request(app).post('/api/auth/login').send({
      username: 'testuser',
      password: 'password123',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  test('Login with wrong credentials', async () => {
    const response = await request(app).post('/api/auth/login').send({
      username: 'testuser',
      password: 'wrongpassword',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid credentials');
  });
});
