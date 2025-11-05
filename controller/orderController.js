import {orders, items, customers} from "../db/database.js";

export function initOrderPage() {
    updateDropdowns();
    renderHistory();
}

const orderForm = document.getElementById('orderForm');
const orderCustomer = document.getElementById('orderCustomer');
const orderItem = document.getElementById('orderItem');
const orderQty = document.getElementById('orderQty');
const historyTable = document.querySelector('#historyTable tbody');

orderForm.addEventListener('submit', e => {
    e.preventDefault();
    const customerId = +orderCustomer.value;
    const itemId = +orderItem.value;
    const qty = +orderQty.value;

    const customer = customers.find(c => c.id === customerId);
    const item = items.find(i => i.id === itemId);

    if (!customer || !item || qty <= 0 || qty > item.qty) return alert("Invalid order!");

    item.qty -= qty;
    const total = item.price * qty;
    const newOrder = { id: Date.now(), customer: customer.name, item: item.name, qty, total };
    orders.push(newOrder);

    renderHistory();
    orderForm.reset();
});

function renderHistory() {
    historyTable.innerHTML = orders.map(o =>
        `<tr><td>${o.customer}</td><td>${o.item}</td><td>${o.qty}</td><td>${o.total}</td></tr>`
    ).join('');
}

function updateDropdowns() {
    orderCustomer.innerHTML = customers.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    orderItem.innerHTML = items.map(i => `<option value="${i.id}">${i.name}</option>`).join('');
}
