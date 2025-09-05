// src/pages/NotFoundPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      textAlign: "center",
      gap: "20px"
    }}>
      <h1 style={{ fontSize: "4rem", margin: 0 }}>404</h1>
      <p style={{ fontSize: "1.5rem" }}>Oops! Page not found.</p>
      <button
        onClick={() => navigate("/login")}
        style={{
          padding: "10px 20px",
          fontSize: "1rem",
          cursor: "pointer",
          borderRadius: "5px",
          backgroundColor: "#3498db",
          color: "white",
          border: "none"
        }}
      >
        Go to Login
      </button>
    </div>
  );
};

export default NotFoundPage;
