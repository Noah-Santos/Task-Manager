// const { http } = require('http'), { path } = require('path'), { listen} = 5000, {server} = http.createServer((req, res) => {
    
// })

// HTTP App Template
const http = require('http');
const path = require('path');
const {readFileSync} = require('fs');

// get all files
const homePage = readFileSync(path.join(__dirname, '/public/index.html'));
const kyoto = readFileSync(path.join(__dirname, '/public/kyoto.html'));
const sanDiego = readFileSync(path.join(__dirname, '/public/San Diego.html'));
const tokyo = readFileSync(path.join(__dirname, '/public/tokyo.html'));

const server = http.createServer(function (req, res) {
    const url = req.url;
    console.log(url);

    // Homepage
    if(url === '/'){
        // example of a mime type
        res.writeHead(200, {'content-type': 'text/html'});
        res.write(homePage);
        res.end();
    // kyoto page
    }else if(url === '/kyoto'){
        res.writeHead(200, {'content-type': 'text/html'});
        res.write(kyoto);
        res.end();
    // tokyo page
    }else if(url === '/tokyo'){
        res.writeHead(200, {'content-type': 'text/html'});
        res.write(tokyo);
        res.end();
    // san diego page
    }else if(url === '/San Diego'){
        res.writeHead(200, {'content-type': 'text/html'});
        res.write(sanDiego);
        res.end();
    // error page
    }else{
        res.writeHead(404, {'content-type': 'text/html'});
        res.write('<h1>Page not found</h1>');
        res.end()
    }
})
server.listen(5000);