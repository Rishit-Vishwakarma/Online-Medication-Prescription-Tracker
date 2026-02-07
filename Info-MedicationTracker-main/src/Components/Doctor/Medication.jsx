import { useEffect, useState } from "react";
import "./Medication.css";

export default function Medication({ user }) {
  const [medications, setMedications] = useState([]);
  const [search, setSearch] = useState("");

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    if (!user?.id) return;

    // 🔐 FUTURE BACKEND CALL
    // fetch(`/api/medications?doctorId=${user.id}`, {
    //   headers: { Authorization: `Bearer ${user.token}` }
    // })

    // 🧪 TEMP MOCK DATA
    setMedications([
      {
        id: 1,
        patient: "Rohit Sharma",
        medicine: "Atorvastatin",
        dosage: "10 mg",
        frequency: "Once Daily",
        duration: "30 Days",
        status: "Active",
      },
      {
        id: 2,
        patient: "Anita Verma",
        medicine: "Aspirin",
        dosage: "75 mg",
        frequency: "Once Daily",
        duration: "15 Days",
        status: "Completed",
      },
      {
        id: 3,
        patient: "Amit Kumar",
        medicine: "Metoprolol",
        dosage: "25 mg",
        frequency: "Twice Daily",
        duration: "60 Days",
        status: "Active",
      },
      {
        id: 4,
        patient: "Neha Singh",
        medicine: "Clopidogrel",
        dosage: "75 mg",
        frequency: "Once Daily",
        duration: "30 Days",
        status: "Completed",
      },
    ]);
  }, [user]);

  /* ================= FILTER ================= */
  const filtered = medications.filter(
    (m) =>
      m.patient.toLowerCase().includes(search.toLowerCase()) ||
      m.medicine.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="medication-page">

      {/* HEADER */}
      <div className="page-header">
        <h2>Medication Management</h2>
        <p>Doctor: <strong>{user?.name || "Doctor"}</strong></p>
      </div>

      {/* SEARCH & ACTION */}
      <div className="medication-actions">
        <input
          type="text"
          placeholder="Search by patient or medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button>Add Prescription</button>
      </div>

      {/* TABLE */}
      <div className="medication-table">
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Medicine</th>
              <th>Dosage</th>
              <th>Frequency</th>
              <th>Duration</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty">
                  No medication records found
                </td>
              </tr>
            ) : (
              filtered.map((m) => (
                <tr key={m.id}>
                  <td>{m.patient}</td>
                  <td>{m.medicine}</td>
                  <td>{m.dosage}</td>
                  <td>{m.frequency}</td>
                  <td>{m.duration}</td>
                  <td>
                    <span className={`status ${m.status.toLowerCase()}`}>
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* FOOT NOTE */}
      <p className="note">
        ⚠️ Medications shown are linked to your doctor profile. Data will auto-sync once backend API is connected.
      </p>

    </div>
  );
}
