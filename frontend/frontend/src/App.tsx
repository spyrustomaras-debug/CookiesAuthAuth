import React, { useEffect } from "react";
import { useAppDispatch } from "./features/auth/hook";
import { restoreLogin } from "./features/auth/authSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CrashTest from "./pages/CrashTest";
import WorkerDashboard from "./components/WorkerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import * as Sentry from "@sentry/react";
import ErrorFallback from "./components/ErrorFallback";
import useIdleLogout from "./hooks/useIdleLogout";


const App: React.FC = () => {
  const dispatch = useAppDispatch();
    useIdleLogout(); // enable auto-logout

  useEffect(() => {
    dispatch(restoreLogin()); // restore login on page load
  }, [dispatch]);

  return (
    <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
      <Router>
        <Routes>
          <Route path="/crash" element={<CrashTest />} />

          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/worker-dashboard"
            element={
              <ProtectedRoute role="WORKER">
                <WorkerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Router>
    </Sentry.ErrorBoundary>
  );
};

export default App;
