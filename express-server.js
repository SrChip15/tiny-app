const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const shortener = require('./shortener');
const users = require('./models/users');
const urlDB = require('./models/urls');
const bcrypt = require('bcrypt');
const PORT = 3030;
const COOKIE_NAME = 'user_id';

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

app.get('/register', (req, res) => {
  if (req.cookies[COOKIE_NAME]) {
    // already registered for session
    res.redirect('/urls');
  } else {
    res.render('urls-register');
  }
});

app.post('/register', (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send("Email or Password field cannot be empty");

  } else if (users.exists(req.body.email)) {
    res.status(400);
    res.redirect('/login');

  } else {
    let randomId = shortener();
    users.add(randomId, req.body.email, bcrypt.hashSync(req.body.password, 10));
    res.cookie(COOKIE_NAME, randomId);
    res.redirect('/urls');
  }
});

// login submit button takes this route
app.get('/login', (req, res) => {
  res.render('register-login');
});

app.post('/login', (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send("Email or Password field cannot be empty");
  }

  // verify credentials
  let user = users.verify(req.body.email, req.body.password);

  if (user) {
    res.cookie(COOKIE_NAME, user.id);
    res.redirect('/urls');
  } else {
    // new user
    res.redirect('/register');
  }

});

// home page request
app.get('/urls', (req, res) => {
  if (req.cookies[COOKIE_NAME]) {
    let templateVars = {
      user: users.findUser(req.cookies[COOKIE_NAME]),
      urls: urlDB.getURLS(req.cookies[COOKIE_NAME])
    };

    res.render('urls-home', templateVars);
  } else {
    res.redirect('/register');
  }
});

// post user supplied long URL & redirect to home page
app.post('/urls', (req, res) => {
  if (req.body.longURL) {
    let key = shortener();
    let user = users.findUser(req.cookies[COOKIE_NAME]);
    urlDB.add(key, user.id, req.body.longURL);
  }

  res.redirect('/urls');

});

app.post('/logout', (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.redirect('/login');
});

// single URL view page {GET}
app.get('/urls/:id', (req, res) => {
  // display only short and long URLs associated with the current user
  let user = users.findUser(req.cookies[COOKIE_NAME]);
  let url = urlDB.userLong(req.cookies[COOKIE_NAME], req.params.id);

  if (user) {
    // logged-in instance
    if (url) {
      let templateVars = {
        user: user, // if need be
        shortURL: req.params.id,
        longURL: url

      };

      res.render('urls-show', templateVars);

    } else {
      // current user does not have this short URL in her/his context
      res.status(400).send("ID does not exist");
    }

  } else {
    // force register/login
    res.status(402);
    res.redirect('/login');
  }

});

//  update endpoint {POST}
app.post('/urls/:id', (req, res) => {
  // Add UPDATED value to DB
  let user = users.findUser(req.cookies[COOKIE_NAME]);
  let url = urlDB.userLong(req.cookies[COOKIE_NAME], req.params.id);

  if (user && url) {
    urlDB.add(req.params.id, user.id, req.body.longURL);
    res.redirect('/urls');

  } else {
    // not a registered user/logged-in user; redirect to register/login
    res.status(400);
    res.redirect('/login');
  }
});

app.post('/urls/:id/delete', (req, res) => {
  let user = users.findUser(req.cookies[COOKIE_NAME]);

  if (user) {
    if (urlDB.userLong(req.cookies[COOKIE_NAME], req.params.id, false)) {
      res.redirect('/urls');
    } else {
      // current user does not have this short URL in her/his context
      res.status(402);
      res.redirect('/urls');
    }

  } else {
    // not a registered/logged-in user, YOU SHALL NOT PASS
    res.status(402);
    res.redirect('/login');
  }
});

// redirects short URL to its corresponding long url
app.get('/u/:shortUrl', (req, res) => {
  if (req.params.shortUrl) {
    // redirect only when a non-empty short url is supplied
    let longUrl = urlDB.getLong(req.params.shortUrl);

    if (longUrl) {
      //  permanent redirect only when short url exists
      res.redirect(302, longUrl);
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