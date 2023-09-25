const express = require('express');
const router = express.Router();

const{createTask, readTask, updateTask, deleteTask} = require("../controllers/task");

router.get('/', readTask);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;