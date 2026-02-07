import { useState } from "react";
import "./AdminDashboard.css";

import AdminHome from "./Admin/AdminDashboard";
import ManageDoctors from "./Admin/ManageDoctors";
import ManagePatients from "./Admin/ManagePatients";
import Appointments from "./Admin/Appointments";
import Payments from "./Admin/Payments";
import Reports from "./Admin/Reports";
import Settings from "./Admin/Settings";

export default function AdminPanel({ admin, logout }) {
  const [active, setActive] = useState("dashboard");

  const renderPage = () => {
    switch (active) {
      case "doctors": return <ManageDoctors />;
      case "patients": return <ManagePatients />;
      case "appointments": return <Appointments />;
      case "payments": return <Payments />;
      case "reports": return <Reports />;
      case "settings": return <Settings />;
      default: return <AdminHome />;
    }
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => setActive("dashboard")}>Dashboard</li>
          <li onClick={() => setActive("doctors")}>Doctors</li>
          <li onClick={() => setActive("patients")}>Patients</li>
          <li onClick={() => setActive("appointments")}>Appointments</li>
          <li onClick={() => setActive("payments")}>Payments</li>
          <li onClick={() => setActive("reports")}>Reports</li>
          <li onClick={() => setActive("settings")}>Settings</li>
          <li className="logout" onClick={logout}>Logout</li>
        </ul>
      </aside>

      <main className="main">
        {renderPage()}
      </main>
    </div>
  );
}
