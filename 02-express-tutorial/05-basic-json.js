const express = require('express');
const app = express();

const {products} = require('./data.js');

app.get('/', (req, res)=>{
    res.json(products);
}).listen(5000, ()=>{console.log('listening on port 5000');});