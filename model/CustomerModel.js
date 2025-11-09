class CustomerModel {
    static getAllCustomers() {
        return db.customers;
    }

    static getCustomerById(id) {
        return db.customers.find(c => c.id === id);
    }

    static addCustomer(customerDTO) {
        const newId = 'C' + String(db.customers.length + 1).padStart(3, '0');
        const newCustomer = new CustomerDTO(newId, customerDTO.name, customerDTO.email, customerDTO.phone);
        db.customers.push(newCustomer);
        return newCustomer;
    }

    static updateCustomer(customerDTO) {
        const index = db.customers.findIndex(c => c.id === customerDTO.id);
        if (index !== -1) {
            db.customers[index] = customerDTO;
            return true;
        }
        return false;
    }

    static deleteCustomer(id) {
        const hasOrders = db.orders.some(o => o.customerId === id);
        if (hasOrders) return false;

        const initialLength = db.customers.length;
        db.customers = db.customers.filter(c => c.id !== id);
        return db.customers.length < initialLength;
    }
}