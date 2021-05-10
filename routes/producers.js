const ProducerController = require('../controllers').ProducerController; //syntaxe cheloue cf models

let express = require('express');
let router = express.Router();

//grace au router, créer une requête get. Paramètres : url, fonction(requete, reponse, ensuite)
router.get('/producers', async(req, res, next) => {
  res.json(await ProducerController.getAll());
});

router.get('/producers/:id', async(req, res, newt) => {
  const producer = await ProducerController.getById(req.params.id)
  res.json(producer)
});

router.post('/producers', async(req, res, next)=>{
  if(req.body.firstName && req.body.lastName) {
    const insertedProducer = await  ProducerController.add(req.body.firstName, req.body.lastName);
    //status = code HTTP + json = la ressource créée
    res.status(201).json(insertedProducer)
  }
});

module.exports = router;