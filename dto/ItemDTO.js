class ItemDTO {
    constructor(id, name, category, price, stock, image) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
        // Default image for new items
        this.image = image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80';
    }
}