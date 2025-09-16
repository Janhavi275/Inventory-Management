// employee_list.js

async function fetchEmployees() {
  try {
    const res = await fetch("/api/employees"); 
    const employees = await res.json();

    const tbody = document.getElementById("employeeBody");
    tbody.innerHTML = "";

    employees.forEach(emp => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${emp.employeeId || ""}</td>
        <td>${emp.name || ""}</td>
        <td>${emp.email || ""}</td>
        <td>${emp.password ? "******" : ""}</td> <!-- Masked password -->
        <td>${emp.role || ""}</td>
        <td>${emp.department || ""}</td>
        <td>${emp.phone || ""}</td>
        <td>${emp.address || ""}</td>
        <td>${emp.salary || ""}</td>
        <td>${emp.dateJoined ? new Date(emp.dateJoined).toLocaleDateString() : ""}</td>
        <td>${emp.bankName || ""}</td>
        <td>${emp.accountNo || ""}</td>
        <td>${emp.ifscCode || ""}</td>
        <td>${emp.bankBranch || ""}</td>
        <td>${emp.AadharCardNo || ""}</td>
        <td>${emp.PANCardNo || ""}</td>
        <td>${emp.status || ""}</td>
        <td>
          ${emp.extraFields && emp.extraFields.length > 0 
            ? emp.extraFields.map(f => `${f.key}: ${f.value}`).join("<br>")
            : ""}
        </td>
        <td>
          <button class="btn" onclick="editEmployee('${emp._id}')">✏️ Edit</button>
          <button class="btn btn-danger" onclick="deleteEmployee('${emp._id}')">🗑️ Delete</button>
        </td>
      `;

      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
}

function applyFilters() {
  const name = document.getElementById("filterName").value.toLowerCase();
  const email = document.getElementById("filterEmail").value.toLowerCase();
  const phone = document.getElementById("filterPhone").value.toLowerCase();
  const department = document.getElementById("filterDepartment").value.toLowerCase();
  const status = document.getElementById("filterStatus").value;

  const rows = document.querySelectorAll("#employeeTable tbody tr");
  rows.forEach(row => {
    const nameText = row.cells[2].innerText.toLowerCase();
    const emailText = row.cells[2].innerText.toLowerCase();
    const phoneText = row.cells[6].innerText.toLowerCase();
    const deptText = row.cells[5].innerText.toLowerCase();
    const statusText = row.cells[16].innerText;

    const matches =
      (!name || nameText.includes(name)) &&
      (!email || emailText.includes(email)) &&
      (!phone || phoneText.includes(phone)) &&
      (!department || deptText.includes(department)) &&
      (!status || statusText === status);

    row.style.display = matches ? "" : "none";
  });
}

async function deleteEmployee(id) {
  if (!confirm("Are you sure you want to delete this employee?")) return;

  try {
    const res = await fetch(`/api/employees/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      fetchEmployees();
    }
  } catch (error) {
    console.error("Error deleting employee:", error);
  }
}

function editEmployee(id) {
  window.location.href = `add_employee.html?id=${id}`;
}

function addField() {
  const fieldName = prompt("Enter new field name:");
  if (!fieldName) return;

  const tableHeader = document.getElementById("tableHeader");
  const newTh = document.createElement("th");
  newTh.textContent = fieldName;
  tableHeader.insertBefore(newTh, tableHeader.lastElementChild);

  // Add placeholder values for each row
  const rows = document.querySelectorAll("#employeeTable tbody tr");
  rows.forEach(row => {
    const td = document.createElement("td");
    td.textContent = "-";
    row.insertBefore(td, row.lastElementChild);
  });
}

function deleteField() {
  const tableHeader = document.getElementById("tableHeader");
  const ths = tableHeader.querySelectorAll("th");
  if (ths.length <= 18) {
    alert("Cannot delete default fields!");
    return;
  }

  tableHeader.removeChild(ths[ths.length - 2]); // remove last custom field before "Actions"

  const rows = document.querySelectorAll("#employeeTable tbody tr");
  rows.forEach(row => {
    row.removeChild(row.cells[row.cells.length - 2]);
  });
}

window.onload = fetchEmployees;
