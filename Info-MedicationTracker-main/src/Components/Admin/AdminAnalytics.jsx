import "./AdminAnalytics.css";

export default function AdminAnalytics() {
  const stats = [
    { label: "Total Doctors", value: 52 },
    { label: "Approved", value: 38 },
    { label: "Pending", value: 10 },
    { label: "Rejected", value: 4 }
  ];

  return (
    <div className="analytics-card">
      <h3>Doctor Analytics</h3>

      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-box">
            <h2>{s.value}</h2>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
