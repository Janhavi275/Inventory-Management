const loginForm = document.getElementById('loginForm');
const message = document.getElementById('message');
const backBtn = document.getElementById('backBtn');
const loginDiv = document.getElementById('loginDiv');
const dashboardDiv = document.getElementById('dashboardDiv');
const logoutBtn = document.getElementById('logoutBtn');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Determine role based on current page
    const role = window.location.pathname.includes('admin.html') ? 'admin' : 'employee';

    message.textContent = 'Logging in...';
    message.style.color = 'black';

    try {
      const response = await window.api.login(email, password, role);
      if (response.success) {
        message.style.color = 'green';
        message.textContent = response.message;

        // Show dashboard, hide login form
        loginDiv.style.display = 'none';
        dashboardDiv.style.display = 'block';
      } else {
        message.style.color = 'red';
        message.textContent = response.message;
      }
    } catch (error) {
      message.style.color = 'red';
      message.textContent = 'An error occurred during login.';
    }
  });
}

if (backBtn) {
  backBtn.addEventListener('click', () => {
    window.api.navigate('index');
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    // Reset UI to login form
    dashboardDiv.style.display = 'none';
    loginDiv.style.display = 'block';
    message.textContent = '';
    loginForm.reset();
  });
}