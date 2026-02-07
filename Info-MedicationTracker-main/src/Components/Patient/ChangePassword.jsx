import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./ChangePassword.css";

export default function ChangePassword() {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="patient-page">
      <h2>Change Password</h2>
      <p className="subtitle">
        For your security, choose a strong and unique password
      </p>

      <form className="password-card">

        {/* OLD PASSWORD */}
        <div className="field">
          <label>Current Password</label>
          <div className="input-box">
            <input
              type={showOld ? "text" : "password"}
              placeholder="Enter current password"
            />
            <span onClick={() => setShowOld(!showOld)}>
              {showOld ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
        </div>

        {/* NEW PASSWORD */}
        <div className="field">
          <label>New Password</label>
          <div className="input-box">
            <input
              type={showNew ? "text" : "password"}
              placeholder="Create new password"
            />
            <span onClick={() => setShowNew(!showNew)}>
              {showNew ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          <p className="hint">
            Must be at least 8 characters with uppercase, number & symbol
          </p>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="field">
          <label>Confirm New Password</label>
          <div className="input-box">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter new password"
            />
            <span onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
        </div>

        {/* STRENGTH BAR */}
        <div className="strength">
          <span>Password Strength</span>
          <div className="strength-bar">
            <div className="strength-fill" style={{ width: "70%" }} />
          </div>
          <small>Strong</small>
        </div>

        {/* ACTION */}
        <button type="button" className="update-btn">
          🔒 Update Password
        </button>
      </form>

      <div className="security-note">
        ⚠ For safety reasons, you’ll be logged out after changing password
      </div>
    </div>
  );
}
