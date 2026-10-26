import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Candidate");

  function handleSubmit(e) {
    e.preventDefault();
    alert("Registration UI is working. Backend is not connected yet.");
  }

  return (
    <section className="form-container">
      <h1>Create Account</h1>

      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />

        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <label>Password</label>
        <input
          type="password"
          minLength={6}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
        />

        <label>Register as</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option>Candidate</option>
          <option>Recruiter</option>
        </select>

        <button className="primary-btn">Register</button>
      </form>

      <p>
        Already registered? <Link to="/login">Login</Link>
      </p>
    </section>
  );
}

export default Register;