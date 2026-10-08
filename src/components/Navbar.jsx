import { useEffect, useRef, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"

const linkClass = ({ isActive }) => "nav-link" + (isActive ? " active" : "")

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
/* Mobile: menu flows inline so it pushes content down instead of overlapping it */
.get-started-wrap .get-started-menu {
  position: static;
  margin-top: 0.4rem;
  min-width: 14rem;
  z-index: 1050;
}
/* Desktop: floating menu anchored to the right edge of the button */
@media (min-width: 992px) {
  .get-started-wrap .get-started-menu {
    position: absolute;
    top: calc(100% + 0.4rem);
    left: auto;
    right: 0;
    margin-top: 0;
  }
}
`

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false) // mobile collapse
  const [menuOpen, setMenuOpen] = useState(false) // "Get started" dropdown
  const menuRef = useRef(null)
  const buttonRef = useRef(null)
  const location = useLocation()

  // Close everything whenever the route changes
  useEffect(() => {
    setNavOpen(false)
    setMenuOpen(false)
  }, [location.pathname])

  // Close the dropdown on outside click or Escape
  useEffect(() => {
    if (!menuOpen) return

    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener("mousedown", handleClick)
    document.addEventListener("keydown", handleKey)
    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("keydown", handleKey)
    }
  }, [menuOpen])

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary p-3">
      <style>{styles}</style>

      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          skill<span className="text-primary">Bridge</span>
        </Link>

        {/* Controlled by React state, so it works without Bootstrap's JS bundle */}
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={navOpen}
          aria-label="Toggle navigation"
          onClick={() => setNavOpen((o) => !o)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className={"collapse navbar-collapse" + (navOpen ? " show" : "")}
          id="navbarNav"
        >
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
              ref={buttonRef}
              type="button"
              className="btn get-started"
              aria-haspopup="true"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              Get started <span aria-hidden="true">&#9662;</span>
            </button>

            {menuOpen && (
              <ul className="dropdown-menu show get-started-menu shadow-sm">
                <li>
                  <Link className="dropdown-item" to="/signup">
                    <span className="fw-semibold d-block">Create an account</span>
                    <small className="text-body-secondary">New to SkillBridge</small>
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/login">
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

export default Navbar
