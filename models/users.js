const users = {
  "1a97hg": {
    id: "1a97hg",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },

  "3x4y5": {
    id: "3x4y5",
    email: "user2@example.com",
    password: "dishwasher-funk"
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
    if (user === userID) {
      return users[user];
    }
  }

  return false;
};

const verifyCredentials = function (email, password) {
  for (let user in users) {
    if (users[user].email === email && users[user].password === password) {
      return users[user];
    }
  }

  return false;
};


module.exports = {
  getUsers: users,
  add: addUser,
  isNew: checkIfExisting,
  findUser: find,
  verify: verifyCredentials
};