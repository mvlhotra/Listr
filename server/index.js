const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const sass = require('node-sass-middleware');
const app = express();

const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set("view engine", "ejs")
app.use(cookieSession({
  name: 'session',
  keys: ["TinyAppisanappabouturlshortners"],
}))


app.get("/login/:id", (req, res) => {
  req.session.id = req.params.id;
  res.redirect("/")

});
app.get("/", (req, res) => {

  res.render("home_page");
});

app.get("/towatch", (req, res) => {

  res.render("list_page");
});

app.listen(PORT, () => {
  console.log('listening on ', PORT);
});