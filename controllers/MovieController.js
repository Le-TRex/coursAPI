const sequelize = require("sequelize");
const Movie = require('../models').Movie;

class MovieController {

  
  async getAll() {
    return Movie.findAll();

  }

  async getByPage(num) {
    let number = -10
    if(num != "last"){
      number += num * 10
    }else if(num == "last"){
      let amont = await Movie.count()
      number += amont
    }
    return Movie.findAll({ limit: 10, offset: number});
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
