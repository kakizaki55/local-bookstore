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

  it('gets list of authors', async () => {
    const expected = [
      {
        id: '1',
        name: 'Hayao Miyazaki',
        dob: '1/5/1941',
        pob: 'Tokyo, Japan',
      },
      {
        id: '2',
        name: 'George Orwell',
        dob: '1/25/1950',
        pob: 'Motihari, India',
      },
      {
        id: '3',
        name: 'J.R.R Tolkien',
        dob: '1/3/1892',
        pob: 'Bloemfontein, South Africa',
      },
    ];
    const res = await request(app).get('/api/v1/authors').send(expected);

    expect(res.body).toEqual(expected);
  });

  it('gets authors by id', async () => {
    const expected = {
      id: '1',
      name: 'Hayao Miyazaki',
      dob: '1/5/1941',
      pob: 'Tokyo, Japan',
    };
    const res = await request(app).get('/api/v1/authors/1').send(expected);

    expect(res.body).toEqual(expected);
  });
});
