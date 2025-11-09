// Simulated Database (In a real app, this would be AJAX calls to a server or localStorage)
let db = {
    menuItems: [
        { id: 'I001', name: 'Bruschetta', category: 'Appetizer', price: 500, stock: 30, image: 'https://images.unsplash.com/photo-1594005758584-a334daee074c?auto=format&fit=crop&w=500&q=80' },
        { id: 'I002', name: 'Grilled Chicken', category: 'Main Course', price: 1200, stock: 20, image: 'https://images.unsplash.com/photo-1600554120520-200170849ae5?auto=format&fit=crop&w=500&q=80' },
        { id: 'I003', name: 'Tiramisu', category: 'Dessert', price: 600, stock: 15, image: 'https://images.unsplash.com/photo-1567604133954-61e0c4b63e00?auto=format&fit=crop&w=500&q=80' },
        { id: 'I004', name: 'Cola', category: 'Beverage', price: 200, stock: 50, image: 'https://images.unsplash.com/photo-1629203849820-16ac2a677c32?auto=format&fit=crop&w=500&q=80' },
        { id: 'I005', name: 'Caesar Salad', category: 'Appetizer', price: 450, stock: 25, image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=500&q=80' },
        { id: 'I006', name: 'Steak', category: 'Main Course', price: 1800, stock: 10, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80' }
    ],
    customers: [
        { id: 'C001', name: 'Nimal Perera', email: 'nimal@mail.com', phone: '0771234567' },
        { id: 'C002', name: 'Kamala Silva', email: 'kamala@mail.com', phone: '0719876543' }
    ],
    orders: [],
    // POS specific state
    cart: [],
};