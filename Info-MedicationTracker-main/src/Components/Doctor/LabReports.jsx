import { useEffect, useState } from "react";
import "./LabReports.css";

/*
  LAB REPORTS – DOCTOR SIDE
  ------------------------
  • Doctor sees lab reports of patients
  • Appointment / patient linked
  • Backend-ready structure
*/

export default function LabReports({ user }) {
  const [loading, setLoading] = useState(true);
  const [doctor, setDoctor] = useState(null);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // 🔹 Prototype / dummy data
    // Later replace with API:
    // GET /api/lab-reports?doctorId=user.id

    setDoctor({
      id: user?.id || "DOC101",
      name: user?.name || "Dr. Govind Kumar",
      department: "Cardiology"
    });

    setReports([
      {
        id: "LR101",
        patientName: "Rohit Sharma",
        testName: "ECG",
        result: "Normal",
        date: "2026-01-20",
        status: "Completed"
      },
      {
        id: "LR102",
        patientName: "Anita Verma",
        testName: "Lipid Profile",
        result: "High Cholesterol",
        date: "2026-01-22",
        status: "Completed"
      },
      {
        id: "LR103",
        patientName: "Amit Kumar",
        testName: "Blood Sugar (Fasting)",
        result: "Pending",
        date: "2026-01-24",
        status: "Pending"
      }
    ]);

    setLoading(false);
  }, [user]);

  if (loading) {
    return <p className="loading">Loading lab reports...</p>;
  }

  return (
    <div className="lab-reports-page">

      {/* ===== HEADER ===== */}
      <div className="lab-header">
        <div>
          <h2>Lab Reports</h2>
          <p>
            Doctor: <b>{doctor.name}</b> <br />
            Department: {doctor.department}
          </p>
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="lab-table-wrapper">
        <table className="lab-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Test</th>
              <th>Result</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((r) => (
              <tr key={r.id}>
                <td>{r.patientName}</td>
                <td>{r.testName}</td>
                <td>{r.result}</td>
                <td>{r.date}</td>
                <td>
                  <span className={`status ${r.status.toLowerCase()}`}>
                    {r.status}
                  </span>
                </td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() =>
                      alert(`Open full report for ${r.patientName}`)
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
