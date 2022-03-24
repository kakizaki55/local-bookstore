const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
  .post('/', async (req, res) => {
    const reviewer = await Reviewer.insert(req.body);
    res.send(reviewer);
  })

  .get('/', async (req, res) => {
    const reviewer = await Reviewer.findAll();
    res.send(reviewer);
  })

  .get('/:id', async (req, res) => {
    const reviewer = await Reviewer.findById(req.params.id);
    const reviewerWithReviews = await reviewer.getReviews();
    console.log('reviewerWithReviews', reviewerWithReviews);

    res.send(reviewerWithReviews);
  })

  .patch('/:id', async (req, res) => {
    const reviewer = await Reviewer.updateById(req.params.id, req.body);
    res.send(reviewer);
  })

  .delete('/:id', async (req, res) => {
    // only delete when there are no reviews
    const reviewer = await Reviewer.deleteById(req.params.id);
    res.send(reviewer);
  });
