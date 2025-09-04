import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../features/auth/hook";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(username,password)
    dispatch(login({ username, password }));
  };

  // ✅ Redirect based on role
  useEffect(() => {
    console.log(user)
    if (user) {
      if (user.role === "ADMIN") {
        navigate("/admin-dashboard");
      } else if (user.role === "WORKER") {
        console.log("worker",user.role)
        navigate("/worker-dashboard");
      }
    }
  }, [user, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={loading}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default LoginPage;
