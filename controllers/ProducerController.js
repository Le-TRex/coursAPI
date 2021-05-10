const Producer = require('../models').Producer; //models => index des models qui charge tous le smodèles puis .ModelSouhaité

class ProducerController {
  async getAll() {
    return Producer.findAll();
  }
}

module.exports = new ProducerController();