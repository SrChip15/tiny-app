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
  // console.log(users);
};

const checkIfExisting = function(password) {
  for (let user in users) {
    let person = users[user];
    if (person.password === password) {
      return true;
    }
  }

  return false;
};

module.exports = {
  getUsers: users,
  add: addUser,
  isNew: checkIfExisting
};