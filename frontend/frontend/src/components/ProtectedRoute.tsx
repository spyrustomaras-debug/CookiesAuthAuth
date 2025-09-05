import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../features/auth/hook";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: "ADMIN" | "WORKER"; // optional: restrict by role
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const { loggedIn, user } = useAppSelector((state) => state.auth);

  if (!loggedIn) {
    // user is not logged in
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    // user logged in but role does not match
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
