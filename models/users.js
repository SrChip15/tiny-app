const users = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
 "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
};

const addUser = function(id, email, password) {
  users[id] = {
    'id': id,
    'email': email,
    'password': password
  };
};

module.exports = {
  getUsers: users,
  add: addUser
};