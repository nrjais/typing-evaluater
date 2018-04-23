const http = require('http');
const app = require('./app.js');
let port = 8888;
const server = http.createServer(app);
server.listen(process.env.PORT||port);
console.log(`server listening at port ${port}`);
