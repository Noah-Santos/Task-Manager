const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

//setup static middleware
// Middleware comes in the middle of the request and response cycle of the node.js execution. It also provides access to many functions like request and response object.

/* Response Object is passed as the second parameter to the requestListener function. The response object represents the writable string back to the client.
--write() sends text or text stream to the client
--writeHead() sends status and response headers to the client
--end() signals that the server should consider that the response is complete
--getHeader() returns the value of the specified header
--setTimeOut - sets the timeout value of the socket to the specified value in milliseconds
--statusCode - sets the status code that will be sent to the client

For the writeHead and the statusCode methods, the Following are acceptable:
100-199 Information response
200-299 Successful response
300-399 Redirect message
400-499 Client error
500-599 Server error
You can find the details list @https://developer.mozilla.org/en-US/docs/Web/HTTP/Status


// Request Object is made by a client to a named host which is located on the server. The aim of the request is to access resources on the server. 
A proper HTTP request contains the following:
--A request line
--A series of HTTP header(s)
--A message body if needed

Request line has 3 main aspects:
--A method like GET,UPDATE,DELETE...etc tells the server what it should do with the resource
--The path component identifies the resource on the server
--The HTTP version number showing what specification to which the client has tried to make the message comply

HTTP Headers:
HTTP headers are written on a message to provide the reipient with the information about the request, the sender, and the way in which the sender wants to communicate woth the server/recipient.
Ex. {'content-type': 'text/html'},
-host, user-agent...etc
*/

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    console.log(req.url);
    res.sendFile(path.resolve(__dirname, '/public/stuff.html'));
})

app.get('*', (req, res) => {
    res.status(404).send('404 Not Found- And You Suck')   
});

app.listen(5000, () =>{
    console.log('Server is listening on port 5000');
});