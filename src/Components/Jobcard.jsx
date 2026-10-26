import { Link } from "react-router-dom";

function Jobcard({ job }) {
  return (
    <div className="job-card">
      <span className="job-type">{job.type}</span>

      <h3>{job.title}</h3>
      <p className="company">{job.company}</p>
      <p>📍 {job.location}</p>
      <p>💰 {job.salary}</p>

      <p className="job-description">{job.description}</p>

      <Link to={`/jobs/${job.id}`} className="primary-btn">
        View Details
      </Link>
    </div>
  );
}

export default Jobcard;