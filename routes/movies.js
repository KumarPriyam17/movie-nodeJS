const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// GET all
router.get('/', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

// GET one
router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).json({ error: 'Not found' });
  res.json(movie);
});

// POST
router.post('/', async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.status(201).json(movie);
});

// PUT
router.put('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!movie) return res.status(404).json({ error: 'Not found' });
  res.json(movie);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

module.exports = router;
