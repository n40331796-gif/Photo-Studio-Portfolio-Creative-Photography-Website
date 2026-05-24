let users = JSON.parse(localStorage.getItem("users")) || [];
let editIndex = null;

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const searchInput = document.getElementById("search");
const userList = document.getElementById("userList");

function addUser() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (name === "" || email === "") return;

    const user = { name, email };

    if (editIndex === null) {
        users.push(user);
    } else {
        users[editIndex] = user;
        editIndex = null;
    }

    nameInput.value = "";
    emailInput.value = "";

    saveData();
    renderUsers();
}

function renderUsers() {
    const filter = searchInput.value.toLowerCase();
    userList.innerHTML = "";

    users.forEach((user, index) => {
        if (
            !user.name.toLowerCase().includes(filter) &&
            !user.email.toLowerCase().includes(filter)
        ) return;

        const li = document.createElement("li");

        li.innerHTML = 
            <span><strong>${user.name}</strong><br>${user.email}</span>
            <button onclick="editUser(${index})">Edit</button>
            <button onclick="deleteUser(${index})">Delete</button>
        ;

        userList.appendChild(li);
    });
}

function editUser(index) {
    nameInput.value = users[index].name;
    emailInput.value = users[index].email;
    editIndex = index;
}

function deleteUser(index) {
    users.splice(index, 1);
    saveData();
    renderUsers();
}

function saveData() {
    localStorage.setItem("users", JSON.stringify(users));
}

searchInput.addEventListener("input", renderUsers);

renderUsers();
