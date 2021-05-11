const Genre = require('../models').Genre;

class GenreController {

  async getAll() {
    return Genre.findAll();
  }

  async getById(id) {
    return Genre.findByPk(id);
  }

  async add(data) {
    return Genre.create(data)
  }

  async update(id, payload) {
    return Genre.update(payload, {
      where: {
        id: id
      }
    });
  }

  async delete(id) {
    return Genre.destroy({
      where: {
        id: id
      }
    })
  }

}

module.exports = new GenreController();
