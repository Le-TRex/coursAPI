const MovieController = require('../controllers').MovieController;

let express = require('express');
let router = express.Router();

const {checkName, checkLength, checkYear} = require('../middlewares/validations')

router.get('/movies', async (req, res, next) => {
  if(req.query.genre){ // Trier par genreId
    const movies = await MovieController.getByGenre(req.query.genre);
    if (movies) {
      res.json(movies);
    } else {
      res.status(404).json({'error': "Movie doesn't exist"})
    }

  } else if (req.query.sort) { //ordonner par année
    if(req.query.sort != 'year'){
      res.status(400).json({ error: "Sort is only allowed by year for now ;)" })
    } else {
      res.json(await MovieController.sortByYear());
    }

  } else if (req.query.page) { //limiter nombre de résultats + pagination
    const movies = await MovieController.getByPage(req.query.page);
    if (movies) {
      res.json(movies);
    } else {
      res.status(404).json({'error': "Movie doesn't exist"})
    }

  } else { //Afficher TOUS les films
    res.json(await MovieController.getAll());
  }
});

router.get('/movies/search', async(req, res, next) => {
  let column = Object.keys(req.query)[0];

  if (column == 'year' || column == 'title') { // si la colonne sur laquelle porte la recherche est année ou titre

    //récupération des films correspondants à la recherche
    const movies = await MovieController.getBySearch(req.query);

    if (movies.length <1 ) { //si tableau de movies est vide
      res.status(404).json( { error: "Movies not found. Remember that here, the wilcard is % :)" } )
    } else { //si il y a des movies
      res.json(movies);
    }

  } else { // si la colonne de recherche est != de titre ou année
    res.status(400).json({ error: "You can search only by year or title for now :)" })
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
  if (req.body.title && req.body.description && req.body.year) {
    if(await checkLength(req.body.title, 1, 50) == true && await checkLength(req.body.description, 2, 250) == true && checkYear(req.body.year) == true){
      const insertedMovie = await MovieController.add(req.body);
      res.status(201).json(insertedMovie);
    }else{
      res.status(403).json({'error': "Please enter a correct values"}).end();
    }
  } else {
    res.status(400).end();
  }
});

router.patch('/movies/:id', async (req, res, next) => {
  if (!req.body.title && !req.body.description && !req.body.year) {
    res.status(400).json({"error": "Please enter at least one value"}).end();
  }
  if(await checkName(req.body.name) == true){
    const updatedMovie = await MovieController.update(req.params.id, req.body);
    if (updatedMovie[0] === 1) {
      res.json(await MovieController.getById(req.params.id))
    } else {
      res.status(404).json({'error': "Movie not found"})
    }
  }else{
    res.status(403).json({'error': "Please enter a correct values"}).end();
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
