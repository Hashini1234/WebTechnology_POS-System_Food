// Users for login
export const user = { username: "admin", password: "1234" };

// Arrays for POS system
export let items = [];
export let customers = [];
export let orders = [];
export let orderHistory = [];

// Function to add order to history with sequential ID
export function addToOrderHistory(order) {
    // Assign sequential ID
    order.id = orderHistory.length + 1;
    orderHistory.push(order);
}

// Optional: Delete order and re-sequence IDs
export function deleteOrderHistory(id) {
    const index = orderHistory.findIndex(o => o.id === id);
    if (index !== -1) {
        orderHistory.splice(index, 1);
        // Re-sequence IDs
        orderHistory.forEach((o, idx) => o.id = idx + 1);
    }
}

