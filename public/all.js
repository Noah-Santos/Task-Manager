const result = document.querySelector('.result');

const fetchTask = async() =>{
    
    try {
        const {data} = await axios.get('/api/task');
        console.log(data);

        // going through the data array and getting the data that holds the value of data
        const task = data.data.map((tasks)=>{
            return `<input type="checkbox" id="${tasks.id}" name="${tasks.id}" value="${tasks.name}" onclick="checked(${tasks.id})"><label for="${tasks.id}">${tasks.name}: ${tasks.description}</label><br>`;
        })

        result.innerHTML = task.join("");
    }catch(e){
        // formAlert.textContent = e.response.data.msg;
    }
}
fetchTask();

function checked(id){
    let element = document.getElementById(id)
    if(element.checked){
        
    }
}