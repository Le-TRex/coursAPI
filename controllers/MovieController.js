const sequelize = require("sequelize");
const Movie = require('../models').Movie;
const Producer = require('../models').Producer;
const Genre = require('../models').Genre;

class MovieController {

  async getAll() {
    return Movie.findAll({ include: [Producer, Genre]});
  }

  async getByPage(num) {
    let number = -10
    if(num != "last"){
      number += num * 10
    }else if(num == "last"){
      let amont = await Movie.count()
      number += amont
    }
    return Movie.findAll({ limit: 10, offset: number, include: [Producer, Genre]});
  }

  async getByGenre(id) {
    return Movie.findAll({
      where: {
        genreId: id
      },
      include: [Producer]
    });
  }

  async getById(id) {
    return Movie.findByPk(id);
  }

  async sortByYear() {
    return Movie.findAll({
      order: sequelize.col('year'),
      include: [Producer, Genre]
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
