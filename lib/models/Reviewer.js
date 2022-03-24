const pool = require('../utils/pool');

module.exports = class Reviewer {
  id;
  name;
  company;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.company = row.company;
  }

  static async insert({ name, company }) {
    const { rows } = await pool.query(
      'INSERT INTO reviewers (name, company) VALUES ($1, $2) RETURNING *',
      [name, company]
    );

    return new Reviewer(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM reviewers');
    return rows.map((row) => new Reviewer(row));
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM reviewers WHERE id = $1', [
      id,
    ]);
    return new Reviewer(rows[0]);
  }

  async getReviews() {
    const { rows } = await pool.query(
      `
      SELECT
      reviews.rating,
      reviews.review,
      reviews.book_id,
      books.title AS book_title,
      reviews.id
	FROM
      reviews
    INNER JOIN
      reviewers
    ON
      reviews.reviewers_id = reviewers.id
    INNER JOIN
      books
    ON
        books.id = reviews.book_id
    WHERE 
      reviewers.id = $1

    `,
      [this.id]
    );

    this.reviews = rows;
    return this;
  }

  static async updateById(id, attributes) {
    const existingReviewer = await Reviewer.findById(id);
    const { name, company } = { ...existingReviewer, ...attributes };
    const { rows } = await pool.query(
      `
      UPDATE
      reviewers
      SET
      name=$1,
      company=$2
      WHERE
      id=$3
      RETURNING
      *
      `,
      [name, company, id]
    );
    return new Reviewer(rows[0]);
  }
  // only delete when there are no reviews
  static async deleteById(id) {
    const { rows } = await pool.query(
      `
    DELETE FROM
      reviewers
    WHERE
      id=$1
    RETURNING
      *
      `,
      [id]
    );

    return new Reviewer(rows[0]);
  }
};
