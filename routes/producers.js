let express = require('express');
let router = express.Router();

//grace au router, créer une requête get. Paramètres : url, fonction(requete, reponse, ensuite)
router.get('/producers', async(req, res, next) => {
  res.json({hello: "world"});
});

module.exports = router;