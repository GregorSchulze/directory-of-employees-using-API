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

function displayEmployees(employeeData) {
  employees = employeeData;

  // store the employee HTML as we create it
  let employeeHTML = "";

  // loop through each employee and create HTML markup
  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    // template literals make this so much cleaner!
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
   Display the Employees
======================================== */
function displayModal(index) {
  let {
    name,
    dob,
    phone,
    email,
    location: { city, street, state, postcode },
    picture,
  } = employees[index];

  let date = new Date(dob.date);

  const modalHTML = `
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}</p>
      <hr />
      <p>${phone}</p>
      <p class="address">${street}, ${state} ${postcode}</p>
      <p>Birthday:
      ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    <div class="modal-btn-container">
      <button type="button" id="modal-prev-btn" class="modal-prev btn" aria-label="Previous"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>
      <button type="button" id="modal-next-btn" class="modal-next btn" aria-label="Next"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>
    </div>
    `;
  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
}

// Eventlistener
gridContainer.addEventListener("click", (e) => {
  if (e.target !== gridContainer) {
    // select the card element based on its proximity to actual element
    const card = e.target.closest(".card");
    const index = card.getAttribute("data-index");

    displayModal(index);
  }
});

/* ===================================== 
   Close the Modal
======================================== */

// Close the Modal when clicking the close button
modalClose.addEventListener("click", () => {
  overlay.classList.add("hidden");
});

// Close the Modal when clicking the overlay
overlay.addEventListener("click", () => {
  overlay.classList.add("hidden");
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
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search");

searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.trim().toLowerCase();

  const filteredEmployees = employees.filter((employee) => {
    const fullName = `${employee.name.first.toLowerCase()} ${employee.name.last.toLowerCase()}`;
    return fullName.includes(searchTerm);
  });

  displayEmployees(filteredEmployees);

  if (searchTerm === "") {
    displayEmployees(employees);
  }
});
