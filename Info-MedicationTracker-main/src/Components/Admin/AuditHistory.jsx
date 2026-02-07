import "./AuditHistory.css";

export default function AuditHistory() {
  const logs = [
    {
      id: 1,
      admin: "Super Admin",
      doctor: "Dr. Amit Sharma",
      action: "Approved",
      reason: "Valid documents verified",
      date: "2026-02-10 11:20 AM"
    },
    {
      id: 2,
      admin: "Super Admin",
      doctor: "Dr. Raj Malhotra",
      action: "Rejected",
      reason: "Invalid registration number",
      date: "2026-02-11 03:45 PM"
    }
  ];

  return (
    <div className="audit-card">
      <h3>Audit History</h3>

      <table>
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Action</th>
            <th>Reason</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {logs.map(log => (
            <tr key={log.id}>
              <td>{log.doctor}</td>
              <td>
                <span className={`status ${log.action.toLowerCase()}`}>
                  {log.action}
                </span>
              </td>
              <td>{log.reason}</td>
              <td>{log.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
