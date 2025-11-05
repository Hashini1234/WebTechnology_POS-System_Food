import {showPage} from "./script.js";
import {updateDashboard} from "../controller/dashboardController.js";
import "../controller/itemController.js";
import "../controller/customerController.js";
import "../controller/orderController.js";

const user = {username: "admin", password: "1234"};
document.getElementById("loginBtn").onclick = () => {
    const u = document.getElementById("username").value.trim();
    const p = document.getElementById("password").value.trim();
    if (u === user.username && p === user.password) {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("app").style.display = "block";
        showPage("dashboard");
        updateDashboard();
    } else alert("Invalid credentials!");
};
document.getElementById("logoutBtn").onclick = () => {
    document.getElementById("app").style.display = "none";
    document.getElementById("loginPage").style.display = "flex";
};
document.querySelectorAll(".nav-link").forEach(link =>
    link.addEventListener("click", () => showPage(link.dataset.page))
);
