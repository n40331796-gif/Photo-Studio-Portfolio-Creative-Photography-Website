let users = JSON.parse(localStorage.getItem("users")) || [];

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const searchInput = document.getElementById("search");
const userList = document.getElementById("userList");

window.addUser = function () {

    if (!nameInput || !emailInput) return;

    let name = nameInput.value.trim();
    let email = emailInput.value.trim();

    if (!name || !email) return;

    users.push({ name, email });

    nameInput.value = "";
    emailInput.value = "";

    save();
    render();
};

function render() {
    if (!userList) return;

    let filter = searchInput.value.toLowerCase();

    userList.innerHTML = "";

    users.forEach((user) => {

        if (
            !user.name.toLowerCase().includes(filter) &&
            !user.email.toLowerCase().includes(filter)
        ) return;

        let li = document.createElement("li");

        li.innerHTML = 
            <strong>${user.name}</strong><br>
            ${user.email}
        ;

        userList.appendChild(li);
    });
}

function save() {
    localStorage.setItem("users", JSON.stringify(users));
}

if (searchInput) {
    searchInput.addEventListener("input", render);
}

render();
