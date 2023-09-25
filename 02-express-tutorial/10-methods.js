const express = require('express');
const app = express();
let {people} = require('./data');

// statistic assets
app.use(express.static('./public'));

/*Parse from data built in middleware function in express that parses
incoming requests. If you check req.body without it, then you will
see that the value is undefined.*/
app.use(express.urlencoded({ extended: false}));

// parse form data this works similarly to the url encoded but handles the json
app.use(express.json());

// if they enter this link, a json of the people will be returned
app.get('/api/people', (req, res) =>{
    res.json({success:true, data:people})
});

app.post('/api/people', (req, res) =>{
    // gets content from body of request
    console.log(req.body);
    const {name} = req.body;
    // if the new person has a name, it returns json of the name
    if(name){
        return res.status(201).json({success:true, person:name});
    }
    // if the new person does not have a name
    return res.status(404).json({success:false, msg:'Please provide a name'});
});

// above is for javascript.html
// below is for index.html

app.post('/login', (req,res)=>{
    console.log(req.body);
    const {name} = req.body;
    if(name){
        res.status(201).json({success:true, person:name});
    }
    res.send("Please Provide Credentials");
})

/* Part 1: Above

THe above part brings in the public folder from before nad then handles the index and javascript versions. I placed the JS for the form in a separate js file in the public folder, so we can see that load alongside the html. The /api/people can be test by going to the UR:, but the use is in the script.js where we call the data with async await.

The get for the api/people is for out testing but then the post will be for the request from the script.js
*/


// Testing Postman:
app.post('/api/postman/people', (req,res)=>{
    const {name} = req.body;
    if(!name){
        return res.status(400).json({success:false, data:[], msg:'Please enter a name'});
    }

    // gets id based off previous id
    const ids = people[people.length-1].id + 1

    // makes a new object using the name and id
    const newPerson = {id:ids, name:`${name}`}

    res.status(201).json({success:true, data:[...people,newPerson]});
});

app.put('/api/postman/:id', (req,res)=>{
    const {id} = req.params;
    const {name} = req.body;
    const person = people.find(person=>{return person.id === Number(id)});
    if(!person){
        return res.json({success:false, data:[]});
    }

    const newPeople = people.map(person=>{
        if(person === Number(id)){
            person.name = name;
        }
        return person;
    })

    res.status(200).json({success:true, data:newPeople});
})

// Server Listen
app.listen(5000, ()=>{console.log('Server listening on port 5000')})


// Delete request
app.delete('/api/people/:id', (req, res)=>{
    const {id} = req.params;
    const person = people.find(person=>person.id === Number(id));

    if(!person){
        return res.status(404).json({success:false, msg:'No matching id found'});
    }

    people = people.filter(person=>{
        return person.id != Number(id);
    })
    return res.status(202).json({success:true, data:people});
});