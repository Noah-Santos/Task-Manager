const result = document.querySelector('.list');

const fetchTask = async() =>{
    
    try {
        const {data} = await axios.get('/api/task');
        // going through the data array and getting the data that holds the value of data

        let task = data.data.map(tasks =>{
            if(tasks.completed){
                return `
                <form class="allRow completedForm">
                    <div class="taskAll">
                        <label for="${tasks.id}" class="info completed">
                            <h2>${tasks.name}</h2><h3>${tasks.description}</h3>
                        </label>
                    </div>
                    <div class="finish">
                        <h4 class="marginGone">Completed:</h4>
                        <input type="checkbox" id="item${tasks.id}" name="${tasks.id}" value="${tasks.name}" onclick="checkedTask(${tasks.id})" checked>
                    </div>
                </form>`;
            }else if(!tasks.completed){
                return `
                <form class="allRow">
                    <div class="taskAll">
                        <label for="${tasks.id}" class="info">
                            <h2>${tasks.name}</h2>
                            <h3>${tasks.description}</h3>
                        </label>
                    </div>
                    <div class="finish">
                        <h4 class="marginGone">Completed:</h4>
                        <input type="checkbox" id="item${tasks.id}" name="${tasks.id}" value="${tasks.name}" onclick="checkedTask(${tasks.id})">
                    </div>
                </form>`;
            }
        })
        data.data.map((tasks)=>{
            
        })

        result.innerHTML = task.join("");
    }catch(e){
        // formAlert.textContent = e.response.data.msg;
    }
}
fetchTask();

async function checkedTask(id){
    let element = document.getElementById(`item${id}`);
    const {data} = await axios.get('/api/task');
    let name = '';
    let description = '';

    data.data.map(task=>{
        if(task.id == id){
            name = task.name;
            description = task.description;
        }
    })

    if(element.checked){
        fetch(`/api/task/${id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({completed: true, name:name, description:description}),
        })
        element.classList.add('completed');
    }else if(!element.checked){
        fetch(`/api/task/${id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({completed: false, name:name, description:description}),
        })
        element.classList.remove('completed')
    }
    fetchTask();
}