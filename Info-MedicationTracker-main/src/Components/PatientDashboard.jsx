import { useState, useEffect } from "react";
import api from "../api";
import "./PatientDashboard.css";

// patient pages
import BookAppointment from "./Patient/BookAppointment";
import MyAppointments from "./Patient/MyAppointments";
import Prescriptions from "./Patient/Prescriptions";
import Medication from "./Patient/Medication";
import YourDoctor from "./Patient/YourDoctor";
import MyProfile from "./Patient/MyProfile";

export default function PatientDashboard({ user, logout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");
  const [isProfileComplete, setIsProfileComplete] = useState(true);
  const [photo, setPhoto] = useState(
    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
  );

  useEffect(() => {
    checkProfile();
  }, []);

  const checkProfile = async () => {
    try {
      const res = await api.get("/user/profile");
      if (!res.data.age || !res.data.gender) setIsProfileComplete(false);
      else setIsProfileComplete(true);
    } catch (err) {
      // 404 is expected for new users, so we just set profile as incomplete
      setIsProfileComplete(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  const renderPage = () => {
    switch (activePage) {
      case "book": return <BookAppointment />;
      case "appointments": return <MyAppointments />;
      case "prescriptions": return <Prescriptions />;
      case "medication": return <Medication />;
      case "doctor": return <YourDoctor />;
      case "profile": return <MyProfile user={user} />;
      default:
        return (
          <section className="dashboard-grid">
            <div className="card" onClick={() => setActivePage("book")}>
              <span className="icon">📅</span><p>Book Appointment</p>
            </div>
            <div className="card" onClick={() => setActivePage("appointments")}>
              <span className="icon">⏱</span><p>My Appointments</p>
            </div>
            <div className="card" onClick={() => setActivePage("prescriptions")}>
              <span className="icon">🧾</span><p>Prescriptions</p>
            </div>
            <div className="card" onClick={() => setActivePage("medication")}>
              <span className="icon">💊</span><p>Medication</p>
            </div>
            <div className="card" onClick={() => setActivePage("doctor")}>
              <span className="icon">👨‍⚕️</span><p>Your Doctor</p>
            </div>
            <div className="card" onClick={() => setActivePage("profile")}>
              <span className="icon">👤</span><p>My Profile</p>
            </div>
          </section>
        );
    }
  };

  return (
    <div className={`layout ${sidebarOpen ? "" : "sidebar-closed"}`}>
      <aside className={`sidebar ${sidebarOpen ? "" : "collapsed"}`}>
        <h2 className="brand">MedicationTrack</h2>

        <div className="profile-box">
          <img src={photo} alt="Profile" />
          <label className="upload-btn">
            Change Photo
            <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
          </label>
        </div>

        <ul className="menu">
          <li className={activePage === "dashboard" ? "active" : ""} onClick={() => setActivePage("dashboard")}>🏠 Dashboard</li>
          <li className={`${activePage === "profile" ? "active" : ""} ${!isProfileComplete ? "blink-profile" : ""}`} 
              onClick={() => setActivePage("profile")}>👤 My Profile</li>
          <li className={activePage === "book" ? "active" : ""} onClick={() => setActivePage("book")}>📅 Book Appointment</li>
          <li className={activePage === "appointments" ? "active" : ""} onClick={() => setActivePage("appointments")}>⏱ My Appointments</li>
          <li className={activePage === "prescriptions" ? "active" : ""} onClick={() => setActivePage("prescriptions")}>🧾 Prescriptions</li>
          <li className={activePage === "medication" ? "active" : ""} onClick={() => setActivePage("medication")}>💊 Medication</li>
          <li className={activePage === "doctor" ? "active" : ""} onClick={() => setActivePage("doctor")}>👨‍⚕️ Your Doctor</li>
          <li className="logout" onClick={logout}>🚪 Logout</li>
        </ul>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="header-left">
            <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
            <h1>{activePage.charAt(0).toUpperCase() + activePage.slice(1)}</h1>
          </div>
          <div className="account">
            <span>{user?.username || user?.email}</span>
            <img src={photo} alt="Account" />
          </div>
        </header>

        <div className="page-content">
            {renderPage()}
        </div>
      </main>
    </div>
  );
}
