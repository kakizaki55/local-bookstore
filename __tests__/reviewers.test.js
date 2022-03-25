const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Reviewer = require('../lib/models/Reviewer');

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

  it('gets a list of reviewers', async () => {
    const expected = [
      {
        id: '1',
        name: 'John Smith',
        company: 'Rude Reviews Inc.',
      },
      {
        id: '2',
        name: 'Ryssa Mami',
        company: 'Good Opinions Co.',
      },
      {
        id: '3',
        name: 'Zachary',
        company: 'Grumpy Dude Magazine',
      },
      {
        id: '4',
        name: 'Zachary thats going to be deleted',
        company: 'GDM',
      },
    ];

    const res = await request(app).get('/api/v1/reviewers').send(expected);

    expect(res.body).toEqual(expected);
  });

  it('gets a reviewer by id', async () => {
    const expected = {
      id: '2',
      name: 'Ryssa Mami',
      company: 'Good Opinions Co.',
      reviews: [
        {
          id: expect.any(String),
          rating: expect.any(Number),
          review: expect.any(String),
          book_id: expect.any(String),
          book_title: expect.any(String),
        },
      ],
    };

    const res = await request(app).get('/api/v1/reviewers/2').send(expected);

    expect(res.body).toEqual(expected);
  });

  it('updates the reviewer by id', async () => {
    const expected = {
      name: 'Minoka',
      company: 'Grump Dude Magazine',
    };
    const res = await request(app).patch('/api/v1/reviewers/2').send(expected);
    expect(res.body).toEqual({ ...expected, id: expect.any(String) });
  });

  it('deletes a reviewer by IDs', async () => {
    const expected = await Reviewer.findById(4);
    const res = await request(app).delete(`/api/v1/reviewers/${expected.id}`);
    expect(res.body).toEqual(expected);
  });
  it('wont deletes a reviewer by IDs if there are reviews', async () => {
    const expected = await Reviewer.findById(1);
    const res = await request(app).delete(`/api/v1/reviewers/${expected.id}`);
    expect(res.body).toEqual({});
  });
});
