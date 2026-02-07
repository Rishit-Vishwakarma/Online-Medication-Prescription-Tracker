import { useState } from "react";
import "./DoctorDocumentUpload.css";

export default function DoctorDocumentUpload() {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    console.log("Uploading document:", file.name);

    // BACKEND READY:
    // POST /api/doctors/upload-document
  };

  return (
    <div className="doc-upload-card">
      <h3>Doctor Document Upload</h3>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>Upload Document</button>

      <p className="note">
        Upload PDF (Medical License / Degree Certificate)
      </p>
    </div>
  );
}
