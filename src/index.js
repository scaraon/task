const fetchUsers = async () => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const data = await response.json();
    localStorage.setItem("usersData", JSON.stringify(data));
    applySort();
  } catch {
    showError();
  }
};

const showError = () => {
  const errorMessage = document.createElement("p");
  errorMessage.textContent =
    "Ошибка при загрузке данных. Пожалуйста, попробуйте позже.";
  document.body.appendChild(errorMessage);
};

fetchUsers();

const userData = JSON.parse(localStorage.getItem("usersData"));
const table = document.querySelector("table");
const button = document.createElement("button");
button.textContent = "Обновить";
button.addEventListener("click", () => {
  location.reload();
});
document.body.insertBefore(button, document.body.firstChild);

const applySort = () => {
  userData.sort((a, b) => {
    if (a[sort] < b[sort]) return -1;
    if (a[sort] > b[sort]) return 1;
    return 0;
  });
  renderUsers(userData);
};

const renderUsers = (userData) => {
  table.innerHTML = "";

  userData.forEach((user) => {
    const row = document.createElement("tr");
    const name = document.createElement("td");
    const email = document.createElement("td");
    const number = document.createElement("td");

    name.textContent = user.name;
    email.textContent = user.email;
    number.textContent = user.phone;

    row.appendChild(name);
    row.appendChild(email);
    row.appendChild(number);

    table.appendChild(row);
  });
};

const sortSelect = document.getElementById("sortSelect");
let sort = "name";
const handleChange = (event) => {
  sort = event.target.value;
  applySort();
};

sortSelect.addEventListener("change", handleChange);

const filterInput = document.getElementById("filterInput");
const handleFilter = (event) => {
  const value = filterInput.value.toLowerCase();
  const filter = userData.filter(
    (user) =>
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value)
  );
  renderUsers(filter);
};

filterInput.addEventListener("input", handleFilter);
window.addEventListener("DOMContentLoaded", () => {
  fetchUsers();
});
