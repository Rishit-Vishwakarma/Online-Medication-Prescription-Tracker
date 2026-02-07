import { useState, useEffect } from "react";
import api from "../../api";
import "./MyAppointments.css";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get("/appointments/my-patient");
      // Safety check: Ensure response.data is an array
      if (Array.isArray(response.data)) {
        setAppointments(response.data);
      } else {
        setAppointments([]);
      }
    } catch (err) {
      console.error("Failed to fetch appointments", err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="patient-page">
      <h2>My Appointments</h2>
      <p className="subtitle">Track your upcoming and past appointments</p>

      <div className="table-card">
        {loading ? <p>Loading...</p> : (
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {(!appointments || appointments.length === 0) ? (
                <tr><td colSpan="5" style={{ textAlign: 'center' }}>No appointments found.</td></tr>
              ) : (
                appointments.map((apt) => (
                  <tr key={apt.id}>
                    <td>
                      <div className="doctor-cell">
                        <span>Dr. {apt.doctor?.userName || "Assigned Doctor"}</span>
                      </div>
                    </td>
                    <td>{apt.appointmentDate}</td>
                    <td>{apt.appointmentTime}</td>
                    <td>{apt.reason}</td>
                    <td>
                      <span className={`status ${apt.status?.toLowerCase() || 'pending'}`}>
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
