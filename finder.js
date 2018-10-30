const getLongUrl = (shortUrl, data) => {
  for (let record in data) {
    if (shortUrl == record) {
      return data[record];
    }
  }
};

module.exports = {
  longUrl: getLongUrl
};