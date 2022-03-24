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
  it('gets a list of all the books', async () => {
    const expected = [
      {
        id: expect.any(String),
        title: 'Zachary Mami',
        publisher: '1',
        released: 2003,
      },
      { id: expect.any(String), title: 'Dog', publisher: '1', released: 2006 },
      {
        id: expect.any(String),
        title: 'War and Piece',
        publisher: '1',
        released: 1960,
      },
    ];
    const response = await request(app).get('/api/v1/books');
    expect(response.body).toEqual(expected);
  });

  it('gets a book by its id', async () => {
    const expected = {
      id: expect.any(String),
      title: 'Zachary Mami',
      released: 2003,
      publisher: { id: '1', name: 'hitRecords' },
      author: [{ id: '1', name: 'Hayao Miyazaki' }],
      review: [
        {
          id: '2',
          rating: 1,
          reviews: 'not a fan',
          reviewer: { id: '2', name: 'Ryssa Mami' },
        },
      ],
    };

    const response = await request(app).get('/api/v1/books/1');
    expect(response.body).toEqual(expected);
  });
});
