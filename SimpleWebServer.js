const http = require('http');
function handleRequest(request, response) {
    // localhost:3000/currenttime
    if(request.url === '/currenttime'){
        response.statusCode = 200; // 200 ok, 404 not found
        response.end('<h1>'+ new Date().toISOString() +'</h1>');
    }
    // localhost:3000
    else if(request.url === '/'){
        response.statusCode = 200; // 200 ok, 404 not found
        response.end('<h1>Hello World!</h1>');
    }
}
const server = http.createServer(handleRequest);
server.listen(3000); //port 3000 for testing
//default port 80 (unencrypted) or 443 (encrypted)
