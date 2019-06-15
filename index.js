const express = require('express');
const configFile=require('./configFolder/config');
const app = express();
const mongoose=require('mongoose');
const fs=require('fs');
const bodyparser=require('body-parser');
const cookieparser=require('cookie-parser');
const middleware=require('./Middleware/errorHandler')
const http=require('http');
const logger=require('./Library/LoggerResponse');
const path=require('path');
const cors=require('cors');

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))
app.use(cookieparser())
app.use(cors());
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, '../Angular/src')));


//Model path
let mymodel='./Model';
fs.readdirSync(mymodel).forEach(function(file){
    if(~file.indexOf('.js'))
    {
    console.log('Including models....');
    console.log(mymodel+'/'+file);
    require(mymodel+'/'+file);
    }
})

//Route path
let route='./routeFolder';
fs.readdirSync(route).forEach(function(file){
    if(~file.indexOf('.js'))
    {
        console.log('Including following route file.....');
        console.log(route+'/'+file);
        let routerImport=require(route+'/'+file);
        routerImport.setRouter(app);
    }
})

//Global error handler
app.use(middleware.globalerrorHandler);

const server = http.createServer(app);
// start listening to http server
console.log(configFile);
server.listen(configFile.port);
server.on('error', onError);
server.on('listening', onListening);
const socket=require("./Library/socket");
const serverconnect=socket.setserver(server);

function onError(error) {
  if (error.syscall !== 'listen') {
    Logger.error(error.code + ' not equal listen', 'serverOnErrorHandler', 10)
    throw error;
  }
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
          logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10);
          process.exit(1);
          break;
        default:
          logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10);
          throw error;
      }

}
function onListening() {
  
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  ('Listening on ' + bind);
  logger.info('server listening on port' + addr.port, 'serverOnListeningHandler', 10);
mongoose.set('useCreateIndex',true);
let db=mongoose.connect(configFile.url.uri,{useNewUrlParser:true});
}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
  });

//Mongoose error handling part..
mongoose.connection.on('error',function(err){
    console.log('Database connection error');
    console.log(err);
})
mongoose.connection.on('open',function(err){
    if(err)
    {
        console.log('Database connection error')
    }
    else{
        console.log('Connection successfully created');
    }
})
