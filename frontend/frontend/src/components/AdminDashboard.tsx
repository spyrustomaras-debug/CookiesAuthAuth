import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../features/auth/hook";
import { fetchWorkersProjects, selectWorkersProjects, selectProjectsLoading } from "../features/projects/projectSlice";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const workersProjects = useAppSelector(selectWorkersProjects);
  const loading = useAppSelector(selectProjectsLoading);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchWorkersProjects());
  }, [dispatch]);

  const handleLogout = () => {
      dispatch(logout());
      navigate("/login");
  };

  return (
    <div>
      <header className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>
      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <div>
          {workersProjects.map(({ worker, projects }) => (
            <div key={worker.id}>
              <h2>{worker.username}</h2>
              {projects.length > 0 ? (
                <ul>
                  {projects.map((project) => (
                    <li key={project.id}>
                      {project.name} - {project.status}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No projects</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
