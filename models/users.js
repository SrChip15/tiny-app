const users = {
  "1a97hg": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur",
    urls: {
      "b2xVn2": "http://www.lighthouselabs.ca",
      "9sm5xK": "http://www.google.com"
    }
  },
  "3x4y5": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk",
    urls: {
      "b2xVn2": "http://www.lighthouselabs.ca",
      "9sm5xK": "http://www.google.com"
    }
  }
};

const addUser = function (id, email, password) {
  users[id] = {
    'id': id,
    'email': email,
    'password': password
  };
  // console.log(users);
};

const addUrl = function (user, shortURL, longURL) {
  for (let user in users) {
    users[user].urls[shortURL] = longURL;
    return true;
  }

  return false;
};

const checkIfExisting = function (email) {
  for (let user in users) {
    let person = users[user];
    if (person.email === email) {
      return true;
    }
  }

  return false;
};

const find = function (userID) {
  for (let user in users) {
    if (users[user].id === userID) {
      return users[user];
    }
  }

  return false;
};

const verifyCredentials = function (email, password) {
  for (let user in users) {
    if (users[user].email === email && users[user].password === password) {
      return true;
    }
  }

  return false;
}


module.exports = {
  getUsers: users,
  add: addUser,
  isNew: checkIfExisting,
  findUser: find,
  addUrl: addUrl,
  verify: verifyCredentials
};