const MovieController = require('../controllers').MovieController;

let express = require('express');
let router = express.Router();

router.get('/movies', async (req, res, next) => {
  if(req.query.genre){ // Trier par genreId
    const movies = await MovieController.getByGenre(req.query.genre);
    if (movies) {
      res.json(movies);
    } else {
      res.status(404).json({'error': "Movie doesn't exist"})
    }
  } else if (req.query.sort) { //ordonner par année
    res.json(await MovieController.sortByYear());
  } else { //Afficher TOUS les films
    res.json(await MovieController.getAll());
  }

});

router.get('/movies/:id', async (req, res, next) => {
  const movie = await MovieController.getById(req.params.id);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({'error': "Movie doesn't exist"})
  }
});



router.post('/movies', async (req, res, next) => {
  if (req.body.firstName && req.body.lastName) {
    const insertedMovie = await MovieController.add(req.body);
    res.status(201).json(insertedMovie);
  } else {
    res.status(400).end();
  }
});

router.patch('/movies/:id', async (req, res, next) => {
  if (!req.body.firstName && !req.body.lastName) {
    res.status(400).end();
  }

  const updatedMovie = await MovieController.update(req.params.id, req.body);

  if (updatedMovie[0] === 1) {
    res.json(await MovieController.getById(req.params.id))
  } else {
    res.status(404).json({'error': "Movie not found"})
  }

});

router.delete('/movies/:id', async (req, res, next) => {
  const success = await MovieController.delete(req.params.id);

  if (success) {
    return res.status(204).end();
  } else {
    res.status(404).json({'error': "Movie not found"});
  }

});

module.exports = router;
