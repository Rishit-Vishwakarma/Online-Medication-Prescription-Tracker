import { useEffect, useState } from "react";
import "./MakeAppointment.css";

export default function MakeAppointment({ user }) {
  /* ================= STATES ================= */
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [form, setForm] = useState({
    patient: "",
    patientId: "",
    date: "",
    time: "",
    type: "Consultation",
    priority: "Normal",
    notes: ""
  });

  const [existingSlots, setExistingSlots] = useState([]);

  /* ================= MOCK API ================= */

  // 🔹 fetch patients list (doctor specific)
  useEffect(() => {
    // future: fetch(`/api/patients?doctorId=${user.id}`)
    setPatients([
      { id: "P101", name: "Rohit Sharma" },
      { id: "P102", name: "Anita Verma" },
      { id: "P103", name: "Amit Kumar" }
    ]);
  }, [user]);

  // 🔹 fetch booked slots for selected date
  useEffect(() => {
    if (!form.date) return;

    // future: fetch(`/api/slots?doctorId=${user.id}&date=${form.date}`)
    setExistingSlots(["10:00", "11:30", "15:00"]);
  }, [form.date]);

  /* ================= HANDLERS ================= */

  const handlePatientSearch = (e) => {
    const value = e.target.value;
    setForm({ ...form, patient: value });
    setShowDropdown(true);

    const results = patients.filter((p) =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPatients(results);
  };

  const selectPatient = (p) => {
    setForm({ ...form, patient: p.name, patientId: p.id });
    setShowDropdown(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /* ===== SLOT CONFLICT CHECK ===== */
    if (existingSlots.includes(form.time)) {
      alert("❌ This time slot is already booked. Choose another slot.");
      return;
    }

    /* ===== FINAL PAYLOAD ===== */
    const payload = {
      doctorId: user?.id,
      ...form
    };

    console.log("APPOINTMENT CREATED:", payload);

    /* ===== AUTO FLOWS ===== */
    console.log("🧾 Prescription flow initiated");
    console.log("📲 SMS sent to patient");
    console.log("📧 Email notification sent");

    alert("✅ Appointment confirmed + Notifications sent");

    setForm({
      patient: "",
      patientId: "",
      date: "",
      time: "",
      type: "Consultation",
      priority: "Normal",
      notes: ""
    });
  };

  /* ================= UI ================= */

  return (
    <div className="appointment-advanced">

      <div className="page-header">
        <h2>Schedule Appointment</h2>
        <p>Doctor: <strong>{user?.name}</strong></p>
      </div>

      <form className="appointment-form" onSubmit={handleSubmit}>

        {/* PATIENT SEARCH */}
        <div className="form-row">
          <label>Search Patient</label>
          <input
            type="text"
            value={form.patient}
            placeholder="Type patient name"
            onChange={handlePatientSearch}
            required
          />

          {showDropdown && filteredPatients.length > 0 && (
            <ul className="dropdown">
              {filteredPatients.map((p) => (
                <li key={p.id} onClick={() => selectPatient(p)}>
                  {p.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* DATE & TIME */}
        <div className="form-grid">
          <div>
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Time</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
            />
            {existingSlots.includes(form.time) && (
              <small className="error">
                Slot already booked ⚠️
              </small>
            )}
          </div>
        </div>

        {/* TYPE & PRIORITY */}
        <div className="form-grid">
          <div>
            <label>Appointment Type</label>
            <select name="type" value={form.type} onChange={handleChange}>
              <option>Consultation</option>
              <option>Follow-up</option>
              <option>Online</option>
            </select>
          </div>

          <div>
            <label>Priority</label>
            <select name="priority" value={form.priority} onChange={handleChange}>
              <option>Normal</option>
              <option>Urgent</option>
            </select>
          </div>
        </div>

        {/* NOTES */}
        <div className="form-row">
          <label>Doctor Notes</label>
          <textarea
            name="notes"
            rows="4"
            value={form.notes}
            onChange={handleChange}
            placeholder="Clinical notes, symptoms, instructions"
          />
        </div>

        {/* ACTION */}
        <div className="form-actions">
          <button type="submit">Confirm Appointment</button>
        </div>

      </form>
    </div>
  );
}
