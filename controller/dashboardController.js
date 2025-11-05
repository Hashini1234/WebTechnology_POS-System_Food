import {items, customers, orders} from "../db/database.js";

export function updateDashboard() {
    document.getElementById("countItems").innerText = items.length;
    document.getElementById("countCustomers").innerText = customers.length;
    document.getElementById("countOrders").innerText = orders.length;

    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    document.getElementById("totalRevenue").innerText = "$" + totalRevenue.toFixed(2);
}
