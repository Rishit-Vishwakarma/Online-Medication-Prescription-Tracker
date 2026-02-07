import { useState } from "react";
import "./Payment.css";

export default function Payment() {
  const [modal, setModal] = useState(false);
  const [step, setStep] = useState("method"); 
  const [upiApp, setUpiApp] = useState("");
  const [otp, setOtp] = useState("");
  const [success, setSuccess] = useState(null);

  const [form, setForm] = useState({
    upi: "",
    amount: "",
    acc: "",
    acc2: "",
    ifsc: "",
    amt2: ""
  });

  /* ================= PAYMENT HISTORY ================= */
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "Credit",
      name: "Rohit Sharma",
      upi: "rohit@upi",
      amount: 800,
      method: "Google Pay",
      date: "22 Jan 2026"
    }
  ]);

  const fakeOTP = "1234";

  const sendPayment = () => {
    if (otp === fakeOTP) {
      setSuccess(true);

      // ✅ ADD HISTORY ENTRY
      const newTxn = {
        id: Date.now(),
        type: "Debit",
        name: "Sent Payment",
        upi: form.upi || "Net Banking",
        amount: form.amount,
        method: upiApp || "Net Banking",
        date: new Date().toLocaleDateString()
      };

      setTransactions([newTxn, ...transactions]);

    } else {
      setSuccess(false);
    }
    setStep("result");
  };

  return (
    <div className="payment-container">

      {/* WALLET */}
      <div className="wallet-card">
        <h2>Doctor Wallet</h2>
        <p className="balance">₹ 24,500</p>
        <button onClick={() => setModal(true)} className="withdraw-btn">
          Send / Withdraw
        </button>
      </div>

      {/* ================= TRANSACTION HISTORY ================= */}
      <div className="history-card">
        <h3>Transaction History</h3>

        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>UPI / Bank</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td className={t.type === "Credit" ? "credit" : "debit"}>
                  {t.type}
                </td>
                <td>{t.name}</td>
                <td>{t.upi}</td>
                <td>₹ {t.amount}</td>
                <td>{t.method}</td>
                <td>{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {modal && (
        <div className="modal-backdrop">
          <div className="modal scroll">

            {/* STEP 1 */}
            {step === "method" && (
              <>
                <h3>Select Payment Method</h3>
                <div className="method-buttons">
                  <button onClick={() => setStep("upi")}>UPI</button>
                  <button onClick={() => setStep("bank")}>Net Banking</button>
                </div>
              </>
            )}

            {/* STEP 2 – UPI */}
            {step === "upi" && (
              <>
                <h3>Select UPI App</h3>
                <div className="upi-apps">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg"
                    onClick={() => { setUpiApp("Google Pay"); setStep("upiForm"); }}
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg"
                    onClick={() => { setUpiApp("PhonePe"); setStep("upiForm"); }}
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg"
                    onClick={() => { setUpiApp("Paytm"); setStep("upiForm"); }}
                  />
                </div>
              </>
            )}

            {/* STEP 3 – UPI FORM */}
            {step === "upiForm" && (
              <>
                <h3>{upiApp}</h3>
                <input
                  placeholder="UPI ID / Mobile"
                  onChange={e => setForm({ ...form, upi: e.target.value })}
                />
                <input
                  placeholder="Amount"
                  onChange={e => setForm({ ...form, amount: e.target.value })}
                />
                <button onClick={() => setStep("otp")}>Proceed</button>
              </>
            )}

            {/* STEP 4 – OTP */}
            {step === "otp" && (
              <>
                <h3>Enter OTP</h3>
                <input
                  placeholder="Enter OTP (1234)"
                  onChange={e => setOtp(e.target.value)}
                />
                <button onClick={sendPayment}>Confirm</button>
              </>
            )}

            {/* NET BANKING */}
            {step === "bank" && (
              <>
                <h3>Net Banking</h3>
                <input placeholder="Account Number"
                  onChange={e => setForm({ ...form, acc: e.target.value })} />
                <input placeholder="Confirm Account Number"
                  onChange={e => setForm({ ...form, acc2: e.target.value })} />
                <input placeholder="IFSC Code"
                  onChange={e => setForm({ ...form, ifsc: e.target.value })} />
                <input placeholder="Amount"
                  onChange={e => setForm({ ...form, amount: e.target.value })} />
                <input placeholder="Confirm Amount"
                  onChange={e => setForm({ ...form, amt2: e.target.value })} />
                <button onClick={() => setStep("otp")}>Proceed</button>
              </>
            )}

            {/* RESULT */}
            {step === "result" && (
              <div className="result">
                {success ? (
                  <>
                    <div className="success">✔</div>
                    <p>Payment Successful</p>
                  </>
                ) : (
                  <>
                    <div className="fail">✖</div>
                    <p>Payment Failed</p>
                  </>
                )}
                <button onClick={() => {
                  setModal(false);
                  setStep("method");
                  setOtp("");
                }}>
                  Done
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
