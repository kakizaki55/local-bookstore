const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title;
  publisher;
  released;
  author;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.publisher = row.publisher_id;
    this.released = row.released;
    this.author = row.author_id;
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

  async getPublisher() {
    const { rows } = await pool.query(
      `SELECT
        id, name
       FROM
        publishers
       WHERE
         publishers.id=$1
        `,
      [this.publisher]
    );
    this.publisher = rows[0];
    return this;
  }

  async getAuthor() {
    const { rows } = await pool.query(
      `
          SELECT
            authors.id, authors.name
          FROM
            authors
          INNER JOIN
            authors_books
          ON
            authors_books.author_id = authors.id
          INNER JOIN
            books
          ON
            authors_books.book_id = books.id
          WHERE
            books.id=$1
        `,
      [this.id]
    );
    console.log('rows', rows);
    this.author = rows;
    return this;
  }
};
