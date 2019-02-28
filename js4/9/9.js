const express = require('express');
const fs = require('fs');
const multer = require('multer');
const upload = multer( {dest: 'public/images/'} );
const db = require('./8');
const app = express();
app.use(express.static('public'));
app.get('/uploadfile', (req, res) => {
  res.json(db.get("file"));
})
app.post('/upload', upload.array('photos'), (req, res) => {
  db.save(req.files);
  res.send('OK');
});
app.listen(4450);