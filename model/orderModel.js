export class OrderModel {
    constructor(id, customer, item, qty, total) {
        this.id = id;
        this.customer = customer;
        this.item = item;
        this.qty = qty;
        this.total = total;
    }
}
