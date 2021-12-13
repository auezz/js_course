let http = require('http');
let dt = require('./myfirstmodule');
let url = require('url');
let fs = require('fs');
let uc = require('upper-case');
let rs = fs.createReadStream('./demo.txt');
let events = require('events');
const { EventEmitter } = require('stream');
let eventEmitter = new events.EventEmitter();

//create events handler
let myEventHandler = function(){
    console.log('testtt');
}
//Assign Event handler
eventEmitter.on('scream', myEventHandler);

// Fire the scream event
eventEmitter.emit('scream');

/*
rs.on('open', function(){
    console.log('The file has opened');
});
*/

/*
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(uc.upperCase('aueangkul suwanrattanakorn'));
    res.end();
}).listen(8000);
*/
