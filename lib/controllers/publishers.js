const { Router } = require('express');

const Publisher = require('../models/Publisher');

module.exports = Router()
  .post('/', async (req, res) => {
    const publisher = await Publisher.insert(req.body);
    res.send(publisher);
  })
  .get('/', async (req, res) => {
    const publisher = await Publisher.findAll();
    res.send(publisher);
  })
  .get('/:id', async (req, res) => {
    const publisher = await Publisher.findById(req.params.id);
    const publisherWithBooks = await publisher.getBooks();
    res.send(publisherWithBooks);
  });
