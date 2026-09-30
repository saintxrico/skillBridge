import { useState, useEffect } from "react";

const AllJobs = () => {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    console.log("useEffect ran");

    fetch("http://localhost:3000/jobs")
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
      })
      .catch((error) => {
        console.log("Failed to fetch jobs:", error);
      });

  }, []);

  return (
    <div className="container py-5">

      <h1>All Jobs</h1>

      {jobs.map((job) => (
        <div key={job.id} className="mb-4">

          <h2>{job.jobTitle}</h2>

          <p>{job.companyName}</p>

          <p>{job.jobDescription}</p>

          <p>{job.location}</p>

          <p>{job.discretion}</p>

        </div>
      ))}

    </div>
  );
};

export default AllJobs;