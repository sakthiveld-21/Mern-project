import { Link } from "react-router-dom";
import jobs from "../Data.js";
import JobCard from "../components/JobCard";

function Home() {
  return (
    <>
      <section className="hero">
        <h1>Find Your Dream Job</h1>
        <p>
          Discover opportunities and take the next step in your career.
        </p>

        <Link to="/jobs" className="primary-btn">
          Explore Jobs
        </Link>
      </section>

      <section className="section">
        <h2>Latest Jobs</h2>

        <div className="job-grid">
          {jobs.slice(0, 3).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;    