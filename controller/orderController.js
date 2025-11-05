import {items, customers, orders} from "../db/database.js";
import {Order} from "../model/orderModel.js";
import {showAlert} from "../util/alert.js";
import {renderItems} from "./itemController.js";
import {updateDashboard} from "./dashboardController.js";

const orderForm = document.getElementById("orderForm");
const orderCustomer = document.getElementById("orderCustomer");
const orderItem = document.getElementById("orderItem");
const orderQty = document.getElementById("orderQty");
const historyTable = document.querySelector("#historyTable tbody");

orderForm.addEventListener("submit", e => {
    e.preventDefault();
    const customerId = +orderCustomer.value;
    const itemId = +orderItem.value;
    const qty = +orderQty.value;
    const customer = customers.find(c => c.id === customerId);
    const item = items.find(i => i.id === itemId);
    if (!customer || !item) return showAlert("Invalid data!");
    if (qty <= 0 || qty > item.qty) return showAlert("Not enough stock!");
    item.qty -= qty;
    const total = item.price * qty;
    orders.push(new Order(Date.now(), customer.name, item.name, qty, total));
    renderHistory();
    renderItems();
    updateDashboard();
    orderForm.reset();
});

export function renderHistory() {
    historyTable.innerHTML = orders.map(o =>
        `<tr><td>${o.customer}</td><td>${o.item}</td><td>${o.qty}</td><td>$${o.total.toFixed(2)}</td></tr>`
    ).join('');
}

export function updateOrderDropdowns() {
    orderCustomer.innerHTML = customers.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    orderItem.innerHTML = items.map(i => `<option value="${i.id}">${i.name}</option>`).join('');
}
