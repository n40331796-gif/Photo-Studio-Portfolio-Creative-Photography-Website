let users = JSON.parse(localStorage.getItem('users')) || [];

let editIndex = null;

const form = document.getElementById('crudForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const searchInput = document.getElementById('search');
const userList = document.getElementById('userList');
const submitBtn = document.getElementById('submitBtn');

renderUsers();

/* ADD OR UPDATE USER */
form.addEventListener('submit', function(e){

    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if(!name || !email){
        return;
    }

    const user = {
        name: name,
        email: email
    };

    if(editIndex === null){

        users.push(user);

    }else{

        users[editIndex] = user;

        editIndex = null;

        submitBtn.textContent = "Add";
    }

    nameInput.value = "";
    emailInput.value = "";

    saveUsers();

    renderUsers();

});

/* SEARCH */
searchInput.addEventListener('input', renderUsers);

/* RENDER USERS */
function renderUsers(){

    const filter = searchInput.value.toLowerCase();

    userList.innerHTML = "";

    users.forEach((user, index) => {

        if(
            !user.name.toLowerCase().includes(filter) &&
            !user.email.toLowerCase().includes(filter)
        ){
            return;
        }

        const li = document.createElement('li');

        li.innerHTML = 
            <strong>${user.name}</strong><br>
            ${user.email}
            <br><br>
            <button onclick="editUser(${index})">Edit</button>
            <button onclick="deleteUser(${index})">Delete</button>
        ;

        userList.appendChild(li);

    });

}

/* EDIT USER */
function editUser(index){

    nameInput.value = users[index].name;
    emailInput.value = users[index].email;

    editIndex = index;

    submitBtn.textContent = "Update";

}

/* DELETE USER */
function deleteUser(index){

    users.splice(index, 1);

    saveUsers();

    renderUsers();

}

/* SAVE */
function saveUsers(){

    localStorage.setItem('users', JSON.stringify(users));

}
