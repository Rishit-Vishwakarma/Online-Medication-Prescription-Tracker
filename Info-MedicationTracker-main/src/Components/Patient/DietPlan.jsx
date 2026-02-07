import "./DietPlan.css";

export default function DietPlan() {
  return (
    <div className="patient-page">
      <h2>Diet Plan</h2>
      <p className="subtitle">
        Personalized diet plan recommended by your doctor
      </p>

      {/* ================= SUMMARY ================= */}
      <div className="diet-summary">
        <div>
          <label>Condition</label>
          <p>General Wellness</p>
        </div>
        <div>
          <label>Calories / Day</label>
          <p>1800 kcal</p>
        </div>
        <div>
          <label>Status</label>
          <p className="verified">✔ Doctor Approved</p>
        </div>
      </div>

      {/* ================= DAY PLAN ================= */}
      <div className="diet-card">

        <h3>Daily Meal Schedule</h3>

        <div className="meal">
          <span className="time">🌅 Morning</span>
          <p>Fruits, Oats & Warm Water</p>
        </div>

        <div className="meal">
          <span className="time">🌞 Lunch</span>
          <p>Rice / Roti, Dal, Green Vegetables</p>
        </div>

        <div className="meal">
          <span className="time">🌆 Evening Snack</span>
          <p>Sprouts / Nuts / Green Tea</p>
        </div>

        <div className="meal">
          <span className="time">🌙 Dinner</span>
          <p>Light Soup, Salad & Fruits</p>
        </div>
      </div>

      {/* ================= NUTRITION ================= */}
      <div className="nutrition-card">
        <h3>Nutrition Focus</h3>

        <div className="nutrition">
          <span>🥦 Fiber</span>
          <span>High</span>
        </div>

        <div className="nutrition">
          <span>🍗 Protein</span>
          <span>Moderate</span>
        </div>

        <div className="nutrition">
          <span>🍞 Carbohydrates</span>
          <span>Balanced</span>
        </div>

        <div className="nutrition">
          <span>🧂 Salt</span>
          <span>Low</span>
        </div>
      </div>

      {/* ================= DO & DON'T ================= */}
      <div className="rules-grid">
        <div className="rule-card good">
          <h4>✅ Do</h4>
          <ul>
            <li>Drink 3–4 liters of water</li>
            <li>Eat fresh & home-made food</li>
            <li>Follow meal timings</li>
          </ul>
        </div>

        <div className="rule-card bad">
          <h4>❌ Avoid</h4>
          <ul>
            <li>Junk & fried food</li>
            <li>Sugary drinks</li>
            <li>Late night meals</li>
          </ul>
        </div>
      </div>

      {/* ================= ACTIONS ================= */}
      <div className="diet-actions">
        <button className="download-btn">📄 Download Diet Chart</button>
        <button className="reminder-btn">⏰ Set Meal Reminder</button>
      </div>

    </div>
  );
}
