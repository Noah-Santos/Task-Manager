const express = require('express');
const router = express.Router();

// Below here is to work with the router application

let {task} = require('../data');

router.get('/', (req,res)=>{
    res.json({success:true,data:task});
});

router.post('/', (req,res)=>{
    console.log(req.body);
    const {name} = req.body;
    if(name){
        return res.status(201).json({success:true,tasks:name});
    }
    res.status(404).json({success:false,msg:'Please provide a name'});
});

// put request
router.put('/:id', (req,res)=>{
    const {id} = req.params;
    const {name} = req.body;
    const tasks = task.find((tasks)=>tasks.id === Number(id));
    if(!tasks){
        return res.json({success:false, data:[]});
    }

    const newTask = task.map(tasks=>{
        if(tasks === Number(id)){
            tasks.name = name;
        }
        return tasks;
    })

    res.status(202).json({data:newTask, success:true});
})

// delete request
router.delete('/:id', (req, res)=>{
    const {id} = req.params;
    const tasks = task.find(tasks=>tasks.id === Number(id));

    if(!tasks){
        return res.status(404).json({success:false, msg:'No matching id found'});
    }

    task = task.filter(tasks=>{
        return tasks.id != Number(id);
    })
    return res.status(202).json({success:true, data:task});
});


module.exports = router;