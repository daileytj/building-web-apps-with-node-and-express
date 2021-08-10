const express = require('express');
const sessionsData = require('../data/sessions.json');
const sessionsRouter = express.Router();

sessionsRouter.route('/')
  .get((req, res) => {
    res.render('sessions', {
      sessions: sessionsData
    });
  });

sessionsRouter.route('/:id')
  .get((req, res) => {
    const id = req.params.id
    res.render('session', {
      session: sessionsData[id]
    });
  });

module.exports = sessionsRouter;