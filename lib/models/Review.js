const pool = require('../utils/pool');

module.exports = class Review {
  id;
  rating;
  review;
  bookId;
  bookTitle;

  constructor(row) {
    this.id = row.id;
    this.review = row.review;
    this.bookId = row.book_id;
    this.bookTitle = row.title;
  }

  static async insert({ review, rating, bookId }) {
    console.log(bookId, 'bookId');
    const { rows } = await pool.query(
      `
        INSERT INTO
        reviews (review, rating, book_id)
        VALUES
        ($1, $2, $3)
        LEFT JOIN
        books
        ON
        books.id = $3
        RETURNING
        *
        `,
      [review, rating, bookId]
    );
    console.log(rows);
    return new Review(rows[0]);
  }
};
