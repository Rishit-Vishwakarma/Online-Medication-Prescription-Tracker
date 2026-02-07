import { useEffect, useState } from "react";
import "./Settings.css";

/*
  ADMIN – SYSTEM SETTINGS
  ----------------------
  • Commission management
  • User enable / disable
  • Platform feature toggles
  • Security settings
  • Backend-ready
*/

export default function Settings() {
  const [loading, setLoading] = useState(true);

  const [settings, setSettings] = useState({
    doctorCommission: 20,
    allowNewDoctors: true,
    allowPayments: true,
    allowAppointments: true,
    maintenanceMode: false
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    // 🔐 BACKEND READY
    // GET /api/admin/settings

    // 🧪 Demo data
    setSettings({
      doctorCommission: 20,
      allowNewDoctors: true,
      allowPayments: true,
      allowAppointments: true,
      maintenanceMode: false
    });

    setLoading(false);
  }, []);

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setMessage("");
  };

  const saveSettings = () => {
    // 🔐 BACKEND READY
    // POST /api/admin/settings
    // body: settings

    setMessage("Settings updated successfully");
  };

  if (loading) {
    return <p className="loading">Loading settings...</p>;
  }

  return (
    <div className="admin-settings">

      {/* HEADER */}
      <div className="settings-header">
        <h2>System Settings</h2>
        <p>Control platform behaviour and permissions</p>
      </div>

      {/* COMMISSION */}
      <div className="setting-card">
        <h4>Doctor Commission</h4>
        <p>Percentage deducted from doctor earnings</p>

        <div className="input-row">
          <input
            type="number"
            value={settings.doctorCommission}
            onChange={(e) =>
              handleChange("doctorCommission", Number(e.target.value))
            }
          />
          <span>%</span>
        </div>
      </div>

      {/* PLATFORM CONTROLS */}
      <div className="setting-card">
        <h4>Platform Controls</h4>

        <div className="toggle-row">
          <span>Allow New Doctor Registration</span>
          <input
            type="checkbox"
            checked={settings.allowNewDoctors}
            onChange={(e) =>
              handleChange("allowNewDoctors", e.target.checked)
            }
          />
        </div>

        <div className="toggle-row">
          <span>Enable Payments</span>
          <input
            type="checkbox"
            checked={settings.allowPayments}
            onChange={(e) =>
              handleChange("allowPayments", e.target.checked)
            }
          />
        </div>

        <div className="toggle-row">
          <span>Enable Appointments</span>
          <input
            type="checkbox"
            checked={settings.allowAppointments}
            onChange={(e) =>
              handleChange("allowAppointments", e.target.checked)
            }
          />
        </div>
      </div>

      {/* SECURITY */}
      <div className="setting-card danger-zone">
        <h4>Maintenance Mode</h4>
        <p>
          Temporarily disable user activity during updates or issues
        </p>

        <div className="toggle-row">
          <span>Enable Maintenance Mode</span>
          <input
            type="checkbox"
            checked={settings.maintenanceMode}
            onChange={(e) =>
              handleChange("maintenanceMode", e.target.checked)
            }
          />
        </div>
      </div>

      {/* SAVE */}
      <div className="save-box">
        {message && <p className="success">{message}</p>}
        <button onClick={saveSettings}>Save Changes</button>
      </div>

    </div>
  );
}
