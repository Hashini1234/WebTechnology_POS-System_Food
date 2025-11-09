class CustomerController {
    constructor() {
        this.editingCustomerId = null;
    }

    loadCustomersTable() {
        const customers = CustomerModel.getAllCustomers();
        const tbody = document.getElementById('customersTable');
        tbody.innerHTML = '';

        if (customers.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">No customers yet</td></tr>';
            return;
        }

        customers.forEach(customer => {
            const customerOrders = OrderModel.getAllOrders().filter(o => o.customerId === customer.id);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${customer.id}</td>
                <td><strong>${customer.name}</strong></td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td>${customerOrders.length}</td>
                <td>
                    <button class="btn btn-sm btn-edit" onclick="app.customerController.editCustomer('${customer.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
            `;
            tr.style.cursor = 'pointer';
            tr.onclick = (e) => {
                if (e.target.tagName !== 'BUTTON') {
                    this.editCustomer(customer.id);
                }
            };
            tbody.appendChild(tr);
        });
    }

    loadCustomerSelect() {
        const select = document.getElementById('customerSelect');
        select.innerHTML = '<option value="">Walk-in Customer</option>';

        CustomerModel.getAllCustomers().forEach(customer => {
            const option = document.createElement('option');
            option.value = customer.id;
            // Fixed: Proper template literal with backticks
            option.textContent = `${customer.name} (${customer.phone})`;
            select.appendChild(option);
        });
    }

    addCustomer() {
        const name = document.getElementById('customerName').value.trim();
        const email = document.getElementById('customerEmail').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();

        if (!name || !email || !phone) {
            alert('Please fill all fields.');
            return;
        }
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            alert('Invalid email format.');
            return;
        }
        if (!phone.match(/^\d{10}$/)) {
            alert('Phone must be 10 digits.');
            return;
        }
        if (CustomerModel.getAllCustomers().some(c => c.email === email || c.phone === phone)) {
            alert('Customer with this email or phone already exists.');
            return;
        }

        const customerDTO = new CustomerDTO(null, name, email, phone);
        CustomerModel.addCustomer(customerDTO);

        this.loadCustomersTable();
        this.loadCustomerSelect();
        this.clearForm();
        app.updateDashboardStats();
        alert('Customer added successfully!');
    }

    editCustomer(id) {
        const customer = CustomerModel.getCustomerById(id);
        if (customer) {
            this.editingCustomerId = id;
            document.getElementById('customerIdDisplay').value = customer.id;
            document.getElementById('customerName').value = customer.name;
            document.getElementById('customerEmail').value = customer.email;
            document.getElementById('customerPhone').value = customer.phone;

            document.getElementById('updateCustomerBtn').style.display = 'inline-block';
            document.getElementById('deleteCustomerBtn').style.display = 'inline-block';
        }
    }

    updateCustomer() {
        if (!this.editingCustomerId) return;

        const name = document.getElementById('customerName').value.trim();
        const email = document.getElementById('customerEmail').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();

        if (!name || !email || !phone) {
            alert('Please fill all fields.');
            return;
        }

        const existing = CustomerModel.getAllCustomers().find(c =>
            (c.email === email || c.phone === phone) && c.id !== this.editingCustomerId
        );
        if (existing) {
            alert('Another customer with this email or phone exists.');
            return;
        }

        const customerDTO = new CustomerDTO(this.editingCustomerId, name, email, phone);
        if (CustomerModel.updateCustomer(customerDTO)) {
            this.loadCustomersTable();
            this.loadCustomerSelect();
            this.clearForm();
            app.updateDashboardStats();
            alert('Customer updated!');
        } else {
            alert('Update failed.');
        }
    }

    deleteCustomer() {
        if (!this.editingCustomerId) return;

        if (confirm('Delete this customer? This cannot be undone.')) {
            if (CustomerModel.deleteCustomer(this.editingCustomerId)) {
                this.loadCustomersTable();
                this.loadCustomerSelect();
                this.clearForm();
                app.updateDashboardStats();
                alert('Customer deleted.');
            } else {
                alert('Cannot delete customer with existing orders.');
            }
        }
    }

    clearForm() {
        this.editingCustomerId = null;
        document.getElementById('customerIdDisplay').value = '';
        document.getElementById('customerName').value = '';
        document.getElementById('customerEmail').value = '';
        document.getElementById('customerPhone').value = '';
        document.getElementById('updateCustomerBtn').style.display = 'none';
        document.getElementById('deleteCustomerBtn').style.display = 'none';
    }
}