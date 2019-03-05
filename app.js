'use strict';
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const store = require('./store');
const app = express();

app.use(morgan('dev'));
app.use(cors());

app.get('/apps', (req, res) => {
  const { sort, genre } = req.query;
  let results = store;

  function reqSort(sort) {
    if (sort) {
      if (!['rating', 'app'].includes(sort)) {
        return res.status(400).send('Sort must be a rating or app name');
      }
      if (sort === 'app') {
        results = results.sort((a, b) => {
          const letterA = a.App.toLowerCase();
          const letterB = b.App.toLowerCase();
          return letterA < letterB ? -1 : letterA > letterB ? 1 : 0;
        });
      } else if (sort === 'rating') {
        results = results.sort((a, b) => b.Rating - a.Rating);
      }
    }
  }
  
  function reqGenre(genre) {
    if (genre) {
      if (!['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(genre.toLowerCase())) {
        return res.status(400).send('Genre must be one of Action, Puzzle, Strategy, Casual, Arcade or Card');
      }
      results = results.filter(app => {
        return app.Genres.toLowerCase() === genre.toLowerCase();
      });
    }
  }

  reqSort(sort);
  reqGenre(genre);

  return res.send(results);
});

app.listen(8080, () => {
  console.log('server running');
});

module.exports = app;
