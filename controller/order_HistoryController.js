
export function renderHistory() {
    console.log("wadadha111")
    const section = document.getElementById("order History");
    section.innerHTML = `
       <!-- ORDERS -->
                        <h3> Order History</h3>
                     <div id="history" class="page hidden">
                    <h3>Order History</h3>
                    <div class="table-container">
                        <table class="table table-dark table-hover">
                            <thead><tr><th>ID</th><th>Customer</th><th>Item</th><th>Qty</th><th>Total</th></tr></thead>
                            <tbody id="historyTable"></tbody>
                        </table>
                    </div>
                </div>`;


}
