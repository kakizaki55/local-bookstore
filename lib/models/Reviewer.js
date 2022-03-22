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
};
