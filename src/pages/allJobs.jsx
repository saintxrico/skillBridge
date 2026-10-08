import { useEffect, useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

const API_URL = "http://localhost:3000/jobs" // json-server; change the port if yours differs
const PAGE_SIZE = 6

// "value" must match the `discretion` field in db.json
const JOB_TYPES = [
  { value: "fulltime", label: "Full-time" },
  { value: "parttime", label: "Part-time" },
  { value: "contract", label: "Contract" },
]
const typeLabel = (value) => JOB_TYPES.find((t) => t.value === value)?.label ?? value

const useJobs = () => {
  const [state, setState] = useState({ jobs: [], loading: true, error: null })

  useEffect(() => {
    const controller = new AbortController()

    fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`)
        return res.json()
      })
      .then((jobs) => setState({ jobs, loading: false, error: null }))
      .catch((err) => {
        if (err.name !== "AbortError") {
          setState({ jobs: [], loading: false, error: err.message })
        }
      })

    return () => controller.abort()
  }, [])

  return state
}

/* Builds [1, "...", 4, 5, 6, "...", 12] style page lists */
const getPageNumbers = (current, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages = [1]
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  if (start > 2) pages.push("start-ellipsis")
  for (let p = start; p <= end; p++) pages.push(p)
  if (end < total - 1) pages.push("end-ellipsis")
  pages.push(total)

  return pages
}

const Pagination = ({ currentPage, totalPages, onChange }) => {
  if (totalPages <= 1) return null

  return (
    <nav aria-label="Jobs pagination" className="mt-4">
      <ul className="pagination justify-content-center flex-wrap">
        <li className={"page-item" + (currentPage === 1 ? " disabled" : "")}>
          <button
            type="button"
            className="page-link"
            onClick={() => onChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>

        {getPageNumbers(currentPage, totalPages).map((p) =>
          typeof p === "string" ? (
            <li key={p} className="page-item disabled">
              <span className="page-link">&hellip;</span>
            </li>
          ) : (
            <li key={p} className={"page-item" + (p === currentPage ? " active" : "")}>
              <button
                type="button"
                className="page-link"
                onClick={() => onChange(p)}
                aria-current={p === currentPage ? "page" : undefined}
              >
                {p}
              </button>
            </li>
          )
        )}

        <li className={"page-item" + (currentPage === totalPages ? " disabled" : "")}>
          <button
            type="button"
            className="page-link"
            onClick={() => onChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}

const clamp = {
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
}

const AllJobs = () => {
  const { jobs, loading, error } = useJobs()

  // Filters and page live in the URL, so they survive a refresh and can be shared
  const [params, setParams] = useSearchParams()
  const locationQuery = params.get("location") ?? ""
  const type = params.get("type") ?? "all"
  const page = Math.max(1, parseInt(params.get("page"), 10) || 1)

  const updateParams = (changes, { replace = true } = {}) => {
    const next = new URLSearchParams(params)
    Object.entries(changes).forEach(([key, value]) => {
      const isEmpty = value === "" || value === "all" || value === 1 || value == null
      if (isEmpty) next.delete(key)
      else next.set(key, value)
    })
    setParams(next, { replace })
  }

  // Changing a filter always sends the user back to page 1
  const handleLocation = (e) => updateParams({ location: e.target.value, page: 1 })
  const handleType = (e) => updateParams({ type: e.target.value, page: 1 })
  const clearFilters = () => setParams({}, { replace: true })

  const filteredJobs = useMemo(() => {
    const q = locationQuery.trim().toLowerCase()
    return jobs.filter((job) => {
      const matchesLocation = !q || job.location.toLowerCase().includes(q)
      const matchesType = type === "all" || job.discretion === type
      return matchesLocation && matchesType
    })
  }, [jobs, locationQuery, type])

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages) // guards against ?page=99
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const visibleJobs = filteredJobs.slice(startIndex, startIndex + PAGE_SIZE)

  const goToPage = (n) => {
    updateParams({ page: n }, { replace: false }) // push, so the back button works
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const hasFilters = locationQuery !== "" || type !== "all"

  return (
    <div className="container py-4">
      <h1 className="h3 mb-4">Find a job</h1>

      {/* Filters */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <label htmlFor="job-location" className="form-label">Location</label>
          <input
            id="job-location"
            type="search"
            className="form-control"
            placeholder="e.g. Nairobi, Mombasa, Remote"
            value={locationQuery}
            onChange={handleLocation}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="job-type" className="form-label">Job type</label>
          <select id="job-type" className="form-select" value={type} onChange={handleType}>
            <option value="all">All types</option>
            {JOB_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <button
            type="button"
            className="btn btn-outline-secondary w-100"
            onClick={clearFilters}
            disabled={!hasFilters}
          >
            Clear filters
          </button>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <p>Loading jobs&hellip;</p>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          Could not load jobs ({error}). Check that json-server is running at {API_URL}.
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-5">
          <p className="mb-2">No jobs match your search.</p>
          <button type="button" className="btn btn-link" onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <p className="text-body-secondary" aria-live="polite">
            Showing {startIndex + 1}&ndash;{startIndex + visibleJobs.length} of {filteredJobs.length}{" "}
            {filteredJobs.length === 1 ? "job" : "jobs"}
          </p>

          <div className="row g-3">
            {visibleJobs.map((job) => (
              <div className="col-md-6 col-lg-4" key={job.id}>
                <div className="card h-100">
                  <div className="card-body d-flex flex-column">
                    <h2 className="h5 card-title">{job.jobTitle}</h2>
                    <p className="mb-1">{job.companyName}</p>
                    <p className="text-body-secondary mb-2">{job.location}</p>
                    <p className="small mb-3" style={clamp}>{job.jobDescription}</p>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <span className="badge text-bg-light border">{typeLabel(job.discretion)}</span>
                      <Link to={`/jobdetails/${job.id}`} className="btn btn-sm btn-outline-primary">
                        View details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} onChange={goToPage} />
        </>
      )}
    </div>
  )
}

export default AllJobs
