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

const findLong = function (shortURL) {
  for (let short in urlsDB) {
    if (short === shortURL) {
      return urlsDB[short].longURL;
    }
  }

  return false;
};

const findOrDeleteUserLong = function (userID, shortURL, dryRun = true) {
  for (let short in urlsDB) {
    if (short === shortURL &&
      urlsDB[short].userID === userID) {
      if (dryRun) {
        return urlsDB[short].longURL;
      }

      delete urlsDB[short];
      return true;
    }
  }

  return false;
};

module.exports = {
  add: addURL,
  getURLS: urls,
  debug: urlsDB,
  getLong: findLong,
  userLong: findOrDeleteUserLong
};