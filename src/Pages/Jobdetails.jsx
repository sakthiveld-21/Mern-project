import { Link, useParams } from "react-router-dom";
import jobs from "../data";

function JobDetails() {
  const { id } = useParams();
  const job = jobs.find((item) => item.id === Number(id));

  if (!job) {
    return <h2 className="section">Job not found</h2>;
  }

  return (
    <section className="details-card">
      <h1>{job.title}</h1>
      <h3>{job.company}</h3>

      <p>📍 {job.location}</p>
      <p>💰 {job.salary}</p>
      <p>Job type: {job.type}</p>

      <h3>Job Description</h3>
      <p>{job.description}</p>

      <Link to={`/apply/${job.id}`} className="primary-btn">
        Apply Now
      </Link>
    </section>
  );
}

export default JobDetails;