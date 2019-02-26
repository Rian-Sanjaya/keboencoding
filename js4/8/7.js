const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const db = require('./8');

const app = express();

app.use(cookieParser());
//app.use(bodyParser.urlencoded());]
app.use(bodyParser.json());

let username = '';
let messages = [];

const loginHandler = (req, res) => {
  username = req.cookies.name;
  if (username) { 
    res.redirect('/chat');
  } else {
    res.send(`
      <input id='input-name' type='text' placeholder='your name' /><br/>
      <button id='login'>Login</button>
      <script>
        const inputName = document.getElementById('input-name');
        const login = document.getElementById('login');
        login.addEventListener('click', (e) => {
          fetch('https://riansj.jakarta.gs/processLogin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify( {name: inputName.value} )
          })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              window.location = '/chat';
            }
          });
       });
      </script>
    `);
  }
};
const processLogin = (req, res) => {
  const name = req.body.name;
  console.log(name);
  res.cookie('name', name).send({success: true});
};
const chatHandler = (req, res) => {
  username = req.cookies.name;
  if (!username) {
    res.redirect('/login');
  } else {
    res.send(`
      <div>
        <textarea id='message' row=8 cols=50 placeholder='your message'></textarea><br/>
        <button id='send'>Send</button>
        <button id='logout' onclick='willLogout()'>Logout</button>
        <ul id='listMessage'></ul>
        <script>
          const message = document.getElementById('message');
          const sendBtn = document.getElementById('send');
          console.log('ini chat');
          sendBtn.onclick = () => {
            fetch('https://riansj.jakarta.gs/newMessage', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({message: message.value})
            })
            .then( res => res.json() )
            .then( data => {
              message.value = '';
            });
          };
          setInterval( () => {
            fetch('https://riansj.jakarta.gs/messages')
            .then(res => res.json())
            .then(data => {
              const listMessage = data.reduce( (acc, val) => {
                return acc + '<li>' + val.name + ': ' + val.message + '</li>'
              }, '');
              document.getElementById('listMessage').innerHTML = listMessage;
            });
          }, 1000);
          const willLogout = () => {
            console.log('will logout');
            fetch('https://riansj.jakarta.gs/logout')
            .then(res => res.json())
            .then(data => {if (data.success) window.location = '/login'});
          };
        </script>
      </div>
    `);
  }
};
const handleSend = (req, res) => {
  messages.push( {name: req.cookies.name, message: req.body.message} );
  res.json(messages);
};
const displayMessages = (req, res) => {
  username = req.cookies.name;
  if (!username) res.redirect('/login');
  res.json(messages);
};
const logoutHandler = (req, res) => {
  res.clearCookie('name').json({success: true});
};
app.get('/login', loginHandler);
app.post('/processLogin', processLogin);
app.get('/chat', chatHandler);
app.post('/newMessage', handleSend);
app.get('/messages', displayMessages);
app.get('/logout', logoutHandler);
app.listen(4450);