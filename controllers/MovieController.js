const Movie = require('../models').Movie;

class MovieController {

  async getAll() {
    return Movie.findAll({ limit: 10 });
  }

  async getById(id) {
    return Movie.findByPk(id);
  }

  async add(data) {
    return Movie.create(data)
  }

  async update(id, payload) {
    return Movie.update(payload, {
      where: {
        id: id
      }
    });
  }

  async delete(id) {
    return Movie.destroy({
      where: {
        id: id
      }
    })
  }

}

module.exports = new MovieController();
