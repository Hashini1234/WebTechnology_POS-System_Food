// Global Application Object
const app = {};

// Constants
app.TAX_RATE = 0.08; // Consistent 8% tax

// --- Application Logic ---
app.init = function() {
    app.customerController = new CustomerController();
    app.itemController = new ItemController();
    app.orderController = new OrderController();

    document.getElementById('loginForm').addEventListener('submit', app.login);
};

app.login = function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value.trim();

    if (username === 'admin' && password.toLowerCase() === 'elite123') {  // Case-insensitive for password
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('sidebar').style.display = 'block';
        document.getElementById('mainContent').style.display = 'block';

        app.customerController.loadCustomerSelect();
        app.showSection('dashboard');
    } else {
        alert('Invalid credentials! \n\nUse exactly:\nUsername: admin\nPassword: elite123 \n\n(Case-insensitive for password)');
        console.log('Login attempt: Username:', username, 'Password:', password);  // For debugging
    }
};

app.logout = function() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('sidebar').style.display = 'none';
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
};

app.showSection = function(section) {
    const sections = ['dashboard', 'item-management', 'pos', 'order-history', 'customers'];

    for (const s of sections) {
        const element = document.getElementById(s);
        if (element) {
            element.style.display = s === section ? 'block' : 'none';
        }
    }

    // Update active nav
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

    const activeLink = document.querySelector(`.nav-link[onclick*="showSection('${section}')"]`) ||
        document.querySelector(`.nav-link[href="#${section}"]`);
    if (activeLink) activeLink.classList.add('active');

    // Load section data
    switch (section) {
        case 'dashboard': app.updateDashboardStats(); break;
        case 'item-management': app.itemController.loadItemsTable(); break;
        case 'pos': app.orderController.loadPOS(); break;
        case 'order-history': app.orderController.loadOrderHistory(); break;
        case 'customers': app.customerController.loadCustomersTable(); break;
    }
};

app.updateDashboardStats = function() {
    const today = new Date().toDateString();
    const allOrders = OrderModel.getAllOrders();
    const allCustomers = CustomerModel.getAllCustomers();
    const allItems = ItemModel.getAllItems();

    const todayOrders = allOrders.filter(o => new Date(o.date).toDateString() === today);
    const todaySales = todayOrders.reduce((sum, o) => sum + o.total, 0);

    document.getElementById('todaySales').textContent = `LKR ${todaySales.toFixed(2)}`;
    document.getElementById('todayOrders').textContent = todayOrders.length;
    document.getElementById('totalCustomers').textContent = allCustomers.length;
    document.getElementById('menuItemsCount').textContent = allItems.length;

    const recent = allOrders.slice(-5).reverse();
    const tbody = document.getElementById('recentOrders');
    tbody.innerHTML = '';

    if (recent.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-muted">No orders yet</td></tr>';
    } else {
        recent.forEach(order => {
            const customer = allCustomers.find(c => c.id === order.customerId);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${order.id}</strong></td>
                <td>${customer ? customer.name : 'Walk-in'}</td>
                <td>${order.items.length} item${order.items.length > 1 ? 's' : ''}</td>
                <td><strong>LKR ${order.total.toFixed(2)}</strong></td>
                <td><span class="badge ${order.status === 'Paid' ? 'badge-paid' : 'badge-unpaid'}">${order.status}</span></td>
            `;
            tbody.appendChild(tr);
        });
    }
};

// Make app global
window.app = app;

// Start app
document.addEventListener('DOMContentLoaded', () => app.init());