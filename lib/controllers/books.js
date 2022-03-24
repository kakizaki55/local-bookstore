const { Router } = require('express');
const Book = require('../models/Book');
const authors = require('./authors');

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
    // we need to add the publisher {name, id} and author{id, name} reviews{ id rating, review, reviewer [dfgjhldfgshsfg]
    const book = await Book.findById(req.params.id);
    const bookWithPublisher = await book.getPublisher();
    const bookWithAuthor = await bookWithPublisher.getAuthor();
    const bookWithReview = await bookWithAuthor.getReviews();
    console.log('bookWithReview', bookWithReview);
    res.send(book);
  });
