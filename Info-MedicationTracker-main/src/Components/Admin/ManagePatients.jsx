import { useEffect, useState } from "react";
import "./ManagePatients.css";

/*
  ADMIN – MANAGE PATIENTS
  ----------------------
  • View all registered patients
  • Search & filter
  • View patient details
  • Enable / disable patient account
  • Backend-ready structure
*/

export default function ManagePatients() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [patients, setPatients] = useState([]);

  /* ================= FETCH PATIENTS ================= */
  useEffect(() => {
    // 🔐 BACKEND READY
    // GET /api/admin/patients

    setPatients([
      {
        id: 1,
        name: "Rohit Sharma",
        age: 45,
        gender: "Male",
        mobile: "9876543210",
        email: "rohit@gmail.com",
        status: "Active"
      },
      {
        id: 2,
        name: "Anita Verma",
        age: 36,
        gender: "Female",
        mobile: "9123456789",
        email: "anita@gmail.com",
        status: "Active"
      },
      {
        id: 3,
        name: "Suresh Kumar",
        age: 52,
        gender: "Male",
        mobile: "9988776655",
        email: "suresh@gmail.com",
        status: "Blocked"
      }
    ]);

    setLoading(false);
  }, []);

  /* ================= UPDATE STATUS ================= */
  const toggleStatus = (id) => {
    setPatients(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, status: p.status === "Active" ? "Blocked" : "Active" }
          : p
      )
    );

    // 🔐 BACKEND READY
    // PATCH /api/admin/patients/:id/status
  };

  /* ================= FILTER ================= */
  const filteredPatients = patients.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "all" || p.status.toLowerCase() === statusFilter;

    return matchSearch && matchStatus;
  });

  if (loading) {
    return <div className="loading">Loading patients...</div>;
  }

  return (
    <div className="manage-patients">

      {/* HEADER */}
      <div className="header">
        <h2>Patient Management</h2>
        <p>Monitor and control registered patients</p>
      </div>

      {/* CONTROLS */}
      <div className="controls">
        <input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredPatients.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.age}</td>
                <td>{p.gender}</td>
                <td>{p.mobile}</td>
                <td>{p.email}</td>

                <td>
                  <span className={`status ${p.status.toLowerCase()}`}>
                    {p.status}
                  </span>
                </td>

                <td>
                  <button
                    className={
                      p.status === "Active" ? "block" : "activate"
                    }
                    onClick={() => toggleStatus(p.id)}
                  >
                    {p.status === "Active" ? "Block" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPatients.length === 0 && (
          <div className="no-data">No patients found</div>
        )}
      </div>
    </div>
  );
}
