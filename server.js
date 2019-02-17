require( 'babel-polyfill');
const express = require('express');

const app = express();

app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.listen(3333, () => {
  console.log('Server listening on port: 3333');
});
