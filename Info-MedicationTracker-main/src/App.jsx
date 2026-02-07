import { useState, useEffect } from "react";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ForgotPassword from "./Components/ForgotPassword";
import Dashboard from "./Components/Dashboard";
import PatientDashboard from "./Components/PatientDashboard";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import Chatbot from "./Components/Chatbot"; // Restored

export default function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // 🔄 PERSIST LOGIN ON RELOAD
  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");
    const savedRole = sessionStorage.getItem("role");
    const token = sessionStorage.getItem("token");

    if (savedUser && savedRole && token) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      
      if (savedRole === "doctor") setPage("doctor");
      else if (savedRole === "patient") setPage("patient");
      else if (savedRole === "admin") setPage("admin");
    }
    setIsInitialized(true);
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("role", userData.role);
    if (userData.token) sessionStorage.setItem("token", userData.token);

    if (userData.role === "doctor") setPage("doctor");
    else if (userData.role === "patient") setPage("patient");
    else if (userData.role === "admin") setPage("admin");
  };

  const handleLogout = () => {
    setUser(null);
    setPage("login");
    sessionStorage.clear();
  };

  if (!isInitialized) return <div className="loading">Initializing...</div>;

  return (
    <>
      {page === "login" && (
        <Login
          switchToSignup={() => setPage("signup")}
          goToForgotPassword={() => setPage("forgot")}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {page === "signup" && (
        <Signup switchToLogin={() => setPage("login")} />
      )}

      {page === "forgot" && (
        <ForgotPassword backToLogin={() => setPage("login")} />
      )}

      {page === "doctor" && user && (
        <Dashboard user={user} logout={handleLogout} />
      )}

      {page === "patient" && user && (
        <>
          <PatientDashboard user={user} logout={handleLogout} />
          {/* Chatbot only for Patients */}
          <Chatbot />
        </>
      )}

      {page === "admin" && user && (
        <AdminDashboard user={user} logout={handleLogout} />
      )}
    </>
  );
}
