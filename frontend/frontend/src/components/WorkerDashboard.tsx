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

  // Pagination state
const [currentPage, setCurrentPage] = useState(1);
const projectsPerPage = 3; // show only 3 projects

// Pagination calculations
const indexOfLastProject = currentPage * projectsPerPage;
const indexOfFirstProject = indexOfLastProject - projectsPerPage;
const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
const totalPages = Math.ceil(projects.length / projectsPerPage);

// Calculate range of page numbers to show (max 3 at a time)
const getPageNumbers = () => {
  let start = Math.max(currentPage - 1, 1);
  let end = Math.min(start + 2, totalPages);

  if (end - start < 2) start = Math.max(end - 2, 1);

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
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

        {/* Existing Projects with Pagination */}
        <section className="worker-projects-section">
          <h2>Your Projects</h2>
          {loading ? (
            <p>Loading projects...</p>
          ) : currentProjects.length > 0 ? (
            <>
              <div className="projects-grid">
                {currentProjects.map((p) => (
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

              {/* Pagination Controls */}
              <div className="pagination">
                <button
                  className="page-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Prev
                </button>

                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    className={`page-btn ${page === currentPage ? "active" : ""}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  className="page-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p>No projects assigned yet.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default WorkerDashboard;
