import { items } from "../db/database.js";
import { Item } from "../model/itemModel.js";

export function renderItems() {
    const section = document.getElementById("items");
    section.innerHTML = `
    <h2>Items Management</h2>
    <form id="itemForm">
      <input id="itemName" placeholder="Name" class="form-control mb-2">
      <input id="itemPrice" placeholder="Price" type="number" class="form-control mb-2">
      <input id="itemQty" placeholder="Qty" type="number" class="form-control mb-2">
      <button class="btn btn-success w-100">Add</button>
    </form>
    <table class="table table-dark mt-3"><thead><tr><th>Name</th><th>Price</th><th>Qty</th><th>Action</th></tr></thead><tbody id="itemTable"></tbody></table>
  `;

    const form = section.querySelector("#itemForm");
    const table = section.querySelector("#itemTable");

    function loadTable() {
        if (items.length === 0) {
            table.innerHTML = `<tr><td colspan="4" class="text-center text-muted">No items yet</td></tr>`;
            return;
        }
        table.innerHTML = items.map(i =>
            `<tr><td>${i.name}</td><td>$${i.price}</td><td>${i.qty}</td><td><button class="btn btn-danger btn-sm" onclick="deleteItem(${i.id})">Delete</button></td></tr>`
        ).join('');
    }

    form.addEventListener("submit", e => {
        e.preventDefault();
        const name = itemName.value.trim();
        const price = parseFloat(itemPrice.value);
        const qty = parseInt(itemQty.value);
        if (!name || price <= 0 || qty <= 0) return alert("Invalid!");
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
