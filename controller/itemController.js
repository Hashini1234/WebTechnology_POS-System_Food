import {items} from "../db/database.js";
import {Item} from "../model/itemModel.js";
import {showAlert} from "../util/alert.js";

export function initItemPage() {
    const form = document.getElementById("itemForm");
    const table = document.querySelector("#itemTable tbody");

    form.addEventListener("submit", e => {
        e.preventDefault();
        const name = form.itemName.value.trim();
        const price = +form.itemPrice.value;
        const qty = +form.itemQty.value;
        if (!name || price <= 0 || qty < 0) return showAlert("Invalid input!");

        const item = new Item(Date.now(), name, price, qty);
        items.push(item);
        form.reset();
        renderItems();
    });

    renderItems();

    window.deleteItem = id => {
        const index = items.findIndex(i => i.id === id);
        items.splice(index, 1);
        renderItems();
    };

    function renderItems() {
        table.innerHTML = items.map(i =>
            `<tr><td>${i.name}</td><td>${i.price}</td><td>${i.qty}</td>
            <td><button class='btn btn-danger btn-sm' onclick='deleteItem(${i.id})'>Delete</button></td></tr>`
        ).join("");
    }
}
