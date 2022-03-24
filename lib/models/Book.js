const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title;
  publisher;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.publisher = row.publisher_id;
    this.released = row.released;
  }

  static async insert({ title, publisher, released }) {
    const { rows } = await pool.query(
      `
      INSERT INTO 
        books (title, publisher_id, released)
      VALUES
        ($1, $2, $3)
      RETURNING
        *
      `,
      [title, publisher, released]
    );
    return new Book(rows[0]);
  }
  static async findAll() {
    const { rows } = await pool.query(
      `
      SELECT 
        *
      FROM 
        books
      `
    );

    return rows.map((row) => new Book(row));
  }

  // we need to add the publisher {name, id} and author{id, name} reviews{ id rating, review, reviewer}
  static async findById(id) {
    const { rows } = await pool.query(
      `
    SELECT 
      * 
    FROM 
      books 
    WHERE 
      id=$1
    `,
      [id]
    );
    return new Book(rows[0]);
  }
};
