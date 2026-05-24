// ====== OBJECT EXAMPLE ======
const studio = {
  name: "Photo Studio Pro",
  services: ["Wedding", "Portrait", "Product"],
  location: "Libya",
  showInfo: function () {
    console.log(Studio: ${this.name});
  }
};

studio.showInfo();


// ====== DOM MANIPULATION ======
const title = document.querySelector(".logo");

title.addEventListener("click", function () {
  this.style.color = "orange";
  this.innerHTML = "✨ Clicked Studio ✨";
});


// ====== NESTED OBJECT ======
const client = {
  name: "Ahmed",
  contact: {
    email: "ahmed@gmail.com",
    phone: "123456"
  }
};

console.log(client.contact.email);


// ====== LOCAL STORAGE ======
localStorage.setItem("studioName", "Photo Studio Pro");

const savedName = localStorage.getItem("studioName");
console.log("Saved:", savedName);


// ====== innerHTML EXAMPLE ======
const heroText = document.querySelector(".hero-text");

if (heroText) {
  heroText.innerHTML += "<br><strong>Now powered with JavaScript 🚀</strong>";
}
