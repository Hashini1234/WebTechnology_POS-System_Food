import {customers} from "../db/database.js";
import {Customer} from "../model/customerModel.js";
import {showAlert} from "../util/alert.js";
import {emailRegex} from "../util/regex.js";

export function initCustomerPage() {
    const form = document.getElementById("customerForm");
    const table = document.querySelector("#customerTable tbody");

    form.addEventListener("submit", e => {
        e.preventDefault();
        const name = form.customerName.value.trim();
        const email = form.customerEmail.value.trim();
        if (!emailRegex.test(email)) return showAlert("Invalid email!");
        const cust = new Customer(Date.now(), name, email);
        customers.push(cust);
        form.reset();
        renderCustomers();
    });

    window.deleteCustomer = id => {
        const index = customers.findIndex(c => c.id === id);
        customers.splice(index, 1);
        renderCustomers();
    };

    function renderCustomers() {
        table.innerHTML = customers.map(c =>
            `<tr><td>${c.name}</td><td>${c.email}</td>
            <td><button class='btn btn-danger btn-sm' onclick='deleteCustomer(${c.id})'>Delete</button></td></tr>`
        ).join("");
    }

    renderCustomers();
}
