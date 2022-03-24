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
    this.review = row.reviews_id;
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
    this.author = rows;
    return this;
  }

  async getReviews() {
    const { rows } = await pool.query(
      `
      SELECT
      reviews.id, reviews.rating, reviews.review, reviewers.name, reviews.reviewer_id
    FROM
      reviews
    INNER JOIN
      books
    ON
      books.id = reviews.book_id
    INNER JOIN 
      reviewers
    ON
      reviews.reviewer_id = reviewers.id
    WHERE
      books.id=$1

      `,
      [this.id]
    );
    console.log('rows', rows);
    this.review = rows.map((review) => ({
      id: review.id,
      rating: review.rating,
      reviews: review.review,
      reviewer: { id: review.reviewer_id, name: review.name },
    }));
    return this;
  }
};
