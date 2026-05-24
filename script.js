// =========================
// ⭐ محاضرة 15 - CRUD System
// localStorage + DOM + Search
// =========================

// تحميل البيانات من localStorage أو إنشاء مصفوفة فارغة
let users = JSON.parse(localStorage.getItem("users")) || [];

let editIndex = null;

// عناصر الصفحة
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const searchInput = document.getElementById("search");
const userList = document.getElementById("userList");

// =========================
// عرض المستخدمين
// =========================
function renderUsers() {
    userList.innerHTML = "";

    const filter = searchInput.value.toLowerCase();

    users.forEach((user, index) => {

        // فلترة البحث
        if (
            user.name.toLowerCase().includes(filter) === false &&
            user.email.toLowerCase().includes(filter) === false
        ) {
            return;
        }

        const li = document.createElement("li");

        li.innerHTML = 
            <div>
                <strong>${user.name}</strong><br>
                <small>${user.email}</small>
            </div>

            <div>
                <button onclick="editUser(${index})">Edit</button>
                <button onclick="deleteUser(${index})">Delete</button>
            </div>
        ;

        userList.appendChild(li);
    });
}

// =========================
// إضافة أو تعديل مستخدم
// =========================
function addUser() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (name === "" || email === "") return;

    const user = { name, email };

    // إضافة جديد
    if (editIndex === null) {
        users.push(user);
    }
    // تعديل
    else {
        users[editIndex] = user;
        editIndex = null;
    }

    saveData();
    clearInputs();
    renderUsers();
}

// =========================
// حذف مستخدم
// =========================
function deleteUser(index) {
    users.splice(index, 1);
    saveData();
    renderUsers();
}

// =========================
// تعديل مستخدم
// =========================
function editUser(index) {
    nameInput.value = users[index].name;
    emailInput.value = users[index].email;

    editIndex = index;
}

// =========================
// حفظ في localStorage
// =========================
function saveData() {
    localStorage.setItem("users", JSON.stringify(users));
}

// =========================
// تنظيف الحقول
// =========================
function clearInputs() {
    nameInput.value = "";
    emailInput.value = "";
}

// =========================
// البحث التلقائي
// =========================
searchInput.addEventListener("input", renderUsers);

// =========================
// تشغيل أولي
// =========================
renderUsers();
