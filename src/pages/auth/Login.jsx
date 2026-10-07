import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(
        `http://localhost:3000/users?email=${encodeURIComponent(form.email)}`
      )

      if (!response.ok) throw new Error("Request failed")

      const users = await response.json()
      const user = users.find((u) => u.password === form.password)

      if (!user) {
        toast.error("Wrong email or password.")
        return
      }

      // Remember who is logged in (without the password)
      const { password, ...safeUser } = user
      localStorage.setItem("user", JSON.stringify(safeUser))

      toast.success(`Welcome back, ${user.name}!`)
      navigate("/")
    } catch (error) {
      console.error("Error:", error)
      toast.error("Could not log you in. Please try again.")
    }
  }

  return (
    <div className="container py-5" style={{ maxWidth: 950 }}>
      <div className="row g-4 align-items-stretch">
        {/* Company description box */}
        <div className="col-md-5 order-md-2">
          <div className="bg-primary text-white rounded p-4 h-100 d-flex flex-column justify-content-center">
            <h2 className="h4 mb-3">Welcome back</h2>
            <p>
              We connect talented job seekers with employers who are looking
              for the right people. Log in to pick up where you left off,
              whether you are searching for your next role or building your
              team.
            </p>
            <ul className="ps-3 mb-0">
              <li>Thousands of verified job listings</li>
              <li>Direct contact with hiring managers</li>
              <li>Track your applications in one place</li>
            </ul>
          </div>
        </div>

        {/* Login form */}
        <div className="col-md-7 order-md-1">
          <div className="border rounded shadow-sm p-4 h-100">
            <h1 className="mb-1">Log in</h1>
            <p className="text-muted mb-4">
              Enter your details to access your account.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-lg"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-lg"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-100">
                Log in
              </button>
            </form>

            <p className="mt-4 mb-0 text-center">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login