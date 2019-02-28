const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const app = express();

const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log('listening on ', PORT);
});