const result = document.querySelector('.result');

const fetchPeople = async() =>{
    try {
        const {data} = await axios.get('/api/people');
        console.log(data);

        // going through the data array and getting the data that holds the value of data
        const people = data.data.map((person)=>{
            return `<h5>${person.name}</h5><button onclick="nameAlter('${person.name}', '${person.id}')">Edit</button><button onclick="deletePerson(${person.id})">Delete</button>`;
        })

        result.innerHTML = people.join("");
    }catch(e){
        // formAlert.textContent = e.response.data.msg;
    }
}
fetchPeople();

// HTML Submit Form
const btn = document.querySelector('.submit-btn');
const input = document.querySelector('.form-input');
const formAlert = document.querySelector('.form-alert');

btn.addEventListener('click', async(event)=>{
    // prevents page from reloading on submit because we are doing something with the data
    event.preventDefault();
    
let nameValue = input.value;
    try{
        if(!editMode){
            const {data} = await axios.post('/api/people', {name: nameValue});
            const h5 = document.createElement('h5');
            h5.textContent = data.person;
            result.appendChild(h5);
            fetchPeople();
        }else{
            console.log(currentId)
            nameValue = input.value
            console.log(nameValue)
            fetch(`/api/people/${currentId}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name: nameValue}),
            })
            fetchPeople();
            editMode = false;
        }
        
        // nameAlter();
    }catch(e){
        console.log(e.response);
        // formAlert.textContent = e.response.data.msg;
    }
    input.value='';
});

var editMode = false;
var currentId = '';

function nameAlter(name, ids){
    editMode = true;
    input.value = name;
    currentId = ids;
}

function deletePerson(id){
    fetch(`/api/people/${id}`, {
        // makes sure that the put function is the one that is grabbed
        method: "DELETE",
        // determines what data to send
        headers: {'Content-Type': 'application/json'},
    })
    fetchPeople();
}