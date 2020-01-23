// define ui VARS

const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const filter = document.querySelector("#filter");
const clearBtn = document.querySelector(".clear-tasks");
const taskList = document.querySelector(".collection");

// call all event listeners
loadEventListeners();
// load all event listeners
function loadEventListeners() {
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task Event
    form.addEventListener("submit", addTask);
    // Remove Task Event
    taskList.addEventListener("click", removeTask);
    // Clear Task Event
    clearBtn.addEventListener("click", clearTask);
    //   Filter Tasks
    filter.addEventListener("keyup", filterTasks);
}

// Clear task from Local Storage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

// Get Task from ls
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        task = JSON.parse(localStorage.getItem('tasks'));
    }
    task.forEach(function(task){
        // create li
        const li = document.createElement("li");
        // Add Class
        li.className = "collection-item";
        // Create Text
        const text = document.createTextNode(task);
        li.appendChild(text);
        // create link
        const link = document.createElement("a");
        // Add Class
        link.className = "delete-item secondary-content";
        // Add Icon HTML
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append Link
        li.appendChild(link);
        // Append Li to ul
        taskList.appendChild(li);
    })
}

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    const li = document.querySelectorAll('.collection-item');
    li.forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}

// Clear Tasks
function clearTask() {
    taskList.innerHTML = "";
    clearTasksFromLocalStorage();
}

// Clear Task from LS
function clearTasksFromLocalStorage(){
    
    localStorage.clear();
}


// Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        if ("Remove Task") {
            e.target.parentElement.parentElement.remove();
            // remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove LS
    function removeTaskFromLocalStorage(taskItem){
        let tasks;
        if(localStorage.getItem('tasks') === NULL)
        {
            tasks = [];
        }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        tasks.forEach(function(task, index)
        {
            if(taskItem.textContent === task){
                tasks.splice(index,1);
            }
        })

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

// Add task
function addTask(e) {
    if (taskInput.value === "") {
        alert("Add a Task");
    } else {
        // create li
        const li = document.createElement("li");
        // Add Class
        li.className = "collection-item";
        // Create Text
        const text = document.createTextNode(taskInput.value);
        li.appendChild(text);

        // li.appendChild(document.createTextNode(taskInput.value));

        // create link
        const link = document.createElement("a");

        // Add Class
        link.className = "delete-item secondary-content";

        // Add Icon HTML
        link.innerHTML = '<i class="fa fa-remove"></i>';

        // Append Link
        li.appendChild(link);

        // Append Li to ul
        taskList.appendChild(li);

        // console.log(li);
        // console.log(text);
        // console.log(link);
        
        // Store Task in Local Storage
        storeTaskInLocalStorage(taskInput.value);
    }
    // Clear Input
    taskInput.value = "";
    e.preventDefault();
}

// Local Storage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

