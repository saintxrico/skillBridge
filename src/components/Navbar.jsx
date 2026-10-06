import { useEffect, useRef, useState } from "react"
import { Link, NavLink } from "react-router-dom"

const linkClass = ({ isActive }) => "nav-link" + (isActive ? " active" : "")

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  // Close the menu when clicking outside it or pressing Escape
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)
    }
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    document.addEventListener("keydown", handleKey)
    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("keydown", handleKey)
    }
  }, [])

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary p-3">
      <style>{styles}</style>

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

          <div className="get-started-wrap mt-3 mt-lg-0" ref={menuRef}>
            <button
              type="button"
              className="btn get-started"
              aria-haspopup="true"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              Get started <span aria-hidden="true">&#9662;</span>
            </button>

            {open && (
              <ul className="dropdown-menu show get-started-menu shadow-sm">
                <li>
                  <Link className="dropdown-item" to="/signup" onClick={() => setOpen(false)}>
                    <span className="fw-semibold d-block">Create an account</span>
                    <small className="text-body-secondary">New to SkillBridge</small>
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/login" onClick={() => setOpen(false)}>
                    <span className="fw-semibold d-block">Log in</span>
                    <small className="text-body-secondary">I already have an account</small>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

const styles = `
.get-started-wrap { position: relative; }
.get-started {
  background: #0f7b6c;
  color: #fff;
  font-weight: 600;
  border-radius: 10px;
  padding: 0.5rem 1.25rem;
}
.get-started:hover,
.get-started:focus-visible {
  background: #0a5c51;
  color: #fff;
}
.get-started-menu {
  position: absolute;
  top: calc(100% + 0.4rem);
  left: 0;
  min-width: 14rem;
  z-index: 1050;
}
@media (min-width: 992px) {
  .get-started-menu { left: auto; right: 0; }
}
`

export default Navbar