import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const JobSeeker = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role: "jobseeker" }),
      })

      if (!response.ok) throw new Error("Request failed")

      toast.success("Account created. Please log in.")
      navigate("/login")
    } catch (error) {
      console.error("Error:", error)
      toast.error("Could not create your account. Please try again.")
    }
  }

  return (
    <div className="container py-5" style={{ maxWidth: 950 }}>
      <div className="row g-4 align-items-stretch">
        {/* Company description box */}
        <div className="col-md-5 order-md-2">
          <div className="bg-primary text-white rounded p-4 h-100">
            <h2 className="h4 mb-3">About Our Company</h2>
            <p>
              We connect talented job seekers with employers who are looking
              for the right people. Whether you are starting your career or
              taking the next step, we make finding your next opportunity
              simple and fast.
            </p>
            <ul className="ps-3 mb-0">
              <li>Thousands of verified job listings</li>
              <li>Direct contact with hiring managers</li>
              <li>Free to create an account and apply</li>
            </ul>
          </div>
        </div>

        {/* Sign up form */}
        <div className="col-md-7 order-md-1">
          <h1 className="mb-4">Sign up as a job seeker</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                value={form.phone}
                onChange={handleChange}
                placeholder="+254 700 000000"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Sign up
            </button>
          </form>

          <p className="mt-3 text-center">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
          <p className="text-center">
            Hiring instead? <Link to="/employer">Sign up as an employer</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default JobSeeker
