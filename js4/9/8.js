const fs = require('fs');
let Pesan = { messages: [], file: [] };
fs.readFile('/home/rian/messages.db', 'utf8', (err, data) => {
  if (err) throw err;
  // if(!Pesan.messages.length) return;
  Pesan = JSON.parse(data); 
});
const saveImage = filename => {
  Pesan.file = Pesan.file.concat(filename);
  fs.writeFile('/home/rian/messages.db', JSON.stringify(Pesan), err => {
    if (err) throw err;
    console.log('file saved');
  });
}
const get = (key) => {
  return Pesan[key];
}
const add = (key, msgObj) => {
  Pesan[key].push(msgObj);
  fs.writeFile('/home/rian/messages.db', JSON.stringify(Pesan), (err) => {
    if (err) throw err;
    console.log('messages saved');
  });
}
//add('messages', {name: 'anto', message: 'luar biasa'});
//get('messages');
module.exports = { get: get, add: add, save: saveImage };