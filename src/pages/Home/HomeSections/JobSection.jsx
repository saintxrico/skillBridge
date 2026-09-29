import { useEffect, useState } from "react"
import JobCards from "../../../components/jobCards"

const JobSection = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load jobs")
        return res.json()
      })
      .then((data) => setJobs(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container my-2">
      <h4 className="text-center">
        Latest <span className="border-bottom border-3 border-primary p-1">Job</span> Vacancies
      </h4>
      <p className="text-muted text-center">
        We have a variety of job opportunities you can choose from, click on one to apply.
      </p>

      {loading && <p className="text-center">Loading jobs...</p>}
      {error && <p className="text-center text-danger">{error}. Is json-server running?</p>}
      {!loading && !error && <JobCards allJobs={jobs} />}
    </div>
  )
}

export default JobSection