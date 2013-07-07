var url = require('url');
var http = require('http');

http.createServer(function (request, response) {
  
  var url_parts = url.parse(request.url, true);
  var query = url_parts.query;
  console.log(url_parts);
  
  if( url_parts.pathname == '/login' ){
	  response.writeHead(200, {'Content-Type': 'text/plain'});
  	  if( login(query.name) ){
		response.end('Oi \n' + query.name);
  	  } else {
		response.end('não mesmo... \n' );
  	  }
  } else {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('hu ??\n' );
  }
  
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

function login(name){
	console.log('tentando login com : ' + name );
	if( name == 'davi'){
		return true;	
	} else {
		return false;
	}

}
