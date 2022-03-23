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
      INNER JOIN
        books
      ON
        $1 = books.publisher_id
    `,
      [id]
    );

    return new Publisher(rows[0]);
  }
};
