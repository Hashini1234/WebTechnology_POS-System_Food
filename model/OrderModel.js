class OrderModel {
    static getAllOrders() {
        return db.orders;
    }

    static getOrderById(id) {
        return db.orders.find(o => o.id === id);
    }

    static getCart() {
        return db.cart;
    }

    static setCart(cart) {
        db.cart = cart;
    }

    static createOrder(orderDTO) {
        // Find the next available ID
        const currentMaxId = db.orders.reduce((max, order) => {
            const num = parseInt(order.id.substring(1));
            return num > max ? num : max;
        }, 0);
        const newId = 'O' + String(currentMaxId + 1).padStart(3, '0');

        const newOrder = new OrderDTO(
            newId,
            new Date(),
            orderDTO.customerId,
            orderDTO.items,
            orderDTO.subtotal,
            orderDTO.discountPercent,
            orderDTO.tax,
            orderDTO.total,
            'Paid'
        );
        db.orders.push(newOrder);
        return newOrder;
    }
}