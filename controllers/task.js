let {task} = require('../data');

// get function for all task
const readTask = (req,res)=>{
    res.json({success:true, data:task});
}

// post function for creating task
const createTask = (req,res)=>{
    const {name, description} = req.body;
    if(!name){
        return res.status(400).json({success:false, data:[], msg:'Please enter a name'});
    }

    // gets id based off previous id
    const ids = task[task.length-1].id + 1;

    // makes a new object using the name and id
    const newPerson = {id:ids, name:name, description:description, completed:false};

    task.push(newPerson)

    res.status(201).json({success:true, data:[task]});
}

// put function for update task
const updateTask = (req,res)=>{
    const {id} = req.params;
    const {name, description, completed} = req.body;
    console.log(name + " " + id )
    const tasks = task.find(tasks=>{return tasks.id === Number(id)});
    if(!tasks){
        return res.json({success:false, data:[]});
    }

    const newTask = task.map(tasks=>{
        if(tasks.id === Number(id)){
            tasks.name = name;
            tasks.description = description;
            tasks.completed = completed;
        }
        return tasks;
    })

    res.status(202).json({success:true, data:newTask});
}

// delete function for delete task
const deleteTask = (req,res)=>{
    const {id} = req.params;
    const tasks = task.find(tasks=>tasks.id === Number(id));

    if(!tasks){
        return res.status(404).json({success:false, msg:'No matching id found'});
    }

    task = task.filter(tasks=>{
        return tasks.id != Number(id);
    })
    return res.status(202).json({success:true, data:task});
}

module.exports = {readTask, createTask, updateTask, deleteTask};