let users = JSON.parse(localStorage.getItem("users")) || [];
let editIndex = null;

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const searchInput = document.getElementById("search");
const userList = document.getElementById("userList");

// تشغيل أولي
render();

// إضافة أو تعديل
function addUser(){

    let name = nameInput.value.trim();
    let email = emailInput.value.trim();

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

// عرض
function render(){

    userList.innerHTML = "";

    let filter = searchInput.value.toLowerCase();

    users.forEach((u,i)=>{

        if(
            !u.name.toLowerCase().includes(filter) &&
            !u.email.toLowerCase().includes(filter)
        ) return;

        let li = document.createElement("li");

        li.innerHTML = 
            <b>${u.name}</b> - ${u.email}
            <button onclick="editUser(${i})">Edit</button>
            <button onclick="deleteUser(${i})">Delete</button>
        ;

        userList.appendChild(li);
    });
}

// تعديل
function editUser(i){
    nameInput.value = users[i].name;
    emailInput.value = users[i].email;
    editIndex = i;
}

// حذف
function deleteUser(i){
    users.splice(i,1);
    save();
    render();
}

// حفظ
function save(){
    localStorage.setItem("users", JSON.stringify(users));
}

// بحث مباشر
searchInput.addEventListener("input", render);
