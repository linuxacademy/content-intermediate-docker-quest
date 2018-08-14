var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {weather: null, error: null});
});

router.post('/', function(req, res, next) {
  let city = req.body.city;
  let url = config.url + `&q=${city}`;
  console.log(url);

  request(url, function(err, response, body) {
    if(err) {
      res.render('index', {weather: null, error: 'Error, please try again!'});
    } else {
      let weather = JSON.parse(body);

      if(weather.main == undefined) {
        res.render('index', {weather: null, error: 'Error, please try again!'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
});

module.exports = router;
