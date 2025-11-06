import { customers, items, orders } from "../db/database.js";
import { Order } from "../model/orderModel.js";

export function renderHistory() {
    const section = document.getElementById("history");
    if (orders.length === 0) {
        section.innerHTML = `<h2>Order History</h2><p class="text-muted">No orders yet.</p>`;
        return;
    }
    section.innerHTML = `
    <h2>Order History</h2>
    <table class="table table-dark"><thead><tr><th>Customer</th><th>Item</th><th>Qty</th><th>Total</th></tr></thead>
    <tbody>${orders.map(o => `<tr><td>${o.customer}</td><td>${o.item}</td><td>${o.qty}</td><td>$${o.total.toFixed(2)}</td></tr>`).join('')}</tbody>
    </table>`;
}
