import {items} from "../db/database.js";

export function initItemPage() {
    renderItems();
}

const itemForm = document.getElementById('itemForm');
const itemTable = document.querySelector('#itemTable tbody');

itemForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = itemForm.itemName.value.trim();
    const price = +itemForm.itemPrice.value;
    const qty = +itemForm.itemQty.value;

    if (!name || price <= 0 || qty <= 0) return alert("Invalid item!");

    const newItem = { id: Date.now(), name, price, qty };
    items.push(newItem);
    renderItems();
    itemForm.reset();
});

function renderItems() {
    itemTable.innerHTML = items.map(i =>
        `<tr>
      <td>${i.name}</td>
      <td>${i.price}</td>
      <td>${i.qty}</td>
      <td><button class='btn btn-danger btn-sm' onclick="deleteItem(${i.id})">Del</button></td>
    </tr>`
    ).join('');
}

window.deleteItem = function(id) {
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) items.splice(index, 1);
    renderItems();
};
