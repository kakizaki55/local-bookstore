const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('local-bookstore-backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('allows user to create a reviewer entry', async () => {
    const expected = {
      name: 'Zachary',
      company: 'Grumpy Dude Magazine',
    };

    const res = await request(app).post('/api/v1/reviewers').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
