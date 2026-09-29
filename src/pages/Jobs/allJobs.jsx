const jobs = [
  { id: 1, title: "Frontend Developer", company: "Acme Ltd", location: "Nairobi", type: "Full-time" },
  { id: 2, title: "Backend Developer", company: "Tech Hub", location: "Remote", type: "Contract" },
  { id: 3, title: "UI/UX Designer", company: "Creative Co", location: "Mombasa", type: "Part-time" },
]

const AllJobs = () => {
  return (
    <div className="container py-5">
      <h1 className="mb-4">All Jobs</h1>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllJobs
