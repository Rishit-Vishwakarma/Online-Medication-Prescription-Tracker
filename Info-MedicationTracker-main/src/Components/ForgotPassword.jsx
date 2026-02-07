import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./ForgotPassword.css";

export default function ForgotPassword({ backToLogin }) {
  const [method, setMethod] = useState("email"); // email | mobile
  const [step, setStep] = useState(1); // 1 = get OTP, 2 = verify OTP, 3 = set password

  const [form, setForm] = useState({
    email: "",
    mobile: "",
    otp: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* STEP 1: SEND OTP */
  const sendOtp = () => {
    if (method === "email" && !form.email) {
      setError("Email is required");
      return;
    }
    if (method === "mobile" && !form.mobile) {
      setError("Mobile number is required");
      return;
    }
    console.log("OTP Sent to:", method === "email" ? form.email : form.mobile);
    setStep(2);
  };

  /* STEP 2: VERIFY OTP */
  const verifyOtp = () => {
    if (form.otp !== "123456") {
      setError("Invalid OTP (use 123456 for demo)");
      return;
    }
    setStep(3);
  };

  /* STEP 3: RESET PASSWORD */
  const resetPassword = () => {
    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    console.log("Password Reset Successful:", form);
    alert("Password reset successful");
    backToLogin();
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <h2>Forgot Password</h2>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <p>Select verification method</p>

            <div className="method-select">
              <label>
                <input
                  type="radio"
                  checked={method === "email"}
                  onChange={() => setMethod("email")}
                />
                Email
              </label>

              <label>
                <input
                  type="radio"
                  checked={method === "mobile"}
                  onChange={() => setMethod("mobile")}
                />
                Mobile
              </label>
            </div>

            {method === "email" && (
              <input
                type="email"
                name="email"
                placeholder="Registered Email"
                value={form.email}
                onChange={handleChange}
              />
            )}

            {method === "mobile" && (
              <input
                type="tel"
                name="mobile"
                placeholder="Registered Mobile Number"
                value={form.mobile}
                onChange={handleChange}
                pattern="[0-9]{10}"
              />
            )}

            {error && <p className="error-text">{error}</p>}

            <button onClick={sendOtp}>Send OTP</button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <p>Enter OTP</p>

            <input
              type="text"
              name="otp"
              placeholder="Enter OTP (123456)"
              value={form.otp}
              onChange={handleChange}
            />

            {error && <p className="error-text">{error}</p>}

            <button onClick={verifyOtp}>Verify OTP</button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <p>Set New Password</p>

            <div className="password-box">
              <input
                type={showNew ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                value={form.newPassword}
                onChange={handleChange}
              />
              <span onClick={() => setShowNew(!showNew)}>
                {showNew ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <div className="password-box">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <span onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {error && <p className="error-text">{error}</p>}

            <button onClick={resetPassword}>Reset Password</button>
          </>
        )}

        <p className="back-login">
          <span onClick={backToLogin}>Back to Login</span>
        </p>
      </div>
    </div>
  );
}
