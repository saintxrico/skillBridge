import { Link } from "react-router-dom"

const Signup = () => {
  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <h1 className="mb-4 text-center">Sign up</h1>
      <p className="text-center mb-4">How will you use SkillBridge?</p>

      <div className="row g-3">
        <div className="col-md-6">
          <div className="card h-100 p-3 text-center">
            <h5>Job seeker</h5>
            <p>Find jobs and apply.</p>
            <Link to="/jobseeker" className="btn btn-primary mt-auto">
              Continue
            </Link>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100 p-3 text-center">
            <h5>Employer</h5>
            <p>Post jobs and hire.</p>
            <Link to="/employer" className="btn btn-primary mt-auto">
              Continue
            </Link>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  )
}

export default Signup