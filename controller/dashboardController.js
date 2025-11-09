import { items, customers, orders } from "../db/database.js";

export function updateDashboard() {
    document.getElementById("dashboard").innerHTML = `
    <div class="dashboard-dark p-4 text-white">
      <h2 class="text-center fw-bold mb-4">
        <i class="fa-solid fa-utensils text-orange me-2"></i>Restaurant Dashboard
      </h2>

      <div class="row text-center g-4">
        
        <div class="col-md-3">
          <div class="dash-card bg-item">
            <div class="overlay"></div>
<!--            <i class="fa-solid fa-burger fa-2x mb-2 text-orange"></i>-->
<img src="../assets/image/download.jpeg" class="img-fluid">
           <h3>${items.length}</h3>
            <p>Items</p>
          </div>
        </div>

        <div class="col-md-3">
          <div class="dash-card bg-customer">
            <div class="overlay"></div>
<!--            <i class="fa-solid fa-user-group fa-2x mb-2 text-orange"></i>-->
<img src="../assets/image/img_1.png" class="img-fluid">
            <h3>${customers.length}</h3>
            <p>Customers</p>
          </div>
        </div>

        <div class="col-md-3">
          <div class="dash-card bg-order">
            <div class="overlay"></div>
<!--            <i class="fa-solid fa-receipt fa-2x mb-2 text-orange"></i>-->
<img src="../assets/image/img.png" class="img-fluid">
            <h3>${orders.length}</h3>
            <p>Orders</p>
          </div>
        </div>

        <div class="col-md-3">
          <div class="dash-card bg-revenue">
            <div class="overlay"></div>
<!--            <i class="fa-solid fa-sack-dollar fa-2x mb-2 text-orange"></i>-->
<img src="../assets/image/images%20(1).jpeg" class="img-fluid">
            <h3>$${orders.reduce((s,o)=>s+o.total,0).toFixed(2)}</h3>
            <p>Revenue</p>
          </div>
        </div>
      </div>  <!-- ===== Food Menu Section ===== -->
      <div class="food-menu mt-5 text-center">
        <h2 class="text-orange fw-bold mb-4">🍕 Food Menu 🍔</h2>
        <div class="menu-gallery d-flex flex-wrap justify-content-center gap-4">
          <div class="menu-card">
            <img src="../assets/image/img_2.png" class="menu-img" alt="Dish 1">
          </div> 
          <div class="menu-card">
            <img src="../assets/image/img_5.png" class="menu-img" alt="Dish 1">
          </div> 
          <div class="menu-card">
            <img src="../assets/image/img_6.png" class="menu-img" alt="Dish 1">
          </div>
          <div class="menu-card">
            <img src="../assets/image/img_3.png" class="menu-img" alt="Dish 2">
          </div>
          
        </div>
      </div>
    </div>`;

}
