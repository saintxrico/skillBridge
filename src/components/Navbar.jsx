import { Link, NavLink } from "react-router-dom"

const linkClass = ({ isActive }) => "nav-link" + (isActive ? " active" : "")

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary p-3">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          skill<span className="text-primary">Bridge</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className={linkClass} to="/" end>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={linkClass} to="/jobs">Jobs</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={linkClass} to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={linkClass} to="/contact">Contact Us</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
