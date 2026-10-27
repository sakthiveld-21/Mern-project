import { useParams } from "react-router-dom";
import { useState } from "react";
import jobs from "../data";

function ApplyJob() {
  const { id } = useParams();
  const job = jobs.find((item) => item.id === Number(id));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!resume) {
      setMessage("Please upload your resume.");
      return;
    }

    const application = {
      id: Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      name,
      email,
      resumeName: resume.name,
      status: "Pending",
    };

    const existing =
      JSON.parse(localStorage.getItem("applications")) || [];

    localStorage.setItem(
      "applications",
      JSON.stringify([...existing, application])
    );

    setMessage("Application submitted successfully!");
    setName("");
    setEmail("");
    setResume(null);
    e.target.reset();
  }

  if (!job) {
    return <h2 className="section">Job not found</h2>;
  }

  return (
    <section className="form-container">
      <h1>Apply for {job.title}</h1>

      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
        />

        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <label>Resume</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          required
          onChange={(e) => setResume(e.target.files[0] || null)}
        />

        <button className="primary-btn" type="submit">
          Submit Application
        </button>

        {message && <p>{message}</p>}
      </form>
    </section>
  );
}

export default ApplyJob;