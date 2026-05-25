let users = JSON.parse(localStorage.getItem("users")) || [];
let editIndex = null;

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const searchInput = document.getElementById("search");
const userList = document.getElementById("userList");

function save() {
    localStorage.setItem("users", JSON.stringify(users));
}

function render() {
    userList.innerHTML = "";

    const filter = searchInput.value.toLowerCase();

    users.forEach((user, index) => {

        if (
            !user.name.toLowerCase().includes(filter) &&
            !user.email.toLowerCase().includes(filter)
        ) return;

        const li = document.createElement("li");
        li.style.margin = "10px 0";
        li.style.padding = "10px";
        li.style.background = "#222";
        li.style.borderRadius = "5px";

        li.innerHTML = 
            <strong>${user.name}</strong><br>
            ${user.email}
        ;

        // Buttons
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editUser(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteUser(index);

        li.appendChild(document.createElement("br"));
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        userList.appendChild(li);
    });
}

window.addUser = function () {

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !email) return;

    if (editIndex === null) {
        users.push({ name, email });
    } else {
        users[editIndex] = { name, email };
        editIndex = null;
    }

    nameInput.value = "";
    emailInput.value = "";

    save();
    render();
};

function deleteUser(index) {
    users.splice(index, 1);
    save();
    render();
}

function editUser(index) {
    nameInput.value = users[index].name;
    emailInput.value = users[index].email;
    editIndex = index;
}

searchInput.addEventListener("input", render);

render();
