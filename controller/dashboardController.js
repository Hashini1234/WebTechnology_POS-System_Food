import { items, customers, orders } from "../db/database.js";

export function updateDashboard() {
    document.getElementById("dashboard").innerHTML = `
    <h2><i class="fa-solid fa-chart-line"></i> Dashboard</h2>
    <div class="row text-center mt-4">
      <div class="col-md-3 mb-3"><div class="card p-4"><h4 class="text-warning">${items.length}</h4><p>Items</p></div></div>
      <div class="col-md-3 mb-3"><div class="card p-4"><h4 class="text-info">${customers.length}</h4><p>Customers</p></div></div>
      <div class="col-md-3 mb-3"><div class="card p-4"><h4 class="text-success">${orders.length}</h4><p>Orders</p></div></div>
      <div class="col-md-3 mb-3"><div class="card p-4"><h4 class="text-danger">$${orders.reduce((s,o)=>s+o.total,0).toFixed(2)}</h4><p>Revenue</p></div></div>
    </div>`;
}
