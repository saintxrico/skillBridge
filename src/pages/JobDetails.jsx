import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import useFetch from "../hook/useFetch"

const TYPE_LABELS = {
  fulltime: "Full-time",
  parttime: "Part-time",
  contract: "Contract",
}

const JobDetails = () => {
  const { id } = useParams()
  const [applied, setApplied] = useState(false)
  const { data: job, loading, error, retry } = useFetch(
    `http://localhost:3000/jobs/${id}`
  )

  if (loading) return <div className="container my-4 text-center">Loading...</div>

  if (error) {
    return (
      <div className="container my-4">
        <div className="alert alert-danger text-center" role="alert">
          <p className="mb-2">{error}</p>
          <button className="btn btn-outline-danger btn-sm" onClick={retry}>
            Try again
          </button>
        </div>
      </div>
    )
  }

  if (!job) return null

  const handleApply = () => {
    // TODO: replace with navigate(`/apply/${job.id}`) or an API call
    setApplied(true)
  }

  return (
    <div className="container my-4">
      <Link to="/jobs" className="text-decoration-none">&larr; Back to jobs</Link>

      <div className="row mt-3">
        {/* Left: job details */}
        <div className="col-lg-8 mb-4">
          <h2>{job.jobTitle}</h2>

          <div className="d-flex flex-wrap gap-2 my-3">
            <span className="badge text-bg-primary">{job.companyName}</span>
            <span className="badge text-bg-secondary">{job.location}</span>
            <span className="badge text-bg-info">
              {TYPE_LABELS[job.discretion] || job.discretion}
            </span>
          </div>

          <div className="mb-4">
            <h5>Description</h5>
            <p>{job.jobDescription}</p>
          </div>

          <dl className="row">
            <dt className="col-sm-3">Company</dt>
            <dd className="col-sm-9">{job.companyName}</dd>

            <dt className="col-sm-3">Location</dt>
            <dd className="col-sm-9">{job.location}</dd>

            <dt className="col-sm-3">Job type</dt>
            <dd className="col-sm-9">{TYPE_LABELS[job.discretion] || job.discretion}</dd>
          </dl>
        </div>

        {/* Right: apply card */}
        <div className="col-lg-4">
          <div className="card shadow-sm position-sticky" style={{ top: "1rem" }}>
            <div className="card-body text-center">
              <h5 className="card-title">Interested in this job?</h5>
              <p className="card-text text-muted">
                If this role looks like a good fit for you, go ahead and apply.
              </p>

              {applied ? (
                <div className="alert alert-success mb-0" role="alert">
                  Thanks! Your interest has been noted.
                </div>
              ) : (
                <button className="btn btn-primary w-100" onClick={handleApply}>
                  Apply Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetails