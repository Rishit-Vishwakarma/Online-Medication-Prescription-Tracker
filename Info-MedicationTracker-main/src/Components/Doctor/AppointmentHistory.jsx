import { useEffect, useState } from "react";
import api from "../../api";
import "./AppointmentHistory.css";

export default function AppointmentHistory() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get("/appointments/my-doctor");
      if (Array.isArray(response.data)) {
        setAppointments(response.data);
      } else {
        setAppointments([]);
      }
    } catch (err) {
      console.error("Failed to fetch doctor appointments", err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      // Send JSON payload
      await api.put(`/appointments/${id}/status`, { status: newStatus });
      fetchAppointments();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="appointment-analytics">
      <div className="page-header">
        <h2>Patient Appointments</h2>
        <p>Manage your upcoming consultations</p>
      </div>

      <div className="table-section">
        {loading ? <p>Loading...</p> : (
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(!appointments || appointments.length === 0) ? (
                <tr><td colSpan="6" style={{ textAlign: 'center' }}>No appointments booked yet.</td></tr>
              ) : (
                appointments.map((a) => (
                  <tr key={a.id}>
                    <td>{a.user?.username || "Unknown Patient"}</td>
                    <td>{a.appointmentDate}</td>
                    <td>{a.appointmentTime}</td>
                    <td>{a.reason}</td>
                    <td>
                      <span className={`status ${a.status?.toLowerCase() || 'pending'}`}>
                        {a.status}
                      </span>
                    </td>
                    <td>
                      {a.status === "PENDING" && (
                        <>
                          <button onClick={() => updateStatus(a.id, "CONFIRMED")} className="view-btn">Confirm</button>
                          <button onClick={() => updateStatus(a.id, "CANCELLED")} className="cancel-btn">Cancel</button>
                        </>
                      )}
                      {a.status === "CONFIRMED" && (
                        <button onClick={() => updateStatus(a.id, "COMPLETED")} className="view-btn">Mark Done</button>
                      )}
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
