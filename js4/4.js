//Create an express server that sends all the users (that is not you) wrapped in <h3> user </h3> tag when you visit XXXX.garagescript.org/users.

const fs = require("fs");
const express = require("express")
const app = express();
const handler = (req, res) => {
  console.log(req);
  fs.readdir('/home', (err, dir) => {
    if (err) throw err;
    
    const users = dir.filter( name => name !== 'rian' ).join('<br/>');
    res.send(`<h3>${users}</h3>`);
  });
};
app.get('/users', handler);
app.listen(4450);