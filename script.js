let messages = JSON.parse(localStorage.getItem("messages")) || [];
let editIndex = null;

const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const searchInput = document.getElementById("search");
const messagesList = document.getElementById("messagesList");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if(!name || !email || !message) return;

    const data = { name, email, message };

    if(editIndex === null){
        messages.push(data);
    } else {
        messages[editIndex] = data;
        editIndex = null;
    }

    saveData();
    render();
    form.reset();
});

searchInput.addEventListener("input", render);

function render(){
    const filter = searchInput.value.toLowerCase();
    messagesList.innerHTML = "";

    messages.forEach((msg, index) => {
        if(
            !msg.name.toLowerCase().includes(filter) &&
            !msg.email.toLowerCase().includes(filter) &&
            !msg.message.toLowerCase().includes(filter)
        ) return;

        const div = document.createElement("div");

        div.innerHTML = `
            <h3>${msg.name}</h3>
            <p>${msg.email}</p>
            <p>${msg.message}</p>
            <button onclick="editMessage(${index})">Edit</button>
            <button onclick="deleteMessage(${index})">Delete</button>
        `;

        messagesList.appendChild(div);
    });
}

window.editMessage = function(index){
    nameInput.value = messages[index].name;
    emailInput.value = messages[index].email;
    messageInput.value = messages[index].message;
    editIndex = index;
}

window.deleteMessage = function(index){
    messages.splice(index, 1);
    saveData();
    render();
}

function showMessage(){
    alert("Booking request sent successfully!");
}

function saveData(){
    localStorage.setItem("messages", JSON.stringify(messages));
}

render();

