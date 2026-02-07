import "./LabReport.css";

export default function LabReports() {
  return (
    <div className="patient-page">
      <h2>Lab Reports</h2>
      <p className="subtitle">View & manage your medical test reports</p>

      {/* ================= REPORT CARD ================= */}
      <div className="report-card">

        <div className="report-header">
          <div>
            <h3>Complete Blood Count (CBC)</h3>
            <span>Prescribed by Dr. Amit Sharma</span>
          </div>
          <span className="report-status normal">Normal</span>
        </div>

        <div className="report-details">
          <div>
            <label>Test Type</label>
            <p>Blood Test</p>
          </div>

          <div>
            <label>Lab Name</label>
            <p>City Diagnostics</p>
          </div>

          <div>
            <label>Test Date</label>
            <p>12 Feb 2026</p>
          </div>

          <div>
            <label>Verified</label>
            <p className="verified">✔ Doctor Verified</p>
          </div>
        </div>

        <div className="report-actions">
          <button className="view-btn">👁 View Report</button>
          <button className="download-btn">⬇ Download PDF</button>
        </div>
      </div>

      {/* ================= SECOND REPORT ================= */}
      <div className="report-card">

        <div className="report-header">
          <div>
            <h3>Lipid Profile</h3>
            <span>Prescribed by Dr. Neha Verma</span>
          </div>
          <span className="report-status alert">Attention</span>
        </div>

        <div className="report-details">
          <div>
            <label>Test Type</label>
            <p>Cholesterol Test</p>
          </div>

          <div>
            <label>Lab Name</label>
            <p>HealthPlus Labs</p>
          </div>

          <div>
            <label>Test Date</label>
            <p>05 Feb 2026</p>
          </div>

          <div>
            <label>Verified</label>
            <p className="verified">✔ Doctor Verified</p>
          </div>
        </div>

        <div className="report-actions">
          <button className="view-btn">👁 View Report</button>
          <button className="download-btn">⬇ Download PDF</button>
        </div>
      </div>

      {/* ================= UPLOAD MOCK ================= */}
      <div className="upload-box">
        <h4>📤 Upload New Report</h4>
        <input type="file" />
        <p className="hint">
          Reports will be reviewed & verified by doctor before appearing here
        </p>
      </div>
    </div>
  );
}
