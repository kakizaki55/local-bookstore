const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()
  .post('/', async (req, res) => {
    const authors = await Author.insert(req.body);
    res.send(authors);
  })

  .get('/', async (req, res) => {
    const authors = await Author.findAll();
    res.send(authors);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const authors = await Author.findById(req.params.id);
      const authorWithBooks = await authors.getBooks();
      res.send(authorWithBooks);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
