import React, { Suspense, useEffect } from "react";
import { useAppDispatch } from "./features/auth/hook";
import { restoreLogin } from "./features/auth/authSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import * as Sentry from "@sentry/react";
import ErrorFallback from "./components/ErrorFallback";
import useIdleLogout from "./hooks/useIdleLogout";

const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const CrashTest = React.lazy(() => import("./pages/CrashTest"));
const WorkerDashboard = React.lazy(() => import("./components/WorkerDashboard"));
const AdminDashboard = React.lazy(() => import("./components/AdminDashboard"));


const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useIdleLogout(); // enable auto-logout

  useEffect(() => {
    dispatch(restoreLogin()); // restore login on page load
  }, [dispatch]);

  return (
    <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>

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
        </Suspense>
      </Router>
    </Sentry.ErrorBoundary>
  );
};

export default App;
