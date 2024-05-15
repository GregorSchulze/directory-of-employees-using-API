/* ===================================== 
   Global variables
======================================== */

let employees = [];
let currentIndex = 0;
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

/* ===================================== 
   fetch data from API
======================================== */
fetch(urlAPI)
  .then((res) => res.json())
  .then((res) => res.results)
  .then(displayEmployees)
  .catch((err) => console.log(err));

/* ===================================== 
   Display the Employees
======================================== */

function displayEmployees(employeeData) {
  employees = employeeData;

  let employeeHTML = "";

  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    employeeHTML += `
    <div class="card" data-index="${index}">
      <img class="avatar" src="${picture.large}" />
      <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
      </div>
    </div>
    `;
  });

  gridContainer.innerHTML = employeeHTML;
}

/* ===================================== 
   Display the Modal
======================================== */
function displayModal(index) {
  let employee = employees[index];
  let name = employee.name;
  let email = employee.email;
  let city = employee.location.city;
  let picture = employee.picture;
  let street = employee.location.street;
  let state = employee.location.state;
  let postcode = employee.location.postcode;
  let dob = employee.dob.date;
  let phone = employee.phone;
  let date = new Date(dob);

  const modalHTML = `
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}</p>
      <hr />
      <p>${phone}</p>
      <p class="address">${street.name}, ${state} ${postcode}</p>
      <p>Birthday:
      ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `;
  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
}

// Eventlistener Open a Modal
gridContainer.addEventListener("click", (e) => {
  if (e.target !== gridContainer) {
    const card = e.target.closest(".card");
    const index = card.getAttribute("data-index");

    displayModal(index);
  }
});

/* ===================================== 
   Close the Modal
======================================== */

// close button
modalClose.addEventListener("click", () => {
  overlay.classList.add("hidden");
});

// clicking the overlay
overlay.addEventListener("click", (event) => {
  if (event.target === overlay) {
    overlay.classList.add("hidden");
  }
});

// escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    overlay.classList.add("hidden");
  }
});

/* ===================================== 
    Toggle between the previous and next employee
======================================== */
const arrowRight = document.querySelector(".right-arrow");
const arrowLeft = document.querySelector(".left-arrow");

arrowRight.addEventListener("click", () => {
  if (currentIndex !== employees.length - 1) {
    currentIndex += 1;
    displayModal(currentIndex);
  }
});

arrowLeft.addEventListener("click", () => {
  if (currentIndex !== 0) {
    currentIndex -= 1;
    displayModal(currentIndex);
  }
});

/* ===================================== 
   Add a search form
======================================== */
// Filter Employees
const searchForm = document.getElementById("search-container");
const input = document.getElementById("searchbar");
const elements = document.getElementsByClassName("card");

input.addEventListener("keyup", (e) => {
  const searchTerm = e.target.value.toLowerCase();

  const filteredEmployees = employees.filter((employee) => {
    const fullName = `${employee.name.first.toLowerCase()} ${employee.name.last.toLowerCase()}`;
    return fullName.includes(searchTerm);
  });

  displayFilteredEmployees(filteredEmployees);
});

// Display Filtered Employees
function displayFilteredEmployees(filteredEmployees) {
  let filteredEmployeeHTML = "";

  filteredEmployees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    filteredEmployeeHTML += `
    <div class="card" data-index="${index}">
      <img class="avatar" src="${picture.large}" />
      <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
      </div>
    </div>
    `;
  });

  gridContainer.innerHTML = filteredEmployeeHTML;
}
