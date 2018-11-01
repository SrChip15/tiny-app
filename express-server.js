const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const shortener = require('./shortener');
const finder = require('./finder');
const PORT = 3030;
const COOKIE_NAME = 'username';

let urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// login submit button takes this route
app.get('/login', (req, res) => {
  res.render('urls-login');
});

app.post('/login', (req, res) => {
  res.cookie(COOKIE_NAME, req.body.username);
  res.redirect('/urls');
});

// home page request
app.get('/urls', (req, res) => {
  let templateVars = {
    username: req.cookies[COOKIE_NAME],
    urls: urlDatabase
  };
  res.render('urls-home', templateVars);
});

// post user supplied long URL & redirect to home page
app.post('/urls', (req, res) => {
  if (req.body.longURL) {
    let key  = shortener();
    urlDatabase[key] = req.body.longURL;
    // console.log(urlDatabase);
  }

  res.redirect('/urls');

});

app.post('/logout', (req, res) => {
  res.clearCookie(COOKIE_NAME);
  urlDatabase = {}; // dump user data
  res.redirect('/login');
});

// append short URL to print the long URL on screen
app.get('/urls/:id', (req, res) => {
  let templateVars = {
    shortUrl: req.params.id,
    longURL: finder.longUrl(req.params.id, urlDatabase)
  };
  res.render('urls-show', templateVars);
});

app.post('/urls/:id', (req, res) => {
  let url = finder.longUrl(req.params.id, urlDatabase);
  // Add UPDATED value to DB
  urlDatabase[req.params.id] = url;
  res.redirect('/urls');
});

app.post('/urls/:id/update', (req, res) => {
  urlDatabase[req.params.id] = req.body.longURL;
  res.redirect('/urls');
});

app.post('/urls/:id/delete', (req, res) => {
  // console.log(req.params.id);
  delete urlDatabase[req.params.id];
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