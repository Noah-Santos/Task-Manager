const result = document.querySelector('.result');

const fetchTask = async() =>{
    try {
        const {data} = await axios.get('/api/task');
        console.log(data);

        // going through the data array and getting the data that holds the value of data
        const task = data.data.map((tasks)=>{
            return `<h5>${tasks.name}</h5><button onclick="nameAlter('${tasks.name}', '${tasks.id}', '${tasks.description}')">Edit</button>`;
        })

        result.innerHTML = task.join("");
    }catch(e){
        // formAlert.textContent = e.response.data.msg;
    }
}
fetchTask();

// HTML Submit Form
const btn = document.querySelector('.submit-btn');
const input = document.querySelector('.form-input');
const input2 = document.querySelector('#newDescription');
const formAlert = document.querySelector('.form-alert');

btn.addEventListener('click', async(event)=>{
    // prevents page from reloading on submit because we are doing something with the data
    event.preventDefault();
    
let nameValue = input.value;
let descValue = input2.value;
    try{
        if(!editMode){
            const {data} = await axios.post('/api/task', {name: nameValue,description:descValue});
            const h5 = document.createElement('h5');
            h5.textContent = data.tasks;
            result.appendChild(h5);
            fetchTask();
        }else{
            console.log(currentId)
            console.log(nameValue)
            console.log(descValue);
            fetch(`/api/task/${currentId}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name: nameValue, description: descValue}),
            })
            fetchTask();
            editMode = false;
        }
        
        // nameAlter();
    }catch(e){
        console.log(e.response);
        // formAlert.textContent = e.response.data.msg;
    }
    input.value='';
    input2.value='';
});

var editMode = false;
var currentId = '';

function nameAlter(name, ids, desc){
    editMode = true;
    input.value = name;
    input2.value = desc;
    currentId = ids;
}
