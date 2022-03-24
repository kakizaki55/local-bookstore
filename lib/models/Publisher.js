const pool = require('../utils/pool');

module.exports = class Publisher {
  id;
  name;
  city;
  state;
  country;

  constructor({ id, name, city, state, country }) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.state = state;
    this.country = country;
  }
  static async insert({ name, city, state, country }) {
    const { rows } = await pool.query(
      `
    INSERT INTO 
        publishers (name, city, state, country)
    VALUES 
        ($1, $2, $3, $4)
    RETURNING 
        *
    
    `,
      [name, city, state, country]
    );
    return new Publisher(rows[0]);
  }
  static async findAll() {
    const { rows } = await pool.query(`
      SELECT
        *
      FROM
        publishers
      
      `);
    return rows.map((row) => new Publisher(row));
  }
  static async findById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        publishers
      WHERE
        id=$1
    `,
      [id]
    );

    return new Publisher(rows[0]);
  }
  async getBooks() {
    const { rows } = await pool.query(
      `
    SELECT
      books.id, 
      books.title
    FROM
      books
    INNER JOIN 
      publishers
    ON
      books.publisher_id = $1
    `,
      [this.id]
    );
    this.books = rows;
    return this;
  }
};
