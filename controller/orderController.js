
export function renderOrders() {
    console.log("wadadha")
    const section = document.getElementById("orders");
    section.innerHTML = `
       <!-- ORDERS -->
                        <h3>Place Order</h3>
                    <div class="row mt-3">
                        <div class="col-md-6">
                            <label>Customer</label>
                            <select id="orderCustomer" class="form-select mb-2"></select>
                            <label>Item</label>
                            <select id="orderItem" class="form-select mb-2"></select>
                            <label>Quantity</label>
                            <input id="orderQty" type="number" class="form-control mb-2" min="1">
                            <button class="btn-main" id="placeOrderBtn">Place Order</button>
                        </div>
                    </div>`;


}
