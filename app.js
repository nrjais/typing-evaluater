const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const routes = require(path.resolve('src/routes.js'));

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.set('views','templates');
app.set('view engine','pug');
app.use(express.static('public'));
app.get('/adminPage',function(req,res,next){
  res.render('addPassage',{});
});
app.get('/text',routes.getRandomText);
app.post('/addText',routes.saveText);
module.exports = app;