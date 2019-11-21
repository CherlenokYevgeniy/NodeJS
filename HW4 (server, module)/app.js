var http = require('http');
var mod = require('./modes.js');
var server = http.createServer(function(request,response){
if(request.url =='/'){
	response.write(mod.first("5"));
	response.end();
}
else if(request.url =='/anotherex'){
	response.write(mod.sec("7"));
	response.end();
}
else if(request.url =='/balance'){
	response.write(mod.sec("{}"));
	response.end();
}

});
server.listen(3000);
console.log('node.js web server at 3000 is running..');
