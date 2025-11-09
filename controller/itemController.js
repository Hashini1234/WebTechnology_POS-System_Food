import { items } from "../db/database.js";
import { Item } from "../model/itemModel.js";

export function renderItems() {
    const section = document.getElementById("items");
    section.innerHTML = `
    <div class="container py-4">
        <div class="card shadow-lg border-0 rounded-4 overflow-hidden" style="background-color:#fff3e0;">
            <div class="card-header text-dark" style="background-color:#ffa94d;">
                <h4 class="mb-0 fw-semibold"><i class="fa-solid fa-boxes-stacked me-2"></i>Item Management</h4>
            </div>

            <div class="card-body" style="background-color:#fffaf3;">
                <div class="row g-4">

                    <!-- ADD ITEM FORM -->
                    <div class="col-lg-5">
                        <div class="p-4 bg-white rounded-4 shadow-sm border" style="border-color:#ffe0b2;">
                            <h5 class="text-secondary mb-3"><i class="fa-solid fa-plus-circle me-2 text-warning"></i>Add New Item</h5>
                            
                            <form id="itemForm">
                                <input id="itemName" placeholder="Item Name" class="form-control mb-3 shadow-sm" style="border-color:#ffd28e;">
                                <input id="itemPrice" placeholder="Price" type="number" class="form-control mb-3 shadow-sm" style="border-color:#ffd28e;">
                                <input id="itemQty" placeholder="Quantity" type="number" class="form-control mb-4 shadow-sm" style="border-color:#ffd28e;">

                                <button class="btn w-100 fw-semibold text-white py-2 shadow-sm" 
                                    style="background-color:#ff9800; border:none;">
                                    <i class="fa-solid fa-check me-2"></i>Add Item
                                </button>
                            </form>
                        </div>
                    </div>

                    <!-- ITEM TABLE -->
                    <div class="col-lg-7">
                        <div class="p-4 bg-white rounded-4 shadow-sm border" style="border-color:#ffe0b2;">
                            <h5 class="text-secondary mb-3"><i class="fa-solid fa-table-list me-2 text-warning"></i>Items List</h5>

                            <table class="table table-hover align-middle mt-2">
                                <thead style="background-color:#ffb74d; color:#fff;">
                                    <tr>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="itemTable">
                                    <tr><td colspan="4" class="text-center text-muted">No items yet</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    `;

    // JS Logic
    const form = section.querySelector("#itemForm");
    const table = section.querySelector("#itemTable");

    function loadTable() {
        if (items.length === 0) {
            table.innerHTML = `<tr><td colspan="4" class="text-center text-muted">No items yet</td></tr>`;
            return;
        }
        table.innerHTML = items.map(i =>
            `<tr>
                <td>${i.name}</td>
                <td>$${i.price.toFixed(2)}</td>
                <td>${i.qty}</td>
                <td><button class="btn btn-sm text-white" 
                    style="background-color:#e57300; border:none;" onclick="deleteItem(${i.id})">
                    <i class="fa-solid fa-trash"></i> Delete
                </button></td>
            </tr>`
        ).join('');
    }

    form.addEventListener("submit", e => {
        e.preventDefault();
        const name = itemName.value.trim();
        const price = parseFloat(itemPrice.value);
        const qty = parseInt(itemQty.value);
        if (!name || price <= 0 || qty <= 0) return alert("Invalid item details!");
        items.push(new Item(Date.now(), name, price, qty));
        form.reset();
        loadTable();
    });

    window.deleteItem = id => {
        const index = items.findIndex(i => i.id === id);
        if (index !== -1) items.splice(index, 1);
        loadTable();
    };

    loadTable();
}
