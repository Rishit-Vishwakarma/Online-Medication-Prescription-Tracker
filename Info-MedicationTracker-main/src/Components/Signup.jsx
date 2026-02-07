import { useState } from "react";
import api from "../api";
import "./Signup.css";

export default function Signup({ switchToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    let signupUrl = "/register";
    if (role === "doctor") signupUrl = "/doctor/register";
    if (role === "admin") signupUrl = "/admin/register";

    try {
      // Create JSON payload
      const payload = {
        email: email,
        password: password
      };

      // Handle parameter name difference
      if (role === "doctor") {
          payload.userName = username;
      } else {
          payload.username = username;
      }

      console.log(`Registering as ${role} to ${signupUrl}`, payload);

      await api.post(signupUrl, payload);
      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => switchToLogin(), 2000);

    } catch (err) {
      console.error("Signup Error:", err);
      const msg = err.response?.data?.message || err.response?.data?.error || "Registration Failed. Please try again.";
      setError(typeof msg === 'object' ? JSON.stringify(msg) : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        {/* Left Side - Brand */}
        <div className="signup-brand-side">
          <div className="brand-logo"></div>
          <h1 className="brand-title">Join MediCose</h1>
          <p className="brand-subtitle">Start your journey to better health management today.</p>
        </div>

        {/* Right Side - Form */}
        <div className="signup-form-side">
          <div className="form-header">
            <h2>Create Account</h2>
            <p>Fill in your details to get started.</p>
          </div>

          {error && (
            <div className="error-msg">
              <span>⚠️</span> {error}
            </div>
          )}
          
          {success && (
            <div className="success-msg">
              <span>✅</span> {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  placeholder="Choose a username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                />
              </div>
            </div>

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
                  placeholder="Create a strong password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="input-group">
              <label>Register as...</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="switch-text">
            Already have an account? <span onClick={switchToLogin}>Sign In</span>
          </p>
        </div>
      </div>
    </div>
  );
}
