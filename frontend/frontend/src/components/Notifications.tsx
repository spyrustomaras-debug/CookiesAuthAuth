import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Notifications: React.FC = () => {
  const notifications = useSelector((state: RootState) => state.notification.notifications);

  return (
    <div style={{ position: "fixed", top: 10, right: 10, zIndex: 9999 }}>
      {notifications.map(n => (
        <div
          key={n.id}
          style={{
            marginBottom: "8px",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor:
              n.type === "info" ? "lightblue" :
              n.type === "warning" ? "orange" :
              "red",
            color: "white",
          }}
        >
          {n.message}
        </div>
      ))}
    </div>
  );
};

export default Notifications;
