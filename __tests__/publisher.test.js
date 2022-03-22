const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const publishers = require('../lib/controllers/publishers');
const Publisher = require('../lib/models/Publisher');

describe('local-bookstore routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('it create a new publisher object ', async () => {
    const expected = {
      name: 'Portland books',
      city: 'Portland',
      state: 'OR',
      country: 'United States',
    };
    const { body } = await request(app)
      .post('/api/v1/publishers')
      .send(expected);

    expect(body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets all publishers from data base', async () => {
    const expected = await Publisher.findAll();
    const response = await request(app).get('/api/v1/publishers');
    expect(response.body).toEqual(expected);
  });

  it('gets publisher by ID', async () => {
    
    const expected = await Publisher.findById(1);
    const response = await request(app).get(`/api/v1/publishers/${expected.id}`);
    expect(response.body).toEqual(expected)
  })
});
