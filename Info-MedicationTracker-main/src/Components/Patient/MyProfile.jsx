import { useState, useEffect } from "react";
import api from "../../api";
import "./MyProfile.css";

export default function MyProfile({ user }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [profile, setProfile] = useState({
    age: "",
    gender: "",
    bloodGroup: "",
    knownDisease: "",
    symptoms: "",
    allergies: "",
    note: ""
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/user/profile");
      setProfile(response.data);
    } catch (err) {
      console.log("Profile not found, user needs to create one.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      await api.post("/user/profile", profile);
      setMessage("✅ Profile updated successfully!");
      setOpenEdit(false);
    } catch (err) {
      setMessage("❌ Failed to update profile.");
    }
  };

  const downloadPDF = () => {
    window.print();
  };

  if (loading) return <div className="loading">Loading Profile...</div>;

  return (
    <div className="patient-page">

      {/* HEADER */}
      <div className="profile-header">
        <h2>My Profile</h2>
        <p className="subtitle">Personal & medical information</p>
      </div>

      {message && <p className="status-msg">{message}</p>}

      {/* BASIC INFO */}
      <div className="profile-section">
        <h3>Basic Information</h3>

        <div className="profile-grid">
          <div className="profile-item">
            <label>Email</label>
            <p className="verified">
              {user?.email} <span>✔ Verified</span>
            </p>
          </div>

          <div className="profile-item">
            <label>Role</label>
            <p><span className="role-chip">{user?.role}</span></p>
          </div>
        </div>
      </div>

      {/* PERSONAL DETAILS */}
      <div className="profile-section">
        <h3>Personal Details</h3>

        <div className="profile-grid">
          <div className="profile-item">
            <label>Age</label>
            <p>{profile.age || "Not set"}</p>
          </div>

          <div className="profile-item">
            <label>Gender</label>
            <p>{profile.gender || "Not set"}</p>
          </div>

          <div className="profile-item">
            <label>Blood Group</label>
            <p>{profile.bloodGroup || "Not set"}</p>
          </div>
        </div>
      </div>

      {/* MEDICAL INFO */}
      <div className="profile-section">
        <h3>Medical Information</h3>

        <ul className="medical-list">
          <li className="medical-item">
            <strong>Allergies</strong>
            <span>{profile.allergies || "None"}</span>
          </li>
          <li className="medical-item">
            <strong>Known Diseases</strong>
            <span>{profile.knownDisease || "None"}</span>
          </li>
          <li className="medical-item">
            <strong>Current Symptoms</strong>
            <span>{profile.symptoms || "None"}</span>
          </li>
          <li className="medical-item">
            <strong>Additional Note</strong>
            <span>{profile.note || "None"}</span>
          </li>
        </ul>
      </div>

      {/* ACTIONS */}
      <div className="profile-actions">
        <button className="primary-btn" onClick={() => setOpenEdit(true)}>
          ✏️ Edit Profile
        </button>
        <button className="outline-btn" onClick={downloadPDF}>
          📄 Download Profile
        </button>
      </div>

      {/* EDIT MODAL */}
      {openEdit && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Profile</h3>

            <div className="modal-content-scroll">
                <div className="input-group">
                    <label>Age</label>
                    <input
                      name="age"
                      type="number"
                      value={profile.age}
                      onChange={handleChange}
                      placeholder="Age"
                    />
                </div>

                <div className="input-group">
                    <label>Gender</label>
                    <select
                      name="gender"
                      value={profile.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                </div>

                <div className="input-group">
                    <label>Blood Group</label>
                    <input
                      name="bloodGroup"
                      value={profile.bloodGroup}
                      onChange={handleChange}
                      placeholder="e.g. O+"
                    />
                </div>

                <div className="input-group">
                    <label>Known Diseases</label>
                    <input
                      name="knownDisease"
                      value={profile.knownDisease}
                      onChange={handleChange}
                      placeholder="e.g. Diabetes"
                    />
                </div>

                <div className="input-group">
                    <label>Allergies</label>
                    <input
                      name="allergies"
                      value={profile.allergies}
                      onChange={handleChange}
                      placeholder="e.g. Peanuts"
                    />
                </div>

                <div className="input-group">
                    <label>Symptoms</label>
                    <textarea
                      name="symptoms"
                      value={profile.symptoms}
                      onChange={handleChange}
                      placeholder="Describe your symptoms"
                    />
                </div>

                <div className="input-group">
                    <label>Additional Note</label>
                    <textarea
                      name="note"
                      value={profile.note}
                      onChange={handleChange}
                      placeholder="Any extra information for the doctor..."
                    />
                </div>
            </div>

            <div className="modal-actions">
              <button className="outline-btn" onClick={() => setOpenEdit(false)}>
                Cancel
              </button>
              <button className="primary-btn" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
