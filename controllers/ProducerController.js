const Producer = require('../models').Producer; //models => index des models qui charge tous le smodèles puis .ModelSouhaité

class ProducerController {
  async getAll() {
    return Producer.findAll();
  }

  async getById(id) {
    return Producer.findByPk(id)
  }

  async add(data) {
    return Producer.create(data)
  }

  async update(id, payload) {
    return Producer.update(payload, {
      where: {
        id: id}
    });
  }

  async delete(id) {
    return Producer.destroy({
      where: {
        id: id
      }
    })
  }
}

module.exports = new ProducerController();