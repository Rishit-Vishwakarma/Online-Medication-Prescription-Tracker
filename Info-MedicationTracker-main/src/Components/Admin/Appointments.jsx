import { useEffect, useState } from "react";
import "./Appointments.css";

/*
  ADMIN – APPOINTMENTS MANAGEMENT
  -------------------------------
  • View all appointments (doctor + patient)
  • Filter by status
  • Search
  • Backend-ready
*/

export default function Appointments() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const [appointments, setAppointments] = useState([]);

  /* ===== FETCH ALL APPOINTMENTS (ADMIN) ===== */
  useEffect(() => {
    // 🔐 BACKEND READY
    // GET /api/admin/appointments

    setAppointments([
      {
        id: "APT1001",
        doctor: "Dr. Amit Sharma",
        patient: "Rohit Sharma",
        department: "Cardiology",
        date: "2026-02-10",
        time: "10:30 AM",
        status: "Completed"
      },
      {
        id: "APT1002",
        doctor: "Dr. Neha Verma",
        patient: "Anita Verma",
        department: "Dermatology",
        date: "2026-02-11",
        time: "12:00 PM",
        status: "Pending"
      },
      {
        id: "APT1003",
        doctor: "Dr. Raj Malhotra",
        patient: "Suresh Kumar",
        department: "Orthopedics",
        date: "2026-02-12",
        time: "03:00 PM",
        status: "Cancelled"
      }
    ]);

    setLoading(false);
  }, []);

  /* ===== FILTER LOGIC ===== */
  const filteredAppointments = appointments.filter((a) => {
    const matchSearch =
      a.doctor.toLowerCase().includes(search.toLowerCase()) ||
      a.patient.toLowerCase().includes(search.toLowerCase()) ||
      a.department.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      status === "all" || a.status.toLowerCase() === status;

    return matchSearch && matchStatus;
  });

  if (loading) {
    return <p className="loading">Loading appointments...</p>;
  }

  return (
    <div className="admin-appointments">

      {/* ===== HEADER ===== */}
      <div className="page-header">
        <h2>All Appointments</h2>
        <p>Admin overview of doctor–patient appointments</p>
      </div>

      {/* ===== CONTROLS ===== */}
      <div className="controls">
        <input
          placeholder="Search doctor, patient, department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* ===== TABLE ===== */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Doctor</th>
              <th>Patient</th>
              <th>Department</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredAppointments.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.doctor}</td>
                <td>{a.patient}</td>
                <td>{a.department}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td>
                  <span className={`status ${a.status.toLowerCase()}`}>
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAppointments.length === 0 && (
          <p className="no-data">No appointments found</p>
        )}
      </div>
    </div>
  );
}
