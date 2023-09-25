const express = require('express');
const app = express();
// npm install morgan
const morgan = require('morgan');

// app.use(express.static('./public'))

app.use(morgan('short'));
/*
Tiny - GET / 200 13 - 0.363 ms
Short - gives type of request - ::1 - GET / HTTP/1.1 200 13 - 5.528 ms
*/

app.get('/', (req, res)=>{
    res.send('Welcome Home!')
})

app.get('/about', (req, res)=>{
    res.send('About')
})
app.get('/api/products', (req, res)=>{
    res.send('Products')
})
app.get('/api/items', (req, res)=>{
    res.send('Items')
})
app.all('*', (req, res)=>{res.send("That's not a thing")});

app.listen(5000, (req, res)=>{console.log('listening on port 5000')});