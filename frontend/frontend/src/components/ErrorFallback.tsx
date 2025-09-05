import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorFallback: React.FC = () => {

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f9fafb",
        color: "#1f2937",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Something went wrong</h1>
      <p style={{ marginBottom: "2rem", color: "#6b7280" }}>
        An unexpected error has occurred. Please try again.
      </p>
      <button
        onClick={() => (window.location.href = "/login")}
        style={{
          padding: "10px 20px",
          fontSize: "1rem",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Go Back to Login
      </button>
    </div>
  );
};

export default ErrorFallback;
