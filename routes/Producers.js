const ProducerController = require('../controllers').ProducerController;

let express = require('express');
let router = express.Router();

const {checkName} = require('../middlewares/validations')

/*
* GET ROUTES
 */
router.get('/producers', async(req, res, next) => {
  res.json(await ProducerController.getAll());
});

router.get('/producers/:id', async(req, res, newt) => {
  const producer = await ProducerController.getById(req.params.id);
  if (producer) {
    res.json(producer)
  } else {
    res.status(404).json({'error': "Producer not found"})
  }
});

/*
* POST ROUTE
 */
router.post('/producers', async(req, res, next) => {
  if(await checkName(req.body.firstName) == true && await checkName(req.body.lastName)) {
    const insertedProducer = await  ProducerController.add(req.body);
    res.status(201).json(insertedProducer)
  } else {
    res.status(400).end();
  }
});

/*
* PATCH ROUTE
 */
router.patch('/producers/:id', async(req, res, next) => {
  if(!req.body.firstName && !req.body.lastName) {
    res.status(400).end();
  }

  if(await checkName(req.body.firstName) == false || await checkName(req.body.lastName) == false){
    res.status(400).json({'error': "Please enter a correct values"}).end();

  }else{

    const updatedProducer = await ProducerController.update(req.params.id, req.body);
    if(updatedProducer[0] === 1) {
      res.json(await ProducerController.getById(req.params.id))
    }else{
      res.status(404).json({'error': "Producer not found"})
    }
  }
});

/*
* DELETE ROUTE
 */
router.delete('/producers/:id', async(req, res, next) => {
  const success = await ProducerController.delete(req.params.id);

  if (success) {
    return res.status(204).end();
  } else {
    return res.status(404).json({'error': "Producer not found"})
  }
})

module.exports = router;