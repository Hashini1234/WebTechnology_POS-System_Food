// Users for login
export const user = { username: "admin", password: "1234" };

// Arrays for POS system
export let items = [];
export let customers = [];
export let orders = [];
export let orderHistory = [];

// Function to add order to history
export function addToOrderHistory(order) {
    orderHistory.push(order);
}
