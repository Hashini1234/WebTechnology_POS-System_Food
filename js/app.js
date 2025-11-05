import {showPage} from "./script.js";
import {updateDashboard} from "../controller/dashboardController.js";
import {initItemPage} from "../controller/itemController.js";
import {initCustomerPage} from "../controller/customerController.js";
import {initOrderPage} from "../controller/orderController.js";

const user = {username: "admin", password: "1234"};

document.getElementById("loginBtn").onclick = () => {
    const u = document.getElementById("username").value.trim();
    const p = document.getElementById("password").value.trim();
    if (u === user.username && p === user.password) {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("app").style.display = "flex";
        showPage("dashboard");
        updateDashboard();
    } else {
        alert("Invalid username or password!");
    }
};

document.getElementById("logoutBtn").onclick = () => {
    document.getElementById("app").style.display = "none";
    document.getElementById("loginPage").style.display = "block";
};

document.querySelectorAll(".sidebar li").forEach(li => {
    li.addEventListener("click", () => {
        document.querySelectorAll(".sidebar li").forEach(x => x.classList.remove("active"));
        li.classList.add("active");
        showPage(li.dataset.page);
        if (li.dataset.page === "items") initItemPage();
        if (li.dataset.page === "customers") initCustomerPage();
        if (li.dataset.page === "orders" || li.dataset.page === "history") initOrderPage();
    });
});
