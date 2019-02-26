// Implement the simplest no-sql DB in the world. First.... make sure all the previous code is approved and rebased into master, and you are working on a branch with all the code.

// Next, you need to change 7.js so that it is no longer using memory storage, but rather your database!

// const db = require('./8');
// ...
// const messages = db.get('messages')
// ...
// db.add('messages', messageObj)

const fs = require('fs');
let Pesan = { messages: [] };
fs.readFile('/home/rian/messages.db', 'utf8', (err, data) => {
  if (err) throw err;
  // if(!Pesan.messages.length) return;
  Pesan.messages = JSON.parse(data).messages; 
});
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
module.exports = { get: get, add: add };