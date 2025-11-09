class OrderDTO {
    constructor(id, date, customerId, items, subtotal, discountPercent, tax, total, status) {
        this.id = id;
        this.date = date;
        this.customerId = customerId;
        this.items = items; // Array of {itemId, quantity, price}
        this.subtotal = subtotal;
        this.discountPercent = discountPercent;
        this.tax = tax;
        this.total = total;
        this.status = status;
    }
}