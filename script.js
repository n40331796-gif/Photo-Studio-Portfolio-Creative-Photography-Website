let users = JSON.parse(localStorage.getItem("users")) || [];
let editIndex = null;

const form = document.getElementById("crudForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const searchInput = document.getElementById("search");
const userList = document.getElementById("userList");
const submitBtn = document.getElementById("submitBtn");

// عرض أولي
renderUsers();

// إضافة / تعديل
form.addEventListener("submit", function(e){
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if(!name || !email) return;

    const user = {name, email};

    if(editIndex === null){
        users.push(user);
    } else {
        users[editIndex] = user;
        editIndex = null;
    }

    save();
    renderUsers();

    form.reset();
});

// بحث
searchInput.addEventListener("input", renderUsers);

// عرض
function renderUsers(){
    const filter = searchInput.value.toLowerCase();

    userList.innerHTML = "";

    users.forEach((user, index) => {

        if(
            !user.name.toLowerCase().includes(filter) &&
            !user.email.toLowerCase().includes(filter)
        ) return;

        const li = document.createElement("li");

        li.innerHTML = 
            <span>
                <strong>${user.name}</strong><br>
                ${user.email}
            </span>
            <div>
                <button onclick="editUser(${index})">Edit</button>
                <button onclick="deleteUser(${index})">Delete</button>
            </div>
        ;

        userList.appendChild(li);
    });
}

// تعديل
function editUser(index){
    nameInput.value = users[index].name;
    emailInput.value = users[index].email;
    editIndex = index;
}

// حذف
function deleteUser(index){
    users.splice(index,1);
    save();
    renderUsers();
}

// حفظ
function save(){
    localStorage.setItem("users", JSON.stringify(users));
}

// زر تجربة
function showMessage(){
    alert("Booking request sent!");
}
