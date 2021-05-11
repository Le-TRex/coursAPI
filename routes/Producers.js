const ProducerController = require('../controllers').ProducerController; //syntaxe cheloue cf models

let express = require('express');
let router = express.Router();

//grace au router, créer une requête get. Paramètres : url, fonction(requete, reponse, ensuite)
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

router.post('/producers', async(req, res, next) => {
  if(req.body.firstName && req.body.lastName) {
    const insertedProducer = await  ProducerController.add(req.body);
    //status = code HTTP + json = la ressource créée
    res.status(201).json(insertedProducer)
  } else {
    res.status(400).end();
  }
});

router.patch('/producers/:id', async(req, res, next) => {
  if (!req.body.firstName && !req.body.lastName) {
    res.status(400).end();
  }

  const updatedProducer = await ProducerController.update(req.params.id, req.body);

  //si un producteur a été trouvé
  if(updatedProducer[0] === 1) {
    res.json(await ProducerController.getById(req.params.id))
  } else {
    res.status(404).json({'error': "Producer not found"})
  }
});

router.delete('/producers/:id', async(req, res, next) => {
  const success = await ProducerController.delete(req.params.id);

  if (success) {
    return res.status(204).end();
  } else {
    return res.status(404).json({'error': "Producer not found"})
  }
})

module.exports = router;