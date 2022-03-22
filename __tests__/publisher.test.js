const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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
});
