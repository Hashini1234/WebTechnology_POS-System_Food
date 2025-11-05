import {items, customers, orders} from "../db/database.js";
import {Order} from "../model/orderModel.js";
import {showAlert} from "../util/alert.js";

export function initOrderPage() {
    const form = document.getElementById("orderForm");
    const itemSelect = document.getElementById("orderItem");
    const customerSelect = document.getElementById("orderCustomer");
    const qtyInput = document.getElementById("orderQty");
    const historyTable = document.querySelector("#historyTable tbody");

    function loadDropdowns() {
        itemSelect.innerHTML = items.map(i => `<option value="${i.id}">${i.name}</option>`).join("");
        customerSelect.innerHTML = customers.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
    }

    form.addEventListener("submit", e => {
        e.preventDefault();
        const itemId = +itemSelect.value;
        const custId = +customerSelect.value;
        const qty = +qtyInput.value;

        const item = items.find(i => i.id === itemId);
        const cust = customers.find(c => c.id === custId);

        if (!item || !cust) return showAlert("Invalid selection!");
        if (qty <= 0 || qty > item.qty) return showAlert("Not enough stock!");

        item.qty -= qty;
        const total = item.price * qty;
        const order = new Order(Date.now(), cust.name, item.name, qty, total);
        orders.push(order);

        renderHistory();
        loadDropdowns();
        form.reset();
    });

    function renderHistory() {
        historyTable.innerHTML = orders.map(o =>
            `<tr><td>${o.customer}</td><td>${o.item}</td><td>${o.qty}</td><td>$${o.total}</td></tr>`
        ).join("");
    }

    loadDropdowns();
    renderHistory();
}
