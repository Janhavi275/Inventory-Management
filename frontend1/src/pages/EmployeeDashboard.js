// frontend/src/pages/EmployeeDashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../api";

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const stored = localStorage.getItem("user") || sessionStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;

  const logout = () => {
    localStorage.removeItem("token"); localStorage.removeItem("user");
    sessionStorage.removeItem("token"); sessionStorage.removeItem("user");
    setAuthToken(null);
    navigate("/");
  };

  return (
    <div className="center-page">
      <div className="card">
        <h1>Employee Dashboard</h1>
        <p>Welcome, {user?.username}</p>
        <button className="btn" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
