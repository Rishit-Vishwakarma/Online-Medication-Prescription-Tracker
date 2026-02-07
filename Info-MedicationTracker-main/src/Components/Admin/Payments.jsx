import { useEffect, useState } from "react";
import "./Payments.css";

/*
  ADMIN – PLATFORM PAYMENTS
  ------------------------
  • Platform total revenue
  • Doctor payouts
  • Admin commission
  • Transaction history
  • Backend ready (API friendly)
*/

export default function Payments() {
  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState({
    totalRevenue: 0,
    doctorPayout: 0,
    platformEarning: 0
  });

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // 🔐 BACKEND READY
    // GET /api/admin/payments/summary
    // GET /api/admin/payments/transactions

    setSummary({
      totalRevenue: 540000,
      doctorPayout: 410000,
      platformEarning: 130000
    });

    setTransactions([
      {
        id: "TX1001",
        source: "Patient Payment",
        amount: 800,
        method: "UPI",
        type: "Credit",
        date: "2026-01-12"
      },
      {
        id: "TX1002",
        source: "Patient Payment",
        amount: 1200,
        method: "Card",
        type: "Credit",
        date: "2026-01-14"
      },
      {
        id: "TX1003",
        source: "Doctor Payout",
        amount: 5000,
        method: "Bank Transfer",
        type: "Debit",
        date: "2026-01-16"
      }
    ]);

    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">Loading payment data...</div>;
  }

  return (
    <div className="admin-payments">

      {/* ===== HEADER ===== */}
      <div className="header">
        <h2>Platform Payments & Revenue</h2>
        <p>Overview of all financial activities</p>
      </div>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="summary-grid">
        <div className="summary-card revenue">
          <h4>Total Revenue</h4>
          <p>₹ {summary.totalRevenue.toLocaleString()}</p>
        </div>

        <div className="summary-card payout">
          <h4>Doctor Payout</h4>
          <p>₹ {summary.doctorPayout.toLocaleString()}</p>
        </div>

        <div className="summary-card profit">
          <h4>Platform Earning</h4>
          <p>₹ {summary.platformEarning.toLocaleString()}</p>
        </div>
      </div>

      {/* ===== TRANSACTIONS ===== */}
      <div className="transactions">
        <h3>Recent Transactions</h3>

        <table>
          <thead>
            <tr>
              <th>Source</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map(txn => (
              <tr key={txn.id}>
                <td>{txn.source}</td>
                <td>₹ {txn.amount}</td>
                <td>{txn.method}</td>
                <td>
                  <span className={`type ${txn.type.toLowerCase()}`}>
                    {txn.type}
                  </span>
                </td>
                <td>{txn.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
