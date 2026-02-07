import { useState } from "react";
import api from "../api";
import "./Login.css";

export default function Login({ switchToSignup, goToForgotPassword, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Create JSON payload
      const payload = {
        email: email,
        password: password
      };

      // Try User Login first
      let response;
      let role = "patient";
      
      try {
        response = await api.post("/login", payload);
      } catch (err) {
        // If User login fails, try Doctor login
        try {
          response = await api.post("/doctor/login", payload);
          role = "doctor";
        } catch (err2) {
          // If Doctor login fails, try Admin login
          response = await api.post("/admin/login", payload);
          role = "admin";
        }
      }
      
      let token = "";
      const responseData = response.data;
      if (typeof responseData === 'string' && responseData.includes("Token:")) {
          token = responseData.split("Token:")[1].trim();
      } else {
          token = responseData; 
      }

      if (token) {
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('role', role);
          onLoginSuccess({ email, role, token });
      } else {
          setError("Login failed: No token received");
      }

    } catch (err) {
      console.error(err);
      setError("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-brand-side">
          <h1 className="brand-title">MediCose</h1>
          <p className="brand-subtitle">Your Trusted Healthcare Companion</p>
        </div>

        <div className="login-form-side">
          <div className="form-header">
            <h2>Welcome Back</h2>
            <p>Please enter your details to sign in.</p>
          </div>

          {error && (
            <div className="error-msg">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <input 
                  type="password" 
                  placeholder="Enter your password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="forgot-pass">
              <span onClick={goToForgotPassword}>Forgot Password?</span>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="switch-text">
            Don't have an account? <span onClick={switchToSignup}>Create Account</span>
          </p>
        </div>
      </div>
    </div>
  );
}
