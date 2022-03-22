const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .post('/', async (req, res) => {
    const book = await Book.insert(req.body);
    res.json(book);
  })
  .get('/', async (req, res) => {
    const book = await Book.findAll();
    res.send(book);
  })
  .get('/:id', async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.send(book);
  });