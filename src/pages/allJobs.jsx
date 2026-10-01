import { Link } from "react-router-dom"
import useFetch from "../../hook/useFetch"

const JOBS_URL = "http://localhost:3000/jobs"

// "fulltime" -> "Full-time", "parttime" -> "Part-time", "contract" -> "Contract"
const TYPE_LABELS = {
  fulltime: "Full-time",
  parttime: "Part-time",
  contract: "Contract",
}

const TYPE_COLORS = {
  fulltime: "bg-primary",
  parttime: "bg-warning text-dark",
  contract: "bg-info text-dark",
}

const AllJobs = () => {
  const { data, loading, error, retry } = useFetch(JOBS_URL)

  // data is null until the fetch finishes, so fall back to an empty array
  const jobs = Array.isArray(data) ? data : []

  return (
    <div className="container py-5">
      <h1 className="mb-4">All Jobs</h1>

      {loading && <p className="text-center">Loading jobs...</p>}

      {error && (
        <div className="alert alert-danger text-center" role="alert">
          <p className="mb-2">{error}</p>
          <button className="btn btn-outline-danger btn-sm" onClick={retry}>
            Try again
          </button>
        </div>
      )}

      {!loading && !error && jobs.length === 0 && (
        <p className="text-center text-muted">No job vacancies available right now.</p>
      )}

      {!loading && !error && jobs.length > 0 && (
        <div className="row">
          {jobs.map((job) => (
            <div className="col-md-6 col-lg-4 mb-4" key={job.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{job.jobTitle}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{job.companyName}</h6>
                  <p className="card-text mb-2">
                    <i className="bi bi-geo-alt me-1"></i>
                    {job.location}
                  </p>
                  <span className={`badge ${TYPE_COLORS[job.discretion] || "bg-secondary"} mb-3`}>
                    {TYPE_LABELS[job.discretion] || job.discretion}
                  </span>
                  <p className="card-text">{job.jobDescription}</p>
                </div>
                <div className="card-footer bg-transparent border-0 pb-3">
                  <Link
                    to={`/jobdetails/${job.id}`}
                    className="btn btn-outline-primary btn-sm w-100"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AllJobs