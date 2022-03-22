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

  it('allows user to create an author entry', async () => {
    const expected = {
      name: 'George Orwell',
      dob: '1/25/1950',
      pob: 'Motihari, India',
    };

    const res = await request(app).post('/api/v1/authors').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
