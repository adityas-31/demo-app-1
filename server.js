
const bodyParser = require('body-parser');
const express = require('express');
const pino = require('pino');
const expPino = require('express-pino-logger');
const sleep = require('system-sleep');
const cors = require('cors');


const logger = pino({
  level: 'info',
  prettyPrint: false,
  useLevelLabels: true,
});
const expLogger = expPino({
  logger: logger,
});


const app = express();

app.use(expLogger);
const corsOpts = {
  origin: '*',

  methods: ['GET', 'POST'],

};

app.use(cors(corsOpts));
app.use((req, res, next) => {
  res.set('Timing-Allow-Origin', '*');
  res.set('Access-Control-Allow-Origin', '*');
  next();
});


app.post('/api/v1/user/fail', (req, res) => {
  res.status(500).send('Working');
});

// fire it up!
const port = process.env.USER_SERVER_PORT || '8080';
app.listen(port, () => {
  logger.info('Started on port', port);
});
