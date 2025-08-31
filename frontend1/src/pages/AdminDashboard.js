// frontend/src/pages/AdminDashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import API, { setAuthToken } from "../api";

export default function AdminDashboard() {
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
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user?.username}</p>
        <button className="btn" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

