import {customers} from "../db/database.js";

export function initCustomerPage() {
    renderCustomers();
}

const customerForm = document.getElementById('customerForm');
const customerTable = document.querySelector('#customerTable tbody');

customerForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = customerForm.customerName.value.trim();
    const email = customerForm.customerEmail.value.trim();
    if (!name || !email) return alert("Invalid customer!");
    const newCustomer = { id: Date.now(), name, email };
    customers.push(newCustomer);
    renderCustomers();
    customerForm.reset();
});

function renderCustomers() {
    customerTable.innerHTML = customers.map(c =>
        `<tr>
      <td>${c.name}</td>
      <td>${c.email}</td>
      <td><button class='btn btn-danger btn-sm' onclick="deleteCustomer(${c.id})">Del</button></td>
    </tr>`
    ).join('');
}

window.deleteCustomer = function(id) {
    const index = customers.findIndex(c => c.id === id);
    if (index !== -1) customers.splice(index, 1);
    renderCustomers();
};
