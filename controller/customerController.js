import { customers } from "../db/database.js";
import { Customer } from "../model/customerModel.js";

export function renderCustomers() {
    const section = document.getElementById("customers");
    section.innerHTML = `
    <div class="container py-4">
        <div class="card shadow-lg border-0 rounded-4 overflow-hidden" style="background-color:#fff3e0;">
            <div class="card-header text-dark" style="background-color:#ffa94d;">
                <h4 class="mb-0 fw-semibold"><i class="fa-solid fa-users me-2"></i>Customer Management</h4>
            </div>

            <div class="card-body" style="background-color:#fffaf3;">
                <div class="row g-4">

                    <!-- ADD CUSTOMER FORM -->
                    <div class="col-lg-5">
                        <div class="p-4 bg-white rounded-4 shadow-sm border" style="border-color:#ffe0b2;">
                            <h5 class="text-secondary mb-3"><i class="fa-solid fa-user-plus me-2 text-warning"></i>Add New Customer</h5>
                            
                            <form id="customerForm">
                                <input id="customerName" placeholder="Customer Name" class="form-control mb-3 shadow-sm" style="border-color:#ffd28e;">
                                <input id="customerEmail" placeholder="Email Address" type="email" class="form-control mb-4 shadow-sm" style="border-color:#ffd28e;">
                                
                                <button class="btn w-100 fw-semibold text-white py-2 shadow-sm" 
                                    style="background-color:#ff9800; border:none;">
                                    <i class="fa-solid fa-check me-2"></i>Add Customer
                                </button>
                            </form>
                        </div>
                    </div>

                    <!-- CUSTOMER TABLE -->
                    <div class="col-lg-7">
                        <div class="p-4 bg-white rounded-4 shadow-sm border" style="border-color:#ffe0b2;">
                            <h5 class="text-secondary mb-3"><i class="fa-solid fa-table me-2 text-warning"></i>Customer List</h5>

                            <table class="table table-hover align-middle mt-2">
                                <thead style="background-color:#ffb74d; color:#fff;">
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="customerTable">
                                    <tr><td colspan="3" class="text-center text-muted">No customers yet</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    `;

    // ---------- JS Logic ----------
    const form = section.querySelector("#customerForm");
    const table = section.querySelector("#customerTable");

    function loadTable() {
        if (customers.length === 0) {
            table.innerHTML = `<tr><td colspan="3" class="text-center text-muted">No customers yet</td></tr>`;
            return;
        }
        table.innerHTML = customers.map(c =>
            `<tr>
                <td>${c.name}</td>
                <td>${c.email}</td>
                <td>
                    <button class="btn btn-sm text-white shadow-sm" 
                        style="background-color:#e57300; border:none;" 
                        onclick="deleteCustomer(${c.id})">
                        <i class="fa-solid fa-trash"></i> Delete
                    </button>
                </td>
            </tr>`
        ).join('');
    }

    form.addEventListener("submit", e => {
        e.preventDefault();
        const name = customerName.value.trim();
        const email = customerEmail.value.trim();
        if (!name || !email) return alert("Please fill out all fields!");
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
