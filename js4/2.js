// Write a script that creates a file users.txt that contains all the users inside the /home folder that is not you.
// 1. fs.writeFile takes in 3 parameters: (string) File path to be written into, (string) data to write into file, and a function to be called when fs has completed writing.
// 2. __dirname will give you the current directory of the file. To write to a file called users.txt, use __dirname + '/users.txt'

const fs = require('fs');

fs.readdir('/home', (err, dir) => {
  if (err) throw err;
  const users = dir.filter( name => name !== 'rian' ).join('\n');
  fs.writeFile('/home/rian/users.txt', users, (err) => {
    if (err) throw err;
  });
})