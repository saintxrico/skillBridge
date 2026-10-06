
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const JobSeeker = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
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
    <div className="container py-5" style={{ maxWidth: 450 }}>
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
        <button type="submit" className="btn btn-primary w-100">Sign up</button>
      </form>

      <p className="mt-3 text-center">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
      <p className="text-center">
        Hiring instead? <Link to="/employer">Sign up as an employer</Link>
      </p>
    </div>
  )
}

export default JobSeeker
