import {customers} from "../db/database.js";
import {Customer} from "../model/customerModel.js";
import {showAlert} from "../util/alert.js";
import {emailRegex} from "../util/regex.js";
import {updateDashboard} from "./dashboardController.js";
import {updateOrderDropdowns} from "./orderController.js";

const customerForm = document.getElementById("customerForm");
const customerTable = document.querySelector("#customerTable tbody");

customerForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = customerForm.customerName.value.trim();
    const email = customerForm.customerEmail.value.trim();
    if (!emailRegex.test(email)) return showAlert("Invalid email!");
    customers.push(new Customer(Date.now(), name, email));
    renderCustomers();
    customerForm.reset();
});

export function renderCustomers() {
    customerTable.innerHTML = customers.map(c =>
        `<tr><td>${c.name}</td><td>${c.email}</td>
    <td><button class='btn btn-danger btn-sm' onclick='deleteCustomer(${c.id})'>Del</button></td></tr>`
    ).join('');
    updateDashboard();
    updateOrderDropdowns();
}

window.deleteCustomer = id => {
    const idx = customers.findIndex(c => c.id === id);
    if (idx !== -1) customers.splice(idx, 1);
    renderCustomers();
};
