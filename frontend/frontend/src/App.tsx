import React, { Suspense, useEffect } from "react";
import { useAppDispatch } from "./features/auth/hook";
import { restoreLogin } from "./features/auth/authSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import * as Sentry from "@sentry/react";
import ErrorFallback from "./components/ErrorFallback";
import useIdleLogout from "./hooks/useIdleLogout";
import useNotifications from "../src/hooks/useNotification";
import Notifications from "./components/Notifications";
import Loader from "./components/Loader";
import NotFoundPage from "./pages/NotFoundPage";


const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const CrashTest = React.lazy(() => import("./pages/CrashTest"));
const WorkerDashboard = React.lazy(() => import("./components/WorkerDashboard"));
const AdminDashboard = React.lazy(() => import("./components/AdminDashboard"));


const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useIdleLogout(); // enable auto-logout
  useNotifications();
  useEffect(() => {
    dispatch(restoreLogin()); // restore login on page load
  }, [dispatch]);

  return (
    
    <Sentry.ErrorBoundary fallback={<ErrorFallback />}>

      <Router>
        <Suspense fallback={<Loader/>}>
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
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Router>
    </Sentry.ErrorBoundary>
  );
};

export default App;
