const urlsDB = {
  "b2xVn2": {
    userID: '1a97hg',
    longURL: 'http://www.lighthouselabs.ca'
  },

  "9sm5xK": {
    userID: '1a97hg',
    longURL: "http://www.google.com"
  }
};

const urls = (userID) => {
  let output = {};
  for (let url in urlsDB) {
    if (urlsDB[url].userID === userID) {
      output[url] = urlsDB[url].longURL;
    }
  }

  return output;
};

const addURL = function (shortURL, userID, longURL) {
  urlsDB[shortURL] = {
    userID: userID,
    longURL: longURL
  };
};

module.exports = {
  add: addURL,
  getURLS: urls,
  debug: urlsDB
};