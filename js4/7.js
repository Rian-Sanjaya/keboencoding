//Implement /login with one input box for user's name. Now when user goes to /chat, they should only have 1 input box (for their message). Their name is stored in the cookie. If the cookie is not set and they try to visit /chat, redirect them back into /login.
//
//To use cookies, we first import a helper library called cookie-parser: const cookieParser = require('cookie-parser')
//To use the cookie library in our app, we need to call app.use(cookieParser())
//To set a cookie, the server needs to tell the browser about the cookie and to do that we call res.cookie function. The first parameter is the key of the cookie and the second parameter is the value of that key: res.cookie('name', 'song')
//Once a cookie is set, the browser will send the cookie with every request. On the server, retrieve the cookie by calling req.cookies.name.
//If you are using fetch, you must pass in {credentials: 'include'} option to force fetch to send cookies with every request. Example: fetch('/messages, {credentials: 'include'})
//To redirect the browser to the client page using JavaScript, use window.location = "/newLocation". To redirect the browser to another url from the server side, call res.redirect('/newLocation')
//Make sure you are using post requests to send data from now on. First, include body-parser library: bodyParser = require('body-parser')
//Use body parser library: app.use(bodyParser.urlencoded())
//Now, all post requests will have body in their requests req.body

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
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