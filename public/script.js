const results = document.querySelector('.results');

const fetchTask = async() =>{
    try {
        const {data} = await axios.get('/api/task');
        console.log(data);

        // going through the data array and getting the data that holds the value of data
        const task = data.data.map((tasks)=>{
            return `<option value="${tasks.name}">${tasks.name}</option>`;
        })

        results.innerHTML = task.join("");

        change();
    }catch(e){
        // formAlert.textContent = e.response.data.msg;
    }
}
fetchTask();

// HTML Submit Form
const btn = document.querySelector('.submit-btn');
const input = document.querySelector('.form-input');
const input2 = document.querySelector('#description');
const formAlert = document.querySelector('.form-alert');
let task = document.querySelector('.task');
let description = document.querySelector('.description');

async function change(){
    let {data} = await axios.get('/api/task');
    task.innerHTML = results.value;
    data.data.find(task =>{
        console.log(task.name)
        console.log(task.description)
        if(task.name == results.value){
            description.innerHTML = task.description;
        }
    })
}

btn.addEventListener('click', async(event)=>{
    // prevents page from reloading on submit because we are doing something with the data
    event.preventDefault();
    
let nameValue = input.value;
let descValue = input2.value;
    try{
        const {data} = await axios.post('/api/task', {name: nameValue,description:descValue});
        const h5 = document.createElement('h5');
        h5.textContent = data.tasks;
        results.appendChild(h5);
        fetchTask();
    }catch(e){
        console.log(e.response);
        // formAlert.textContent = e.response.data.msg;
    }
    input.value='';
    input2.value='';
});

function deleteTask(){
    async(event)=>{
        let delName = document.getElementById('#nameDel').value;
        // let id = 
        // console.log(delName);
        fetch(`/api/task/${delName}`, {
            // makes sure that the put function is the one that is grabbed
            method: "DELETE",
            // determines what data to send
            headers: {'Content-Type': 'application/json'},
        })
        fetchTask();
    }
}