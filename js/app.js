import {showPage} from "./script.js";
import {updateDashboard} from "../controller/dashboardController.js";

// ✅ Define correct login user
const user = {username: "admin", password: "1234"};

// ✅ Handle login button click
document.getElementById("loginBtn").onclick = () => {
    const u = document.getElementById("username").value.trim();
    const p = document.getElementById("password").value.trim();

    if (u === user.username && p === user.password) {
        // Hide login page
        document.getElementById("loginPage").style.display = "none";
        // Show main app
        document.getElementById("app").style.display = "block";
        // Load dashboard
        showPage("dashboard");
        updateDashboard();
    } else {
        alert("Invalid username or password!");
    }
};

// ✅ Handle logout
document.getElementById("logoutBtn").onclick = () => {
    document.getElementById("app").style.display = "none";
    document.getElementById("loginPage").style.display = "flex";
};
