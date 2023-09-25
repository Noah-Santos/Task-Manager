const http = require('http');
const path = require('path');

const server = http.createServer(function (req, res) {
    console.log(req.method);
    const url = req.url;
    // home page
    if(url == '/'){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Home Page of Noah</h1>');
        res.end();
    }
    // about page
    else if(url == '/about'){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>About Page of Noah</h1>');
        res.end();
    }
    // 404
    else{
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1>I guess NOT: 404</h1>');
        res.end();
    }
}).listen(6000);