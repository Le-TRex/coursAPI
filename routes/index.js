const producerRouter = require('./Producers');
const movieRouter = require('./Movies');
const genreRouter = require('./Genres');
// var jwt = require('jsonwebtoken');
// let verify = false
module.exports = function(app){
  // app.get('/token', function(req, res){
  //   var token = jwt.sign({username:"superUser"}, 'supersecret');
  //   res.send(token)
  // }),
  // app.get('/api', function(req, res){
  //   var token = req.query.token;
  //   jwt.verify(token, 'supersecret', function(err, decoded){
  //     if(!err){
  //       verify = true
  //     } else {
  //       res.send(err);
  //     }
  //   })
  // })

    app.use('/api', [
      producerRouter,
      movieRouter,
      genreRouter,
    ])

  
};
