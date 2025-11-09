class ItemController {
    constructor() {
        this.editingItemId = null;
    }

    loadItemsTable() {
        const menuItems = ItemModel.getAllItems();
        const tbody = document.getElementById('itemsTable');
        tbody.innerHTML = '';

        menuItems.forEach(item => {
            const statusClass = item.stock < 10 ? 'low-stock' : '';
            const statusBadge = item.stock > 0
                ? '<span class="badge" style="background: rgba(40, 167, 69, 0.2); color: var(--success);">Available</span>'
                : '<span class="badge badge-unpaid">Out of Stock</span>';
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.id}</td>
                <td><strong>${item.name}</strong></td>
                <td>${item.category}</td>
                <td>LKR ${item.price.toFixed(2)}</td>
                <td class="${statusClass}">${item.stock}</td>
                <td>${statusBadge}</td>
                <td>
                    <button class="btn btn-sm btn-edit" onclick="app.itemController.editItem('${item.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    addItem() {
        const name = document.getElementById('itemName').value.trim();
        const price = parseFloat(document.getElementById('itemPrice').value);
        const stock = parseInt(document.getElementById('itemStock').value);
        const category = document.getElementById('itemCategory').value;

        if (!name || isNaN(price) || isNaN(stock) || !category || price <= 0 || stock < 0) {
            alert('Please fill all fields correctly.');
            return;
        }

        const itemDTO = new ItemDTO(null, name, category, price, stock);
        ItemModel.addItem(itemDTO);

        this.loadItemsTable();
        this.clearForm();
        app.updateDashboardStats();
        alert('Menu item added successfully!');
    }

    editItem(id) {
        const item = ItemModel.getItemById(id);
        if (item) {
            this.editingItemId = id;
            document.getElementById('itemIdDisplay').value = item.id;
            document.getElementById('itemName').value = item.name;
            document.getElementById('itemPrice').value = item.price;
            document.getElementById('itemStock').value = item.stock;
            document.getElementById('itemCategory').value = item.category;

            document.getElementById('updateBtn').style.display = 'inline-block';
            document.getElementById('deleteBtn').style.display = 'inline-block';
        }
    }

    updateItem() {
        if (!this.editingItemId) return;

        const name = document.getElementById('itemName').value.trim();
        const price = parseFloat(document.getElementById('itemPrice').value);
        const stock = parseInt(document.getElementById('itemStock').value);
        const category = document.getElementById('itemCategory').value;

        if (!name || isNaN(price) || isNaN(stock) || !category || price <= 0 || stock < 0) {
            alert('Please fill all fields correctly.');
            return;
        }

        const item = ItemModel.getItemById(this.editingItemId);
        const itemDTO = new ItemDTO(
            this.editingItemId,
            name,
            category,
            price,
            stock,
            item.image
        );

        if (ItemModel.updateItem(itemDTO)) {
            this.loadItemsTable();
            this.clearForm();
            // Refresh POS menu if active
            const activeCategoryBtn = document.querySelector('#categoryFilters .category-btn.active');
            if (activeCategoryBtn) {
                app.orderController.filterMenu(activeCategoryBtn.textContent.replace('s', '') === 'All' ? 'All' : activeCategoryBtn.textContent.replace('s', ''));
            }
            alert('Menu item updated!');
        } else {
            alert('Update failed.');
        }
    }

    deleteItem() {
        if (!this.editingItemId) return;

        if (confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
            if (ItemModel.deleteItem(this.editingItemId)) {
                this.loadItemsTable();
                this.clearForm();
                app.updateDashboardStats();
                alert('Menu item deleted.');
            } else {
                alert('Deletion failed.');
            }
        }
    }

    clearForm() {
        this.editingItemId = null;
        document.getElementById('itemIdDisplay').value = '';
        document.getElementById('itemName').value = '';
        document.getElementById('itemPrice').value = '';
        document.getElementById('itemStock').value = '';
        document.getElementById('itemCategory').value = '';
        document.getElementById('updateBtn').style.display = 'none';
        document.getElementById('deleteBtn').style.display = 'none';
    }
}