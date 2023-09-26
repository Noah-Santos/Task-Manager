const result = document.querySelector('.list');

const fetchTask = async() =>{
    
    try {
        const {data} = await axios.get('/api/task');
        console.log(data);
        // going through the data array and getting the data that holds the value of data
        const task = data.data.map((tasks)=>{
            return `<form class="row">
            <div class="grow2"><input type="checkbox" id="item${tasks.id}" name="${tasks.id}" value="${tasks.name}" onclick="checkedTask(${tasks.id})"></div>
            <div class="grow3"><label for="${tasks.id}"><h3>${tasks.name}: ${tasks.description}</h3></label><br></div>
            </form>`;
        })

        result.innerHTML = task.join("");
    }catch(e){
        // formAlert.textContent = e.response.data.msg;
    }
}
fetchTask();

function checkedTask(id){
    let element = document.getElementById(`item${id}`)
    if(element.checked){
        console.log('item done')
        // console.log(taskChange)
        fetch(`/api/task/${id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({completed: true}),
        })
        element.classList.add('completed');
    }else if(!element.checked){
        // console.log('item done')
        // console.log(taskChange)
        fetch(`/api/task/${id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({completed: false}),
        })
        element.classList.remove('completed')
    }
}