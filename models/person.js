const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Must provide a name'],
        trim: true,
        maxLength: [20, "The name can't exceed 20 chracters"]
    },
    age:{
        type: Number,
        default: 5
    },
})

modules.exports = mongoose.model('Person', personSchema);
Model.find({completed: true});