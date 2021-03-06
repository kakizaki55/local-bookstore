const pool = require('../utils/pool');

module.exports = class Author {
  id;
  name;
  dob;
  pob;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = new Date(row.dob).toLocaleDateString();
    this.pob = row.pob;
  }

  static async insert({ name, dob, pob }) {
    const { rows } = await pool.query(
      'INSERT INTO authors (name, dob, pob) VALUES ($1, $2, $3) RETURNING *',
      [name, dob, pob]
    );

    return new Author(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM authors');
    return rows.map((row) => new Author(row));
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM authors WHERE id=$1', [
      id,
    ]);
    return new Author(rows[0]);
  }
  async getBooks() {
    const { rows } = await pool.query(
      `
    SELECT
      books.id, 
      books.title,
      books.released
    FROM
      books
    INNER JOIN 
      authors_books
    ON
      authors_books.book_id = books.id
    WHERE
      authors_books.book_id = $1
    `,
      [this.id]
    );
    this.books = rows;
    return this;
  }
};
