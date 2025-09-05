import React from "react";
import { useAppDispatch } from "../features/auth/hook";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // 👈 optional CSS file

const WorkerDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // redirect to login page after logout
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">Worker Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* Main content */}
      <main className="dashboard-content">
        <p>Welcome, Worker! 🎉</p>
      </main>
    </div>
  );
};

export default WorkerDashboard;
