import {items} from "../db/database.js";
import {Item} from "../model/itemModel.js";
import {showAlert} from "../util/alert.js";
import {updateDashboard} from "./dashboardController.js";
import {updateOrderDropdowns} from "./orderController.js";

const itemForm = document.getElementById("itemForm");
const itemTable = document.querySelector("#itemTable tbody");

itemForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = itemForm.itemName.value.trim();
    const price = +itemForm.itemPrice.value;
    const qty = +itemForm.itemQty.value;
    if (!name || price <= 0 || qty <= 0) return showAlert("Invalid inputs!");
    items.push(new Item(Date.now(), name, price, qty));
    renderItems();
    itemForm.reset();
});

export function renderItems() {
    itemTable.innerHTML = items.map(i =>
        `<tr><td>${i.name}</td><td>${i.price}</td><td>${i.qty}</td>
    <td><button class='btn btn-danger btn-sm' onclick='deleteItem(${i.id})'>Del</button></td></tr>`
    ).join('');
    updateDashboard();
    updateOrderDropdowns();
}

window.deleteItem = id => {
    const idx = items.findIndex(i => i.id === id);
    if (idx !== -1) items.splice(idx, 1);
    renderItems();
};
