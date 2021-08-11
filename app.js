const express = require('express');
const chalk = require('chalk'); // terminal string styling
const debug = require('debug')('app'); // debugging utility - run 'DEBUG=* node app.js' in terminal to run in debug mode with all message || 'DEBUG=app node app.js' to debug app.js file
const morgan = require('morgan'); // HTTP request logger middleware for node.js
const path = require('path');
const sessionsRouter = require('./src/routers/sessionsRouter');
const adminRouter = require('./src/routers/adminRouter');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('tiny')); // 'combined' gives us a lot of information, 'tiny' gives us minimal information
app.use(express.static(path.join(__dirname, '/public/'))); // middleware that will return index.html from /public/ if it exists, if it doesn't exist, continue...

app.set('views', './src/views');
app.set('view engine', 'ejs');

// if a request to /sessions occurs, use the sessionsRouter
app.use('/sessions', sessionsRouter)
app.use('/admin', adminRouter);

// req = request, res = response
app.get('/', (req, res) => {
  res.render('index', { title: 'Globomantics', data: ['a', 'b', 'c'] });
});

app.listen(PORT, () => {
  debug(`listening on port ${chalk.green(PORT)}`);
});