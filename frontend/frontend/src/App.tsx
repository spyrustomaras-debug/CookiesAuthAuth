import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import WorkerDashboard from "./components/WorkerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/worker-dashboard"
          element={
              <WorkerDashboard />
          }
        />

        <Route
          path="/admin-dashboard"
          element={
              <AdminDashboard />
          }
        />

        {/* Default route: redirect to login */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
