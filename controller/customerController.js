import { customers } from "../db/database.js";
import { Customer } from "../model/customerModel.js";

export function renderCustomers() {
    const section = document.getElementById("customers");
    section.innerHTML = `
    <h2>Customer Management</h2>
    <form id="customerForm">
      <input id="customerName" placeholder="Name" class="form-control mb-2">
      <input id="customerEmail" placeholder="Email" type="email" class="form-control mb-2">
      <button class="btn btn-success w-100">Add</button>
    </form>
    <table class="table table-dark mt-3"><thead><tr><th>Name</th><th>Email</th><th>Action</th></tr></thead><tbody id="customerTable"></tbody></table>
  `;

    const form = section.querySelector("#customerForm");
    const table = section.querySelector("#customerTable");

    function loadTable() {
        if (customers.length === 0) {
            table.innerHTML = `<tr><td colspan="3" class="text-center text-muted">No customers yet</td></tr>`;
            return;
        }
        table.innerHTML = customers.map(c =>
            `<tr><td>${c.name}</td><td>${c.email}</td><td><button class="btn btn-danger btn-sm" onclick="deleteCustomer(${c.id})">Delete</button></td></tr>`
        ).join('');
    }

    form.addEventListener("submit", e => {
        e.preventDefault();
        const name = customerName.value.trim();
        const email = customerEmail.value.trim();
        if (!name || !email) return alert("Invalid!");
        customers.push(new Customer(Date.now(), name, email));
        form.reset();
        loadTable();
    });

    window.deleteCustomer = id => {
        const index = customers.findIndex(c => c.id === id);
        if (index !== -1) customers.splice(index, 1);
        loadTable();
    };

    loadTable();
}
