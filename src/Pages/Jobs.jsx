import { useState } from "react";
import jobs from "../Data";
import JobCard from "../components/JobCard";

function Jobs() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredJobs = jobs.filter((job) => {
    const text = `${job.title} ${job.company} ${job.location}`;

    return (
      text.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || job.category === category)
    );
  });

  return (
    <section className="section">
      <h1>Explore Jobs</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search jobs, companies, locations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Full Stack">Full Stack</option>
        </select>
      </div>

      <div className="job-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <p>No jobs found. Try another search.</p>
        )}
      </div>
    </section>
  );
}

export default Jobs;