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

  it('should create a book', async () => {
    const expected = {
      id: expect.any(String),
      title: 'Cat',
      publisher: '1',
      released: 2004,
    };
    const response = await request(app).post('/api/v1/books').send(expected);
    expect(response.body).toEqual(expected);
  });
});
