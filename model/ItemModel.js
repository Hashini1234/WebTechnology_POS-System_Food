class ItemModel {
    static getAllItems() {
        return db.menuItems;
    }

    static getItemById(id) {
        return db.menuItems.find(i => i.id === id);
    }

    static addItem(itemDTO) {
        // Find the next available ID
        const currentMaxId = db.menuItems.reduce((max, item) => {
            const num = parseInt(item.id.substring(1));
            return num > max ? num : max;
        }, 0);
        const newId = 'I' + String(currentMaxId + 1).padStart(3, '0');

        const newItem = new ItemDTO(
            newId,
            itemDTO.name,
            itemDTO.category,
            itemDTO.price,
            itemDTO.stock,
            itemDTO.image
        );
        db.menuItems.push(newItem);
        return newItem;
    }

    static updateItem(itemDTO) {
        const index = db.menuItems.findIndex(i => i.id === itemDTO.id);
        if (index !== -1) {
            // Ensure we update using the existing item to preserve properties like image if DTO doesn't have it
            const existingItem = db.menuItems[index];
            db.menuItems[index] = { ...existingItem, ...itemDTO };
            return true;
        }
        return false;
    }

    static deleteItem(id) {
        const initialLength = db.menuItems.length;
        db.menuItems = db.menuItems.filter(i => i.id !== id);
        return db.menuItems.length < initialLength;
    }

    static deductStock(itemId, quantity) {
        const item = ItemModel.getItemById(itemId);
        if (item && item.stock >= quantity) {
            item.stock -= quantity;
            return true;
        }
        return false;
    }
}