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
    <div className="container py-5" style={{ maxWidth: 450 }}>
      <h1 className="mb-4">Log in</h1>

      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary w-100">Log in</button>
      </form>

      <p className="mt-3 text-center">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  )
}

export default Login