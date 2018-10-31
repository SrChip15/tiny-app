const express = require('express');
const app = express();
const bodyParser = require("body-parser");
// const cookieParser = require('cookie-parser');
const shortener = require('./shortener');
const finder = require('./finder');
const PORT = 3030;

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
// app.use(cookieParser());

// login submit button takes this route
app.get('/login', (req, res) => {
  res.cookie('username', req.body.username);
  res.render('urls-login');
});

// prints the URL database as a html table
app.get('/urls', (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render('urls-home', templateVars);
});

// accept user supplied long URL and shorten & write to database
app.post('/urls', (req, res) => {
 let key  = shortener();
 urlDatabase[key] = req.body.longURL;
 console.log(urlDatabase);
 res.send(`Success!New entry: ${key}: ${req.body.longURL}`);
 res.redirect('/urls');
});

// redirects short URL to its corresponding long url
app.get('/u/:shortUrl', (req, res) => {
  if (req.params.shortUrl) {
    // redirect only when a non-empty short url is supplied
    let longUrl = finder.longUrl(req.params.shortUrl, urlDatabase);

    if (longUrl) {
      //  permanent redirect only when short url exists
      res.redirect(301, longUrl);
    }
  }
});

// when user does not properly pass in the res path
// redirect to the login page
app.get('/', (req, res) => {
  res.redirect('/login');
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

/* // main page - enter long url
app.get('/urls/new', (req, res) => {
  res.render('urls-home');
}); */

/* // append short URL to print the long URL on screen
app.get('/urls/:id', (req, res) => {
  let templateVars = {
    shortUrl: req.params.id,
    data: urlDatabase
  };
  res.render('urls-show', templateVars);
}); */

/* EXAMPLE STUFF

/* app.get('/', (req, res) => {
  res.send("Hello!");
});

// prints the URL as a JSON object on screen
app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

// example literal HTML response
app.get('/hello', (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});
*/