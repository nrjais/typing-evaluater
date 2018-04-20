const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
let texts = [];

let loadTexts = function () {
  let data = fs.readFileSync('./data/texts.json','utf8');
  texts = JSON.parse(data);
}
loadTexts();

const getRandomText = function (req, res) {
  let randomIndex = Math.floor(Math.random() * texts.length);
  let text = `var text = "${texts[randomIndex].text.trim()}";`;
  res.setHeader('content-type', 'text/javascript');
  res.write(text);
  res.end();
};

const saveText = function (req, res) {
  let data = req.body;
  data.date = new Date().toLocaleString()
  texts.push(data);
  fs.writeFileSync('data/texts.json', JSON.stringify(texts, null, 2));
  res.redirect('/index.html');
};

app.use(express.json());
app.use(express.static('public'));
app.get('/text',getRandomText);
app.post('/addText',saveText);
module.exports = app;