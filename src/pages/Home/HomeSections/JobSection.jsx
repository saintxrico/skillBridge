import useFetch from "../../../hook/useFetch"
import JobCards from "../../../components/jobCards"

const JOBS_URL = "http://localhost:3000/jobs"

const JobSection = () => {
  const { jobs, loading, error, retry } = useFetch(JOBS_URL)

  return (
    <div className="container my-2">
      <h4 className="text-center">
        Latest <span className="border-bottom border-3 border-primary p-1">Job</span> Vacancies
      </h4>
      <p className="text-muted text-center">
        We have a variety of job opportunities you can choose from, click on one to apply.
      </p>

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

      {!loading && !error && jobs.length > 0 && <JobCards allJobs={jobs} />}
    </div>
  )
}

export default JobSection