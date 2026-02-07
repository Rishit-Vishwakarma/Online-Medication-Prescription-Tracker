import { useState, useEffect } from "react";
import api from "../../api";
import "./Prescriptions.css";

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await api.get("/prescriptions/my");
      if (Array.isArray(response.data)) {
        setPrescriptions(response.data);
      } else {
        setPrescriptions([]);
      }
    } catch (err) {
      console.error("Failed to fetch prescriptions", err);
      setPrescriptions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="patient-page">
      <h2>My Prescriptions</h2>
      <p className="subtitle">Digital prescriptions issued by your doctor</p>

      {loading ? <p>Loading...</p> : (
        <div className="prescription-list">
          {(!prescriptions || prescriptions.length === 0) ? (
            <p style={{ textAlign: 'center', marginTop: '2rem' }}>No prescriptions found.</p>
          ) : (
            prescriptions.map((rx) => (
              <div key={rx.id} className="prescription-card" style={{ marginBottom: '2rem' }}>
                <div className="rx-header">
                  <div>
                    <h3>Dr. {rx.doctor?.userName || "Assigned Doctor"}</h3>
                    <span>Diagnosis: <strong>{rx.diagnoses}</strong></span>
                  </div>
                  <div className="rx-verified">✔ Verified</div>
                </div>

                <div className="rx-info">
                  <p><b>Next Appointment:</b> {rx.nextAppointmentDate || "Not scheduled"}</p>
                  <p><b>Prescription ID:</b> RX-{rx.id}</p>
                </div>

                <div className="medicine-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Medicine Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rx.medicines && rx.medicines.map((med, i) => (
                        <tr key={i}>
                          <td>{med}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="rx-note">
                  <b>Doctor Notes:</b>
                  <p>{rx.note || "No additional notes provided."}</p>
                </div>

                <div className="rx-actions">
                  <button className="download-btn" onClick={() => window.print()}>📄 Print Prescription</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
