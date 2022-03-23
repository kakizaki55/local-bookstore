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

  it('creates a new review', async () => {
    const expected = {
      id: expect.any(String),
      rating: 5,
      review: 'Great read',
      bookId: '1',
    };
    const response = await request(app).post('/api/v1/reviews').send(expected);
    expect(response.body).toEqual(expected);
  });

  it('returns a list of reviews', async () => {
    const expected = [
      {
        id: expect.any(String),
        rating: 5,
        review: 'super awesome movie jk its a book',
        bookId: '2',
      },
      {
        id: expect.any(String),
        rating: 1,
        review: 'not a fan',
        bookId: '1',
      },
    ];
    const response = await request(app).get('/api/v1/reviews').send(expected);
    expect(response.body).toEqual(expected);
  });
});
