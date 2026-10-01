import { Link } from "react-router-dom"
import useFetch from "../../hook/useFetch"

const JOBS_URL = "http://localhost:3000/jobs"

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
            <div className="col-md-4 mb-4" key={job.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
                  <p className="card-text mb-1">{job.location}</p>
                  <span className="badge bg-primary">{job.type}</span>
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
