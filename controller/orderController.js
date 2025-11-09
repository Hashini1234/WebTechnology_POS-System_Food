import { items, customers, orders, addToOrderHistory } from "../db/database.js";
import { Order } from "../model/orderModel.js";

export function renderOrders() {
    const section = document.getElementById("orders");

    section.innerHTML = `
    <div class="container py-4">
        <div class="card shadow-lg border-0 rounded-4 overflow-hidden" style="background-color:#fff3e0;">
            <div class="card-header text-dark d-flex justify-content-between align-items-center" style="background-color:#ffa94d;">
                <h4 class="mb-0 fw-semibold"><i class="fa-solid fa-utensils me-2"></i>Place New Order</h4>
                <span class="badge bg-light text-dark">POS Dashboard</span>
            </div>
            <div class="card-body" style="background-color:#fffaf3;">
                <div class="row g-4">
                    <!-- LEFT SIDE -->
                    <div class="col-lg-5">
                        <div class="p-4 bg-white rounded-4 shadow-sm h-100 border" style="border-color:#ffe0b2;">
                            <h5 class="text-secondary mb-3"><i class="fa-solid fa-clipboard-list me-2 text-warning"></i>Order Details</h5>
                            <label class="form-label fw-bold">Select Customer</label>
                            <select id="orderCustomer" class="form-select mb-3 shadow-sm" style="border-color:#ffd28e;">
                                <option value="">-- Choose Customer --</option>
                            </select>
                            <label class="form-label fw-bold">Select Item</label>
                            <select id="orderItem" class="form-select mb-3 shadow-sm" style="border-color:#ffd28e;">
                                <option value="">-- Choose Item --</option>
                            </select>
                            <label class="form-label fw-bold">Quantity</label>
                            <input id="orderQty" type="number" min="1" placeholder="Enter quantity" 
                                class="form-control mb-4 shadow-sm" style="border-color:#ffd28e;">
                            <button class="btn w-100 py-2 fw-semibold text-white shadow-sm" 
                                id="placeOrderBtn" style="background-color:#ff9800; border:none;">
                                <i class="fa-solid fa-paper-plane me-2"></i>Place Order
                            </button>
                        </div>
                    </div>
                    <!-- RIGHT SIDE -->
                    <div class="col-lg-7">
                        <div class="p-4 bg-white rounded-4 shadow-sm h-100 border" style="border-color:#ffe0b2;">
                            <h5 class="text-secondary mb-3"><i class="fa-solid fa-list-check me-2 text-warning"></i>Order Summary</h5>
                            <div id="orderSummary" class="p-3 rounded-3 bg-light border border-1" style="border-color:#ffd28e;">
                                <p class="text-center text-muted mb-0">No order placed yet.</p>
                            </div>
                            <hr class="my-4" style="border-color:#ffd28e;">
                            <h6 class="fw-bold text-secondary">Recent Orders</h6>
                            <table class="table table-hover mt-2 align-middle">
                                <thead style="background-color:#ffb74d; color:#fff;">
                                    <tr>
                                        <th>Customer</th>
                                        <th>Item</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="orderHistory">
                                    <tr><td colspan="5" class="text-center text-muted">No orders yet</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    const customerSelect = document.getElementById("orderCustomer");
    const itemSelect = document.getElementById("orderItem");
    const orderQty = document.getElementById("orderQty");
    const placeBtn = document.getElementById("placeOrderBtn");
    const orderHistoryTable = document.getElementById("orderHistory");

    // Populate customer dropdown
    function loadCustomers() {
        customerSelect.innerHTML = `<option value="">-- Choose Customer --</option>` +
            customers.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
    }

    // Populate item dropdown
    function loadItems() {
        itemSelect.innerHTML = `<option value="">-- Choose Item --</option>` +
            items.map(i => `<option value="${i.name}">${i.name} (${i.qty})</option>`).join('');
    }

    function loadOrderHistory() {
        if (orders.length === 0) {
            orderHistoryTable.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No orders yet</td></tr>';
            return;
        }
        orderHistoryTable.innerHTML = orders.map(o => `
            <tr>
                <td>${o.customer}</td>
                <td>${o.item}</td>
                <td>${o.qty}</td>
                <td>Rs. ${o.total.toFixed(2)}</td>
                <td><button class="btn btn-sm text-white" style="background-color:#e57300; border:none;" onclick="deleteOrder(${o.id})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
        `).join('');
    }

    // Place order
    placeBtn.addEventListener("click", () => {
        const customer = customerSelect.value;
        const itemName = itemSelect.value;
        const qty = parseInt(orderQty.value);

        if (!customer || !itemName || !qty) return alert("Please fill all fields correctly!");

        const item = items.find(i => i.name === itemName);
        if (!item) return alert("Item not found!");
        if (qty > item.qty) return alert(`Only ${item.qty} items available`);

        const total = item.price * qty;

        // Sequential ID based on orderHistory length
        const id = orderHistory.length + 1;

        const order = new Order(id, customer, itemName, qty, total);
        orders.push(order);
        addToOrderHistory(order);

        // Reduce item quantity
        item.qty -= qty;

        orderQty.value = "";
        loadOrderHistory();
        loadItems();
        alert("Order placed successfully!");
    });

    // Delete order function
    window.deleteOrder = id => {
        const index = orders.findIndex(o => o.id === id);
        if (index !== -1) {
            // Restore item qty when deleting
            const o = orders[index];
            const item = items.find(i => i.name === o.item);
            if (item) item.qty += o.qty;

            orders.splice(index, 1);
            loadOrderHistory();
            loadItems();
        }
    };

    loadCustomers();
    loadItems();
    loadOrderHistory();
}
