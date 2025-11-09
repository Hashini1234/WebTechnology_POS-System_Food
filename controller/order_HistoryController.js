export function renderHistory() {
    console.log("Rendering Order History");
    const section = document.getElementById("history");

    section.innerHTML = `
        <h3>Order History</h3>
        <div class="table-container">
            <table class="table table-dark table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody id="historyTable"></tbody>
            </table>
        </div>
    `;

    // Load and display order history
    loadOrderHistory();
}

function loadOrderHistory() {
    // Import your orders array from database.js
    import('../db/database.js').then(module => {
        const orders = module.orderHistory || []; // Assuming you have orderHistory array in database.js
        const tbody = document.getElementById('historyTable');

        if (orders.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center">No order history available</td></tr>';
            return;
        }

        tbody.innerHTML = orders.map(order => `
            <tr>
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.item}</td>
                <td>${order.qty}</td>
                <td>Rs. ${order.total.toFixed(2)}</td>
            </tr>
        `).join('');
    });
}