// Admin login
const adminForm = document.getElementById("adminLoginForm");
if (adminForm) {
  adminForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:5000/api/auth/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("message").innerText = "❌" + data.message;
    }
  });
}

// Employee login
const empForm = document.getElementById("employeeLoginForm");
if (empForm) {
  empForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:5000/api/auth/employee-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "dashboard-emp.html";
    } else {
      document.getElementById("message").innerText = "❌" + data.message;
    }
  });
}
