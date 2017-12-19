const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const texts = require('./data/texts.json');
let PORT = 8888;

const handleFileRequest = function (fileName, res, onFile, onError) {
  fileName = 'public' + fileName;
  fs.access(fileName, (err) => {
    err ? onError(res) : onFile(fileName, res);
  });
}

const getHeader = function (fileName) {
  let extension = fileName.slice(fileName.lastIndexOf('.'));
  let headers = {
    '.css': 'text/css',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.pdf': 'application/pdf'
  }
  return headers[extension];
}

const saveText = function (text) {
  let data = qs.parse(text);
  data.date = new Date().toLocaleString()
  texts.push(data);
  fs.writeFile('data/texts.json', JSON.stringify(texts,null,2), logError);
};

const addNewText = function (req, res) {
  let postData = '';
  req.on('data', (data) => {
    postData += data;
  });
  req.on('end', () => {
    saveText(postData);
    redirectTo('index.html', res);
  });
};

const getRandomText = function (req,res) {
  let randomIndex = Math.floor(Math.random() * texts.length);
  let text = `var text = "${texts[randomIndex].text.trim()}";`;
  res.write(text);
  res.end();
};

const readFileContent = function (fileName, res) {
  setHeader(res, fileName);
  fs.readFile(fileName, (err, data) => {
    if (!err)
      res.write(data);
    res.end();
  });
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

const redirectTo = function (location, res) {
  res.statusCode = 302;
  res.setHeader('Location', location);
  res.end();
}

const logger = function (req) {
  const time = new Date().toLocaleString();
  console.log(`${time} ${req.method} ${req.url}`);
}

const fileNotFoundError = function (res) {
  res.statusCode = 404;
  res.write("The file you are looking for is not present on this server");
  res.end();
}

const handlers = {
  '/': (req, res) => {
    redirectTo('index.html', res);
  },
  '/addText': addNewText,
  '/text': getRandomText
}

const requestHandler = function (req, res) {
  logger(req);
  let url = req.url;

  let handler = handlers[url];
  if (handler) {
    handler(req, res);
    return
  }
  handleFileRequest(url, res, readFileContent, fileNotFoundError);
};

const server = http.createServer(requestHandler);
server.listen(PORT);
console.log('Listening on port ' + PORT);
