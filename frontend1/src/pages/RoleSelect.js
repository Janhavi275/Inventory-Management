import React from "react";
import { useNavigate } from "react-router-dom";

const RoleSelect = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Select Role</h2>
      <button
        style={{ margin: "20px", padding: "10px 20px" }}
        onClick={() => navigate("/admin-login")}
      >
        Admin
      </button>
      <button
        style={{ margin: "20px", padding: "10px 20px" }}
        onClick={() => navigate("/employee-login")}
      >
        Employee
      </button>
    </div>
  );
};

export default RoleSelect;
