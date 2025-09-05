import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../features/auth/hook";
import {
  fetchWorkerProjects,
  createWorkerProject,
  selectWorkerProjects,
  selectWorkerProjectsLoading,
  updateProjectStatus,
} from "../features/projects/workerProjectSlice";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import "./Form.css";

const WorkerDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const projects = useAppSelector(selectWorkerProjects);
  const loading = useAppSelector(selectWorkerProjectsLoading);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchWorkerProjects());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Project name is required");
      return;
    }
    setError(null);
    try {
      await dispatch(createWorkerProject({ name, description })).unwrap();
      setName("");
      setDescription("");
      alert("Project created successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to create project");
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Worker Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      <main className="dashboard-content">
        {/* Create Project Form */}
        <section className="create-project-section">
          <h2>Create New Project</h2>
          <form onSubmit={handleCreateProject} className="project-form">
            <h3 className="form-title">Create New Project</h3>

            <div className="form-group">
                <label htmlFor="project-name">Project Name</label>
                <input
                id="project-name"
                type="text"
                placeholder="Enter project name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="project-description">Project Description</label>
                <textarea
                id="project-description"
                placeholder="Enter project description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                />
            </div>

            {error && <p className="error-text">{error}</p>}

            <button type="submit" className="submit-btn">Create Project</button>
        </form>

        </section>

        {/* Existing Projects */}
        <section className="worker-projects-section">
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
                   {p.status === "COMPLETED" && (
                    <button
                        className="status-btn completed"
                        onClick={() =>
                        dispatch(updateProjectStatus({ projectId: p.id, status: "IN_PROGRESS" }))
                        }
                    >
                        Mark as In Progress
                    </button>
                    )}

                    {p.status === "IN_PROGRESS" && (
                    <button
                        className="status-btn in-progress"
                        onClick={() =>
                        dispatch(updateProjectStatus({ projectId: p.id, status: "COMPLETED" }))
                        }
                    >
                        Mark as Completed
                    </button>
                    )}

                    {p.status === "PENDING" && (
                    <button
                        className="status-btn pending"
                        onClick={() =>
                        dispatch(updateProjectStatus({ projectId: p.id, status: "IN_PROGRESS" }))
                        }
                    >
                        Start Project
                    </button>
                    )}
                </div>
              ))}
            </div>
          ) : (
            <p>No projects assigned yet.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default WorkerDashboard;
