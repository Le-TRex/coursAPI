const sequelize = require("sequelize");
const Movie = require('../models').Movie;

class MovieController {

  
  async getAll() {
    return Movie.findAll();
  }

  async getByGenre(id) {
    return Movie.findAll({
      where: {
        genreId: id
      }
    });
  }

  async getById(id) {
    return Movie.findByPk(id);
  }

  async sortByYear() {
    return Movie.findAll({
      order: sequelize.col('year')
    })
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
