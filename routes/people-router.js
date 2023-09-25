const express = require('express');
const router = express.Router();

// Below here is to work with the router application

let {people} = require('../data');

router.get('/', (req,res)=>{
    res.json({success:true,data:people});
});

router.post('/', (req,res)=>{
    console.log(req.body);
    const {name} = req.body;
    if(name){
        return res.status(201).json({success:true,person:name});
    }
    res.status(404).json({success:false,msg:'Please provide a name'});
});

// put request
router.put('/:id', (req,res)=>{
    const {id} = req.params;
    const {name} = req.body;
    const person = people.find((person)=>person.id === Number(id));
    if(!person){
        return res.json({success:false, data:[]});
    }

    const newPeople = people.map(person=>{
        if(person === Number(id)){
            person.name = name;
        }
        return person;
    })

    res.status(202).json({data:newPeople, success:true});
})

// delete request
router.delete('/:id', (req, res)=>{
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


module.exports = router;