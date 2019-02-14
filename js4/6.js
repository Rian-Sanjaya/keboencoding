// simple chatroom

const express = require('express');
const app = express();
let messages = [];

const inputChat = (req, res) => {
  res.send(`
    <div>
      <input id="name" type="text" placeholder='your name' /><br/>
      <textarea id="message" rows=8 cols=50 placeholder='your message'></textarea><br/>
      <button id="send">Send</button>
      <ul id='listMessage'></ul>
    </div>
    <script>
      const name = document.getElementById('name');
      const message = document.getElementById('message');
      const sendBtn = document.getElementById('send');
      
      sendBtn.onclick = () => {
        fetch('https://riansj.jakarta.gs/newMessage?name=' + name.value + '&message=' + message.value)
        .then( res => res.json() )
        .then( data => { 
          const listMessage = data.reduce( (acc, val) => { 
            return acc + '<li>' + val.name + ': ' + val.message + '</li>';
          }, '');
          document.getElementById('listMessage').innerHTML = listMessage;
        });
      };
      setInterval( () => {
        fetch('https://riansj.jakarta.gs/messages')
        .then( res => res.json() )
        .then( data => {
          const listMessages = data.reduce( (acc, val) => {
            return acc + '<li>' + val.name + ': ' + val.message + '</li>'
          }, '');
          document.getElementById('listMessage').innerHTML = listMessages;
        });
      }, 1000);
     
    </script>
  `);
};

const handleSend = (req, res) => {
  messages.push( {name: req.query.name, message: req.query.message} );
  res.json(messages);
};

const displayMessages = (req, res) => {
  res.json(messages);
};

app.get('/chat', inputChat);
app.get('/newMessage', handleSend);
app.get('/messages', displayMessages);

app.listen(4450);