//////GLOBAL path
global.basedir = __dirname;

const express = require('express');
const path = require('path');
const engine = require('ejs-mate');
const http = require('http');
const routes = require('./routes');

const app = express();

// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, '/app/engine'));
app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/app/public'));

const server = http.createServer(app);
const port = process.env.PORT || 453;

app.use('/', routes)

server.listen(port, () => {
	console.log('Server listening at port %d', port);
});

