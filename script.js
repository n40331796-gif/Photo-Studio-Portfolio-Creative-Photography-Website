let users = JSON.parse(localStorage.getItem("users")) || [];
let editIndex = null;

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const searchInput = document.getElementById("search");
const userList = document.getElementById("userList");

function addUser() {
    let name = nameInput.value.trim();
    let email = emailInput.value.trim();

    if (!name || !email) return;

    let user = { name, email };

    if (editIndex === null) {
        users.push(user);
    } else {
        users[editIndex] = user;
        editIndex = null;
    }

    nameInput.value = "";
    emailInput.value = "";

    save();
    render();
}

function render() {
    let filter = searchInput.value.toLowerCase();

    userList.innerHTML = "";

    users.forEach((user, index) => {

        if (
            !user.name.toLowerCase().includes(filter) &&
            !user.email.toLowerCase().includes(filter)
        ) return;

        let li = document.createElement("li");

        let info = document.createElement("span");
        info.innerHTML = <strong>${user.name}</strong><br>${user.email};

        let actions = document.createElement("div");

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editUser(index);

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteUser(index);

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(info);
        li.appendChild(actions);

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
    save();
    render();
}

function save() {
    localStorage.setItem("users", JSON.stringify(users));
}

searchInput.addEventListener("input", render);

render();
