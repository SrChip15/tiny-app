const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const shortener = require('./shortener');
const PORT = 3030;

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/urls/new', (req, res) => {
  res.render('urls-new');
});

app.get('/urls/:id', (req, res) => {
  let templateVars = {
    shortUrl: req.params.id,
    data: urlDatabase
  };
  res.render('urls-show', templateVars);
});

app.get('/', (req, res) => {
  res.send("Hello!");
});

app.get('/urls', (req, res) => {
  let templateVars = {
    urls: urlDatabase
  };
  res.render('urls-index', templateVars);
});

app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

app.get('/hello', (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.post('/urls', (req, res) => {
  console.log(req.body);
  res.send(`Ok. Short Url: ${shortener()}`);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});