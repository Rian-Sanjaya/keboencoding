// Getting To Know Your Computer, pt. 1 - All Except You!
// Write a script that console.logs all the users inside the /home folder that is not you. Use fs.readdir and read /home directory.

const fs = require('fs');
fs.readdir('/home', (err, dir) => {
  if (err) throw err;
  dir.forEach((el) => (el !== 'rian') ? console.log(el) : '');
});