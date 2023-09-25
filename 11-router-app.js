const express = require('express');
require('dotenv').config();
require('./db/connect');
const app = express();

const task = require('./routes/task-controller');
const auth = require('./routes/auth');
const connectDB = require('./db/connect');

// static assets
app.use(express.static('./public'));
// parse from data
app.use(express.urlencoded({ extended: false }));
// parse JSON data
app.use(express.json());

// routes/router
app.use('/api/task', task);
app.use('/login', auth);

// Server Listen
const initServer = async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(5000, ()=>{
            console.log('Server listening on port 5000')
        });
    }catch(e){
        console.log(e);
    }
}

initServer();