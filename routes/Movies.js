const MovieController = require('../controllers').MovieController;

let express = require('express');
let router = express.Router();

const {checkLength, checkYear, checkGenreId, checkProducerId} = require('../middlewares/validations')

/*
* GET ROUTES
 */

router.get('/movies', async (req, res, next) => {

  /* SORT BY GENRE ID */
  if(req.query.genre){
    const movies = await MovieController.getByGenre(req.query.genre);
    if (movies) {
      res.json(movies);
    } else {
      res.status(404).json({'error': "Movie doesn't exist"})
    }

    /* ORDER BY YEAR */
  } else if (req.query.sort) {
    if(req.query.sort != 'year'){
      res.status(400).json({ error: "Sort is only allowed by year for now ;)" })
    } else {
      res.json(await MovieController.sortByYear());
    }

    /* PAGINATION */
  } else if (req.query.page) {
    const movies = await MovieController.getByPage(req.query.page);
    if (movies) {
      res.json(movies);
    } else {
      res.status(404).json({'error': "Movie doesn't exist"})
    }

    /* DISPLAY ALL MOVIES */
  } else {
    res.json(await MovieController.getAll());
  }
});

    /* SEARCH BY YEAR OR TITLE */
router.get('/movies/search', async(req, res, next) => {
  let column = Object.keys(req.query)[0];

  if (column == 'year' || column == 'title') {

    const movies = await MovieController.getBySearch(req.query);

    if (movies.length <1 ) {
      res.status(404).json( { error: "Movies not found. Remember that here, the wilcard is % :)" } )
    } else {
      res.json(movies);
    }

  } else {
    res.status(400).json({ error: "You can search only by year or title for now :)" })
  }
});

    /* GET MOVIE BY ID */
router.get('/movies/:id', async (req, res, next) => {
  const movie = await MovieController.getById(req.params.id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({'error': "Movie doesn't exist"})
  }
});

/*
* POST ROUTE
 */
router.post('/movies', async (req, res, next) => {
  if (req.body.title && req.body.description && req.body.year && req.body.producerId && req.body.genreId) {

    if(await checkLength(req.body.title, 1, 50) == true
      && await checkLength(req.body.description, 2, 250) == true
      && await checkYear(req.body.year) == true
      && await checkGenreId(req.body.genreId)
      && await checkProducerId(req.body.producerId)){

      const insertedMovie = await MovieController.add(req.body);
      res.status(201).json(insertedMovie);
    }else{
      res.status(403).json({'error': "Please enter a correct values"}).end();
    }
  } else {
    res.status(400).end();
  }
});

/*
* PATCH ROUTE
 */
router.patch('/movies/:id', async (req, res, next) => {
  if (!req.body.title && !req.body.description && !req.body.year) {
    res.status(400).json({"error": "Please enter at least one value"}).end();
  }

  if(await checkLength(req.body.title, 1, 50) == false
    || await checkLength(req.body.description, 2, 250) == false
    || await checkYear(req.body.year) == false ){

    res.status(403).json({'error': "Please enter a correct values"}).end();
  }else{
    const updatedMovie = await MovieController.update(req.params.id, req.body);
    if (updatedMovie[0] === 1) {
      res.json(await MovieController.getById(req.params.id))
    } else {
      res.status(404).json({'error': "Movie not found"})
    }
  }
});

/*
* DELETE ROUTE
 */
router.delete('/movies/:id', async (req, res, next) => {
  const success = await MovieController.delete(req.params.id);
  if (success) {
    return res.status(204).end();
  } else {
    res.status(404).json({'error': "Movie not found"});
  }
});

module.exports = router;
