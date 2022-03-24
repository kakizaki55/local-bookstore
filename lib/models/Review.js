const pool = require('../utils/pool');

module.exports = class Review {
  id;
  rating;
  review;
  bookId;

  constructor(row) {
    this.id = row.id;
    this.rating = row.rating;
    this.review = row.review;
    this.bookId = row.book_id;
    this.book_title = row.title;
  }

  static async insert({ review, rating, bookId }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
        reviews (review, rating, book_id)
        VALUES
        ($1, $2, $3)
        RETURNING
        *
        `,
      [review, rating, bookId]
    );
    return new Review(rows[0]);
  }
  // we need to add book title and book id
  static async findAll() {
    const { rows } = await pool.query(
      `
      SELECT
      reviews.id,
      reviews.rating,
      reviews.review,
      reviews.book_id,
      books.title
    FROM
      reviews
    INNER JOIN
      books
    ON 
      books.id = reviews.book_id
      ORDER BY rating DESC
    LIMIT
      100
      `
    );
    return rows.map((row) => new Review(row));
  }
};
