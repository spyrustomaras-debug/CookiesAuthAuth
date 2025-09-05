import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../features/auth/hook";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // 👈 import the CSS file here

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ username: false, password: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    if (user) {
      if (user.role === "ADMIN") {
        navigate("/admin-dashboard");
      } else if (user.role === "WORKER") {
        navigate("/worker-dashboard");
      }
    }
  }, [user, navigate]);

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>

        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, username: true }))}
          />
          {touched.username && !username && (
            <p className="error-text">Username is required</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
          />
          {touched.password && !password && (
            <p className="error-text">Password is required</p>
          )}
        </div>

        <button type="submit" disabled={loading || !username || !password}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
