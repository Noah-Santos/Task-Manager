let {people} = require('../data');

// get function for all people
const readPeople = (req,res)=>{
    res.json({success:true, data:people});
}

// post function for creating people
const createPeople = (req,res)=>{
    const {name} = req.body;
    if(!name){
        return res.status(400).json({success:false, data:[], msg:'Please enter a name'});
    }

    // gets id based off previous id
    const ids = people[people.length-1].id + 1;

    // makes a new object using the name and id
    const newPerson = {id:ids, name:name    };

    people.push(newPerson)

    res.status(201).json({success:true, data:[people]});
}

// put function for update people
const updatePeople = (req,res)=>{
    const {id} = req.params;
    const {name} = req.body;
    console.log(name + " " + id )
    const person = people.find(person=>{return person.id === Number(id)});
    if(!person){
        return res.json({success:false, data:[]});
    }

    const newPeople = people.map(person=>{
        if(person.id === Number(id)){
            person.name = name;
        }
        return person;
    })

    res.status(202).json({success:true, data:newPeople});
}

// delete function for delete people
const deletePeople = (req,res)=>{
    const {id} = req.params;
    const person = people.find(person=>person.id === Number(id));

    if(!person){
        return res.status(404).json({success:false, msg:'No matching id found'});
    }

    people = people.filter(person=>{
        return person.id != Number(id);
    })
    return res.status(202).json({success:true, data:people});
}

module.exports = {readPeople, createPeople, updatePeople, deletePeople};