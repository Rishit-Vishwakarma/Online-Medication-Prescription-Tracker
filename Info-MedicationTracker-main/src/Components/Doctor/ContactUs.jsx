import { useState } from "react";
import "./ContactUs.css";

export default function ContactUs() {

  const [edit, setEdit] = useState(false);

  // ✅ SAFE DEFAULT DATA (backend-ready)
  const [contact, setContact] = useState({
    hospitalName: "CityCare Multispeciality Hospital",
    doctorName: "Dr. Govind Kumar",
    email: "doctor@hospital.com",
    phone: "+91 9876543210",
    whatsapp: "+91 9876543210",
    address: "Sector 22, Noida, Uttar Pradesh",
    supportHours: "Mon – Sat | 10:00 AM – 6:00 PM",
    emergency: "+91 1122334455"
  });

  const saveContact = () => {
    setEdit(false);

    console.log("Saved Contact:", contact);

    // 🔐 Future backend
    // POST /api/doctor/contact
  };

  return (
    <div className="contact-page">

      {/* HEADER */}
      <div className="contact-header">
        <h2>Doctor Contact Information</h2>
        <p>
          This information will be visible to patients for appointments
          and communication.
        </p>
      </div>

      {/* CARD */}
      <div className="contact-card">

        {/* LEFT */}
        <div>
          <h3>{contact.hospitalName}</h3>
          <p className="doctor-name">{contact.doctorName}</p>

          {renderField("Email", "email")}
          {renderField("Phone", "phone")}
          {renderField("WhatsApp", "whatsapp")}
          {renderField("Support Hours", "supportHours")}
        </div>

        {/* RIGHT */}
        <div>
          <div className="info">
            <span>Clinic Address</span>
            {edit ? (
              <textarea
                value={contact.address}
                onChange={(e) =>
                  setContact({ ...contact, address: e.target.value })
                }
              />
            ) : (
              <p>{contact.address}</p>
            )}
          </div>

          <div className="info emergency">
            <span>Emergency Contact</span>
            {edit ? (
              <input
                value={contact.emergency}
                onChange={(e) =>
                  setContact({ ...contact, emergency: e.target.value })
                }
              />
            ) : (
              <p>{contact.emergency}</p>
            )}
          </div>

          {/* ACTION BUTTONS */}
          <div className="actions">
            {!edit ? (
              <button onClick={() => setEdit(true)}>
                Edit Contact
              </button>
            ) : (
              <>
                <button className="secondary" onClick={() => setEdit(false)}>
                  Cancel
                </button>
                <button onClick={saveContact}>
                  Save
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );

  /* ===== REUSABLE FIELD ===== */
  function renderField(label, key) {
    return (
      <div className="info">
        <span>{label}</span>
        {edit ? (
          <input
            value={contact[key]}
            onChange={(e) =>
              setContact({ ...contact, [key]: e.target.value })
            }
          />
        ) : (
          <p>{contact[key]}</p>
        )}
      </div>
    );
  }
}
