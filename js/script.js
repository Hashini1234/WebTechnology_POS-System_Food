import {updateDashboard} from "../controller/dashboardController.js";

export function showPage(pageId) {
    document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
    const page = document.getElementById(pageId);
    if (page) page.classList.remove("hidden");

    document.querySelectorAll(".nav-link").forEach(a => a.classList.remove("active"));
    const link = document.querySelector(`.nav-link[data-page="${pageId}"]`);
    if (link) link.classList.add("active");

    if (pageId === "dashboard") updateDashboard();
}
