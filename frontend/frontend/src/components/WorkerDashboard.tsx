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
          <div className="projects-grid">
            {projects.map((p) => (
              <div key={p.id} className="project-card">
                <h3 className="project-title">{p.name}</h3>
                <p className="project-worker">
                  <strong>Worker:</strong> {p.worker.username} ({p.worker.email})
                </p>
                <p className="project-description">
                  <strong>Description:</strong> {p.description}
                </p>
                <p className={`project-status ${p.status.toLowerCase()}`}>
                  <strong>Status:</strong> {p.status}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No projects assigned yet.</p>
        )}
      </main>
    </div>
  );
};

export default WorkerDashboard;
