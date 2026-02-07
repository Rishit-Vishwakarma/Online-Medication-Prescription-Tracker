import { useState, useEffect } from "react";
import api from "../../api";
import "./AssignDoctor.css";

export default function AssignDoctor() {
  const [assignData, setAssignData] = useState({ userId: "", doctorId: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const [usersRes, doctorsRes] = await Promise.all([
        api.get("/admin/all-users"),
        api.get("/admin/all-doctors")
      ]);
      setUsers(usersRes.data);
      setDoctors(doctorsRes.data);
    } catch (err) {
      console.error("Failed to fetch lists", err);
    }
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      // Send JSON payload
      const payload = {
        userId: Number(assignData.userId),
        doctorId: Number(assignData.doctorId)
      };

      const response = await api.post("/admin/assignDoctorToUser", payload);
      setMessage("✅ Success: " + (response.data || "Doctor Assigned Successfully!"));
      setAssignData({ userId: "", doctorId: "" });
      fetchLists();
    } catch (err) {
      setMessage("❌ Error: " + (err.response?.data?.message || "Failed to Assign Doctor"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assign-container">
      <div className="assign-card">
        <div className="card-header">
          <h2>Assign Doctor</h2>
          <p>Link a patient to their primary healthcare provider</p>
        </div>
        
        <form onSubmit={handleAssign} className="assign-form">
          <div className="form-group">
            <label>Select Patient</label>
            <div className="select-wrapper">
              <select 
                value={assignData.userId} 
                onChange={(e) => setAssignData({...assignData, userId: e.target.value})} 
                required
              >
                <option value="">-- Choose Patient --</option>
                {users.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.username} ({u.email}) {u.doctorName ? `✓ Assigned` : ""}
                  </option>
                ))}
              </select>
              <span className="select-arrow">▼</span>
            </div>
          </div>

          <div className="form-group">
            <label>Select Doctor</label>
            <div className="select-wrapper">
              <select 
                value={assignData.doctorId} 
                onChange={(e) => setAssignData({...assignData, doctorId: e.target.value})} 
                required
              >
                <option value="">-- Choose Doctor --</option>
                {doctors.map(d => (
                  <option key={d.doctorId} value={d.doctorId}>
                    Dr. {d.userName} ({d.email})
                  </option>
                ))}
              </select>
              <span className="select-arrow">▼</span>
            </div>
          </div>

          <button type="submit" className="assign-btn" disabled={loading}>
            {loading ? "Processing..." : "Confirm Assignment"}
          </button>
        </form>
        
        {message && (
          <div className={`status-message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
