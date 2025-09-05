import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../features/auth/hook";
import { fetchWorkerProjects, selectWorkerProjects, selectWorkerProjectsLoading } from "../features/projects/workerProjectSlice";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const WorkerDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const projects = useAppSelector(selectWorkerProjects);
  console.log("projects",projects)
  const loading = useAppSelector(selectWorkerProjectsLoading);

  useEffect(() => {
    dispatch(fetchWorkerProjects());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Worker Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      <main className="dashboard-content">
        <h2>Your Projects</h2>
        {loading ? (
  <p>Loading projects...</p>
        ) : projects.length > 0 ? (
        <ul>
            {projects.map((p) => (
            <li key={p.worker.id}>{p.worker.username} - {p.worker.email}</li>
            ))}
        </ul>
        ) : (
        <p>No projects assigned yet.</p>
        )}
      </main>
    </div>
  );
};

export default WorkerDashboard;


