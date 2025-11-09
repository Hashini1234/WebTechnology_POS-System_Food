class OrderController {
    constructor() {
        // Removed this.TAX_RATE, use app.TAX_RATE global
    }

    loadPOS() {
        this.filterMenu('All');
        this.updateCartDisplay();
        app.customerController.loadCustomerSelect();
    }

    filterMenu(category) {
        document.querySelectorAll('.category-btn').forEach(btn => {
            const btnText = btn.textContent.trim();
            const isActive = (category === 'All' && btnText === 'All') ||
                (btnText.includes(category) && category !== 'All');
            btn.classList.toggle('active', isActive);
        });

        const grid = document.getElementById('menuGrid');
        grid.innerHTML = '';

        const allItems = ItemModel.getAllItems();
        const filteredItems = category === 'All'
            ? allItems
            : allItems.filter(item => item.category === category);

        filteredItems.forEach(item => {
            const currentItem = ItemModel.getItemById(item.id);
            if (currentItem && currentItem.stock > 0) {
                const col = document.createElement('div');
                col.className = 'col-md-6 col-lg-4';
                col.innerHTML = `
                    <div class="item-card glass p-3 text-center" onclick="app.orderController.addToCart('${currentItem.id}')">
                        <img src="${currentItem.image || 'https://via.placeholder.com/150'}" 
                             alt="${currentItem.name}" class="img-fluid rounded mb-3" style="height: 120px; object-fit: cover;">
                        <h5 class="mb-1">${currentItem.name}</h5>
                        <p class="text-muted small">${currentItem.category}</p>
                        <h6 class="text-warning">LKR ${currentItem.price.toFixed(2)}</h6>
                        <span class="badge bg-${currentItem.stock < 5 ? 'danger' : 'success'}">
                            ${currentItem.stock} left
                        </span>
                    </div>
                `;
                grid.appendChild(col);
            }
        });
    }

    addToCart(itemId) {
        const item = ItemModel.getItemById(itemId);
        let cart = OrderModel.getCart();

        if (!item || item.stock <= 0) {
            alert('Sorry, this item is out of stock!');
            return;
        }

        const existing = cart.find(c => c.item.id === itemId);
        if (existing) {
            if (existing.quantity + 1 > item.stock) {
                alert(`Only ${item.stock} ${item.name}(s) available!`);
                return;
            }
            existing.quantity++;
        } else {
            cart.push({
                item: {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    stock: item.stock
                },
                quantity: 1
            });
        }

        OrderModel.setCart(cart);
        this.updateCartDisplay();
    }

    updateCartDisplay() {
        const cart = OrderModel.getCart();
        const container = document.getElementById('cartItems');
        const subtotalEl = document.getElementById('subtotal');
        const taxEl = document.getElementById('taxAmount');
        const totalEl = document.getElementById('orderTotal');
        const badge = document.getElementById('cartBadge');
        const placeBtn = document.getElementById('placeOrderBtn');
        const discountInput = document.getElementById('discountPercent');

        let discountPercent = parseFloat(discountInput.value);
        if (isNaN(discountPercent) || discountPercent < 0 || discountPercent > 100) {
            alert('Discount must be between 0 and 100%');
            discountInput.value = '0';
            discountPercent = 0;
        }

        if (cart.length === 0) {
            container.innerHTML = `
                <div class="text-center py-5 text-muted">
                    <i class="fas fa-shopping-cart fa-4x mb-3 opacity-50"></i>
                    <p>Your cart is empty</p>
                </div>`;
            subtotalEl.textContent = 'LKR 0.00';
            taxEl.textContent = 'LKR 0.00';
            totalEl.textContent = 'LKR 0.00';
            badge.textContent = '0';
            placeBtn.disabled = true;
            return;
        }

        let subtotal = 0;
        container.innerHTML = '';

        cart.forEach((entry, index) => {
            const itemTotal = entry.item.price * entry.quantity;
            subtotal += itemTotal;

            const div = document.createElement('div');
            div.className = 'd-flex justify-content-between align-items-center py-3 border-bottom';
            div.innerHTML = `
                <div>
                    <strong>${entry.item.name}</strong>
                    <small class="text-muted d-block">LKR ${entry.item.price.toFixed(2)} × ${entry.quantity}</small>
                </div>
                <div class="text-end">
                    <strong>LKR ${itemTotal.toFixed(2)}</strong>
                    <button class="btn btn-sm btn-danger ms-3" onclick="app.orderController.removeFromCart(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            container.appendChild(div);
        });

        const discountAmount = subtotal * (discountPercent / 100);
        const taxable = subtotal - discountAmount;
        const tax = taxable * app.TAX_RATE;
        const grandTotal = taxable + tax;

        subtotalEl.textContent = `LKR ${subtotal.toFixed(2)}`;
        taxEl.textContent = `LKR ${tax.toFixed(2)}`;
        totalEl.textContent = `LKR ${grandTotal.toFixed(2)}`;
        badge.textContent = cart.reduce((s, c) => s + c.quantity, 0);
        placeBtn.disabled = false;
    }

    removeFromCart(index) {
        let cart = OrderModel.getCart();
        cart.splice(index, 1);
        OrderModel.setCart(cart);
        this.updateCartDisplay();
    }

    clearCart() {
        OrderModel.setCart([]);
        document.getElementById('discountPercent').value = '0';
        this.updateCartDisplay();
    }

    placeOrder() {
        const cart = OrderModel.getCart();
        if (cart.length === 0) {
            alert('Cart is empty!');
            return;
        }

        // Stock Check
        for (let entry of cart) {
            const item = ItemModel.getItemById(entry.item.id);
            if (!item || entry.quantity > item.stock) {
                alert(`Not enough stock for ${entry.item.name}\nAvailable: ${item ? item.stock : 0}`);
                return;
            }
        }

        // Deduct Stock
        cart.forEach(entry => ItemModel.deductStock(entry.item.id, entry.quantity));

        // Calculations
        const discountPercent = parseFloat(document.getElementById('discountPercent').value) || 0;
        const subtotal = cart.reduce((s, e) => s + e.item.price * e.quantity, 0);
        const discountAmount = subtotal * (discountPercent / 100);
        const taxable = subtotal - discountAmount;
        const tax = taxable * app.TAX_RATE;
        const total = taxable + tax;

        const orderDTO = new OrderDTO(
            null,
            new Date().toISOString(),
            document.getElementById('customerSelect').value || null,
            cart.map(e => ({ itemId: e.item.id, quantity: e.quantity, price: e.item.price })),
            subtotal,
            discountPercent,
            tax,
            total,
            'Paid'
        );

        const newOrder = OrderModel.createOrder(orderDTO);

        alert(`Order ${newOrder.id} Placed Successfully!\nTotal: LKR ${total.toFixed(2)}`);

        this.clearCart();
        app.updateDashboardStats();
        this.filterMenu('All'); // Refresh menu
    }

    loadOrderHistory() {
        const orders = OrderModel.getAllOrders().slice().reverse();
        const customers = CustomerModel.getAllCustomers();
        const tbody = document.getElementById('historyTable');
        tbody.innerHTML = orders.length === 0
            ? '<tr><td colspan="8" class="text-center py-5 text-muted">No orders yet</td></tr>'
            : '';

        orders.forEach(order => {
            const customer = customers.find(c => c.id === order.customerId);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${order.id}</strong></td>
                <td>${new Date(order.date).toLocaleString()}</td>
                <td>${customer?.name || 'Walk-in'}</td>
                <td>${order.items.length} items</td>
                <td><strong>LKR ${order.total.toFixed(2)}</strong></td>
                <td>${order.discountPercent}%</td>
                <td><span class="badge bg-${order.status === 'Paid' ? 'success' : 'danger'}">${order.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="app.orderController.viewOrder('${order.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    viewOrder(id) {
        const order = OrderModel.getOrderById(id);
        if (!order) return;

        const customer = CustomerModel.getCustomerById(order.customerId);
        let items = '';
        order.items.forEach(i => {
            const item = ItemModel.getItemById(i.itemId);
            items += `${item?.name || 'Unknown'} × ${i.quantity} = LKR ${(i.price * i.quantity).toFixed(2)}\n`;
        });

        const discountAmt = order.subtotal * (order.discountPercent / 100);

        alert(`
ORDER ${order.id}
Date: ${new Date(order.date).toLocaleString()}
Customer: ${customer?.name || 'Walk-in'}

Items:
${items}
Subtotal: LKR ${order.subtotal.toFixed(2)}
Discount: ${order.discountPercent}% (-LKR ${discountAmt.toFixed(2)})
Tax (8%): LKR ${order.tax.toFixed(2)}
TOTAL: LKR ${order.total.toFixed(2)}
Status: ${order.status}
        `.trim());
    }
}