//Create a server so that when you visit /newMessage?name=eucaeu&message=hello the data you pass through the URL gets stored into an array. Display those names and messages as json data when you go to /messages.

//You can get the url data from an incoming request by doing req.query. For example, to get the name you should run req.query.name
//For sending back your messages, you should send it back with a standard data format known as json by calling res.json(messages)

const express = require('express');
const app = express();
let chats = [];
const newMessage = (req, res) => {
  const newM = { name: req.query.name, message: req.query.message};
  chats.push(newM);
};
const messages = (req, res) => {
  res.json(chats);
}
app.get('/newMessage', newMessage);
app.get('/messages', messages);
app.listen(4450);