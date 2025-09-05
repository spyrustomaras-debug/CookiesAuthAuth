// src/components/Loader.tsx
import React from "react";

const Loader: React.FC = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      backgroundColor: "#f9f9f9", // optional light background
      flexDirection: "column",
      gap: "10px"
    }}>
      <div
        style={{
          border: "6px solid #f3f3f3",
          borderTop: "6px solid #3498db",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          animation: "spin 1s linear infinite"
        }}
      />
      <span>Loading...</span>

      {/* Spinner animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
