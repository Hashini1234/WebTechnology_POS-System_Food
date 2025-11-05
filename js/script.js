import {updateDashboard} from "../controller/dashboardController.js";
import {initItemPage} from "../controller/itemController.js";
import {initCustomerPage} from "../controller/customerController.js";
import {initOrderPage} from "../controller/orderController.js";

export function showPage(pageId) {
    document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
    document.getElementById(pageId).classList.remove("hidden");

    if (pageId === "dashboard") updateDashboard();
    if (pageId === "items") initItemPage();
    if (pageId === "customers") initCustomerPage();
    if (pageId === "orders" || pageId === "orderHistory") initOrderPage();
}
