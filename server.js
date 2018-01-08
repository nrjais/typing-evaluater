const http = require('http');
const fs = require('fs');
let texts = [];
const webApp = require('./webapp');
let PORT = 8888;

const app = webApp();

let loadTexts = function () {
  fs.readFile('./data/texts.json', (err, data) => {
    if (err) texts = [];
    else texts = JSON.parse(data);
  });
}
loadTexts();

const getHeader = function (fileName) {
  let extension = fileName.slice(fileName.lastIndexOf('.'));
  let headers = {
    '.css': 'text/css',
    '.html': 'text/html',
    '.js': 'text/javascript'
  }
  return headers[extension];
}

const saveText = function (req, res) {
  let data = req.body;
  data.date = new Date().toLocaleString()
  texts.push(data);
  fs.writeFile('data/texts.json', JSON.stringify(texts, null, 2), logError);
  res.redirect('/index.html');
};

const getRandomText = function (req, res) {
  let randomIndex = Math.floor(Math.random() * texts.length);
  let text = `var text = "${texts[randomIndex].text.trim()}";`;
  res.setHeader('content-type', 'text/javascript');
  res.write(text);
  res.end();
};

const serveFile = function (req, res) {
  try {
    fileName = 'public' + req.url;
    let data = fs.readFileSync(fileName);
    setHeader(res, fileName);
    res.write(data);
    res.end();
  } catch (e) {
    return;
  }
}

const setHeader = function (res, fileName) {
  let header = getHeader(fileName);
  if (header)
    res.setHeader('Content-Type', header);
}

const logError = function (err) {
  if (err)
    console.log(err);
}

const logRequest = function (req) {
  const time = new Date().toLocaleString();
  console.log(`${time} ${req.method} ${req.url}`);
}

app.use(logRequest);
app.use(serveFile);
app.get('/', (req, res) => res.redirect('index.html'));
app.get('/text', getRandomText);
app.post('/addText', saveText);

const server = http.createServer(app);
server.listen(PORT);
console.log('Listening on port ' + PORT);
