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

  static async findAll() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        reviews
      ORDER BY rating DESC
      LIMIT
        100
      `
    );
    return rows.map((row) => new Review(row));
  }
};
