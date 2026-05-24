let users = JSON.parse(localStorage.getItem("users")) || [];
let editIndex = null;

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const searchInput = document.getElementById("search");
const userList = document.getElementById("userList");

function addUser(){

    let name = nameInput.value;
    let email = emailInput.value;

    if(name === "" || email === "") return;

    if(editIndex === null){
        users.push({name,email});
    } else {
        users[editIndex] = {name,email};
        editIndex = null;
    }

    nameInput.value = "";
    emailInput.value = "";

    save();
    render();
}

function render(){

    userList.innerHTML = "";

    let filter = searchInput.value.toLowerCase();

    users.forEach((u,i)=>{

        if(!u.name.toLowerCase().includes(filter) &&
           !u.email.toLowerCase().includes(filter)) return;

        let li = document.createElement("li");

        li.innerHTML = 
            ${u.name} - ${u.email}
            <button onclick="editUser(${i})">Edit</button>
            <button onclick="deleteUser(${i})">Delete</button>
        ;

        userList.appendChild(li);
    });
}

function editUser(i){
    nameInput.value = users[i].name;
    emailInput.value = users[i].email;
    editIndex = i;
}

function deleteUser(i){
    users.splice(i,1);
    save();
    render();
}

function save(){
    localStorage.setItem("users", JSON.stringify(users));
}

searchInput.addEventListener("input", render);

render();
