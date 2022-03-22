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
    ];

    const res = await request(app).get('/api/v1/reviewers').send(expected);

    expect(res.body).toEqual(expected);
  });

  it('gets a reviewer by id', async () => {
    const expected = {
      id: '2',
      name: 'Ryssa Mami',
      company: 'Good Opinions Co.',
    };

    const res = await request(app).get('/api/v1/reviewers/2').send(expected);

    expect(res.body).toEqual(expected);
  });
});
