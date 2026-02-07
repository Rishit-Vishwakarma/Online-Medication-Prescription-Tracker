import { useEffect, useState } from "react";
import "./Reports.css";

/*
  ADMIN – REPORTS & ANALYTICS
  --------------------------
  • Platform growth
  • Doctor performance
  • Revenue analytics
  • Backend-ready
*/

export default function Reports() {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState(null);

  useEffect(() => {
    // 🔐 BACKEND READY
    // GET /api/admin/reports

    setReports({
      totalDoctors: 124,
      totalPatients: 2340,
      monthlyAppointments: 980,
      revenueThisMonth: 540000,

      topDoctors: [
        { name: "Dr. Amit Sharma", patients: 220 },
        { name: "Dr. Neha Verma", patients: 190 },
        { name: "Dr. Raj Malhotra", patients: 165 }
      ],

      monthlyGrowth: [
        { month: "Jan", value: 120 },
        { month: "Feb", value: 180 },
        { month: "Mar", value: 260 }
      ]
    });

    setLoading(false);
  }, []);

  if (loading) {
    return <p className="loading">Loading reports...</p>;
  }

  return (
    <div className="admin-reports">

      {/* ===== HEADER ===== */}
      <div className="reports-header">
        <h2>System Reports & Analytics</h2>
        <p>Overall platform performance for administrators</p>
      </div>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="summary-grid">
        <div className="summary-card">
          <h3>{reports.totalDoctors}</h3>
          <span>Total Doctors</span>
        </div>

        <div className="summary-card">
          <h3>{reports.totalPatients}</h3>
          <span>Total Patients</span>
        </div>

        <div className="summary-card">
          <h3>{reports.monthlyAppointments}</h3>
          <span>Appointments (This Month)</span>
        </div>

        <div className="summary-card highlight">
          <h3>₹ {reports.revenueThisMonth}</h3>
          <span>Revenue (This Month)</span>
        </div>
      </div>

      {/* ===== TOP DOCTORS ===== */}
      <div className="report-section">
        <h4>Top Performing Doctors</h4>

        <table>
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Total Patients</th>
            </tr>
          </thead>
          <tbody>
            {reports.topDoctors.map((doc, i) => (
              <tr key={i}>
                <td>{doc.name}</td>
                <td>{doc.patients}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== MONTHLY GROWTH ===== */}
      <div className="report-section">
        <h4>Monthly Platform Growth</h4>

        <div className="growth-list">
          {reports.monthlyGrowth.map((g, i) => (
            <div key={i} className="growth-item">
              <span>{g.month}</span>
              <div className="bar">
                <div
                  className="fill"
                  style={{ width: `${g.value / 3}%` }}
                />
              </div>
              <span>{g.value}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
