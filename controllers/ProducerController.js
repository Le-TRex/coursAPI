const Producer = require('../models').Producer; //models => index des models qui charge tous le smodèles puis .ModelSouhaité

class ProducerController {
  async getAll() {
    return Producer.findAll();
  }

  async getById(id) {
    return Producer.findByPk(id)
  }

  async add(firstName, lastName) {
    return Producer.create({
      firstName,
      lastName
    })
  }
}

module.exports = new ProducerController();