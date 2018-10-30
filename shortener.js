module.exports = function() {
  let out = '';
  const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');

  let count = 0;
  while (count < 6) {
    let chooser = Math.ceil(Math.random() * 2);

    if (chooser === 1) {
      let randIdx = Math.floor(Math.random() * 26);
      out += alphabets[randIdx];
    } else {
      out += Math.ceil(Math.random() * 9);
    }

    count++;
  }

  return out;
};
