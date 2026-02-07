import { useEffect, useState } from "react";
import "./Prescriptions.css";

export default function Prescriptions() {
  const [loading, setLoading] = useState(true);

  const [doctor, setDoctor] = useState(null);
  const [patient, setPatient] = useState(null);

  const [form, setForm] = useState({
    complaints: "Chest pain since 2 days",
    diagnosis: "Hypertension (Stage 1)",
    medicines:
      "Tab Amlodipine 5mg – OD – 30 Days\nTab Aspirin 75mg – OD – 15 Days",
    tests: "ECG, Lipid Profile",
    advice: "Low salt diet, daily walk",
    followUp: "After 15 days"
  });

  // 🔥 RUNS ONCE – GUARANTEED
  useEffect(() => {
    // dummy doctor
    setDoctor({
      id: "DOC101",
      name: "Dr. Govind Kumar",
      qualification: "MBBS, MD (Cardiology)",
      regNo: "UP-MCI-44321",
      hospital: "CityCare Multispeciality Hospital"
    });

    // dummy patient
    setPatient({
      id: "PT1023",
      name: "Rohit Sharma",
      age: 45,
      gender: "Male"
    });

    // 🔑 MOST IMPORTANT LINE
    setLoading(false);
  }, []);

  // ===== GUARDS =====
  if (loading) {
    return <p className="loading">Loading prescription…</p>;
  }

  return (
    <div className="prescriptions-page">

      <div className="rx-header">
        <div>
          <h2>{doctor.hospital}</h2>
          <p className="doctor-info">
            {doctor.name}<br />
            {doctor.qualification}<br />
            Reg No: {doctor.regNo}
          </p>
        </div>

        <div className="patient-info">
          <p><b>Patient:</b> {patient.name}</p>
          <p><b>Age / Gender:</b> {patient.age} / {patient.gender}</p>
          <p><b>Date:</b> {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="rx-form">

        <div className="form-group">
          <label>Chief Complaints</label>
          <textarea value={form.complaints} />
        </div>

        <div className="form-group">
          <label>Diagnosis</label>
          <textarea value={form.diagnosis} />
        </div>

        <div className="form-group">
          <label>Medicines</label>
          <textarea value={form.medicines} />
        </div>

        <div className="form-group">
          <label>Investigations</label>
          <textarea value={form.tests} />
        </div>

        <div className="form-group">
          <label>Advice</label>
          <textarea value={form.advice} />
        </div>

        <div className="form-group">
          <label>Follow-up</label>
          <input value={form.followUp} />
        </div>

        <button
          className="save-btn"
          onClick={() =>
            console.log("✅ Prescription Saved (Prototype)", {
              doctor,
              patient,
              form
            })
          }
        >
          Save Prescription
        </button>
      </div>
    </div>
  );
}
