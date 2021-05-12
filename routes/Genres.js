const GenreController = require('../controllers').GenreController;

let express = require('express');
let router = express.Router();

const {checkName} = require('../middlewares/validations')

/*
* GET ROUTES
 */
router.get('/genres', async (req, res, next) => {
  res.json(await GenreController.getAll());
});

router.get('/genres/:id', async (req, res, next) => {
  const genre = await GenreController.getById(req.params.id);

  if (genre) {
    res.json(genre);
  } else {
    res.status(404).json({'error': "Genre doesn't exist"})
  }
});

/*
* POST ROUTE
 */
router.post('/genres', async (req, res, next) => {
  if (await checkName(req.body.name) == true) {
    const insertedGenre = await GenreController.add(req.body);
    res.status(201).json(insertedGenre);
  } else {
    res.status(403).json({'error': "Please enter a correct values"}).end();
  }
});

/*
* PATCH ROUTE
 */
router.patch('/genres/:id', async (req, res, next) => {
  if (!req.body.name) {
    res.status(400).end();
  }
  if(await checkName(req.body.name) == true){
    const updatedGenre = await GenreController.update(req.params.id, req.body)
    if (updatedGenre[0] === 1) {
      res.json(await GenreController.getById(req.params.id))
    } else {
      res.status(404).json({'error': "Genre not found"})
    }
  }else{
    res.status(403).json({'error': "Please enter a correct values"}).end();
  }
});

/*
* DELETE ROUTE
 */
router.delete('/genres/:id', async (req, res, next) => {
  const success = await GenreController.delete(req.params.id);

  if (success) {
    return res.status(204).end();
  } else {
    res.status(404).json({'error': "Genre not found"});
  }

});

module.exports = router;
