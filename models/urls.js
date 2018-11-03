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

const visitsLogger = function (shortURL, visitorID) {
  for (let short in urlsDB) {
    if (short === shortURL) {
      let today = new Date();
      let time = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()} ${today.getHours()}:${today.getMinutes()} `;

      if (urlsDB[short].visits) {
        urlsDB[short].visits.count += 1;
        urlsDB[short].visits.timestamp.push(time);

      } else {
        urlsDB[short].visits = {
          timestamp: Array.of(time),
          visitor_id: visitorID,
          unique: 1,
          count: 1,
        };
      }
    }
    console.log(urlsDB);
    console.log(urlsDB[short].visits.timestamp);
    return true;
  }
  return false;
};

module.exports = {
  add: addURL,
  getURLS: urls,
  debug: urlsDB,
  getLong: findLong,
  userLong: findOrDeleteUserLong,
  logger: visitsLogger
};