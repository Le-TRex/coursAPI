const producerRouter = require('./Producers');
const movieRouter = require('./Movies');
const genreRouter = require('./Genres');

module.exports = function(app){
  app.use('/api', [
    producerRouter,
    movieRouter,
    genreRouter
  ]);
};
