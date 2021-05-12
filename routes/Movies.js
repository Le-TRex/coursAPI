const MovieController = require('../controllers').MovieController;

let express = require('express');
let router = express.Router();

const {checkLength, checkYear, checkGenreId, checkProducerId} = require('../middlewares/validations')
let moviePage = "localhost:3000/api/movies?page="
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
    const allMovies = await MovieController.getAll();

    let prevPage
    let selfPage
    let nextPage
    let lastPage

    let totalNumberMovies = allMovies.length
    let lastPageNumber = parseInt((totalNumberMovies / 10) +1)
    let pageNumber = req.query.page


    if (movies.length > 0) {
      
      selfPage = "Vous êtes à la page : " + moviePage + pageNumber
      if(pageNumber != 1){
        prevPage = "La page précédente est la page : " + moviePage + (pageNumber - 1)
      }
      if(pageNumber == lastPageNumber){
        nextPage = "Il n'y a pas de prochaine page" 
        lastPage = "Vous êtes sur la dernière page :)" 
      }else{
        pageNumber ++
        nextPage = "La page suivante est la page : " + moviePage + pageNumber
        lastPage = "La dernière page est la page : " + moviePage + lastPageNumber
      }
      movies.push(selfPage)
      movies.push(prevPage)
      movies.push(nextPage)
      movies.push(lastPage)      
      
      res.json(movies);
    } else {
      res.status(404).json({'error': "This page doesn't exist"})
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
