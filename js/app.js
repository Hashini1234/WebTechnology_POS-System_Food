import { user } from "../db/database.js";
import { updateDashboard } from "../controller/dashboardController.js";
import { renderItems } from "../controller/itemController.js";
import { renderCustomers } from "../controller/customerController.js";
import { renderHistory } from "../controller/order_HistoryController.js";
import { renderOrders } from "../controller/orderController.js";

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

loginBtn.onclick = () => {
    const u = username.value.trim();
    const p = password.value.trim();
    if (u === user.username && p === user.password) {
        loginPage.style.display = "none";
        app.style.display = "block";
        showPage("dashboard");
    } else alert("Invalid credentials!");
};

logoutBtn.onclick = () => {
    app.style.display = "none";
    loginPage.style.display = "block";
    username.value = "";
    password.value = "";
};

function showPage(id) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    if (id === "dashboard") updateDashboard();
    if (id === "items") renderItems();
    if (id === "customers") renderCustomers();
    if (id === "orders") renderOrders();
    if (id === "order History") renderHistory();
}

document.querySelectorAll(".sidebar li").forEach(li => {
    li.addEventListener("click", () => {
        document.querySelectorAll(".sidebar li").forEach(x => x.classList.remove("active"));
        li.classList.add("active");
        showPage(li.dataset.page);
    });
});
