import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const emptyForm = { name: "", email: "", phone: "", message: "" }

const contactInfo = [
  {
    title: "Our office",
    detail: "Westlands, Mpaka Road",
    note: "Drop in on weekdays, 8am to 5pm.",
    icon: "M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.500a2.500 2.500 0 0 1 0 5z",
  },
  {
    title: "Call us",
    detail: "+254799737826",
    note: "The quickest way to reach our team.",
    icon: "M6.6 10.800a15.100 15.100 0 0 0 6.600 6.600l2.200-2.200a1 1 0 0 1 1-.25c1.100.37 2.300.57 3.600.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.500a1 1 0 0 1 1 1c0 1.300.2 2.500.57 3.600a1 1 0 0 1-.25 1z",
  },
  {
    title: "Email us",
    detail: "info@skillbridge.co.ke",
    note: "We reply within one working day.",
    icon: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm8 7L4 6.500V8l8 5 8-5V6.500L12 11z",
  },
]

const Contact = () => {
  const [form, setForm] = useState(emptyForm)
  const [sending, setSending] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)

    try {
      const response = await fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!response.ok) throw new Error("Request failed")

      const data = await response.json()
      console.log("Success:", data)

      toast.success("Message sent. Taking you back home.")
      setForm(emptyForm)

      // Redirect to the home page after the toast has had a moment to show
      setTimeout(() => navigate("/"), 1500)
    } catch (error) {
      console.error("Error:", error)
      toast.error("We couldn't send your message. Please try again.")
      setSending(false)
    }
  }

  return (
    <div className="contact-page">
      <style>{styles}</style>

      <div className="container py-5">
        <button
          type="button"
          className="contact-back"
          onClick={() => navigate("/")}
        >
          &larr; Back to home
        </button>

        <header className="contact-header">
          <h1>Let's talk about your next step</h1>
          <p>
            Questions about job openings, new companies or opportunities to collaborate? We’d love to hear from you. Fill out the form and we’ll get back to you as soon as possible.
          </p>
        </header>

        <div className="row g-4 g-lg-5 align-items-start">
          {/* Info */}
          <div className="col-lg-5">
            <div className="d-flex flex-column gap-3">
              {contactInfo.map((item) => (
                <div className="contact-info" key={item.title}>
                  <span className="contact-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22">
                      <path d={item.icon} fill="currentColor" />
                    </svg>
                  </span>
                  <div>
                    <h2>{item.title}</h2>
                    <p className="contact-detail">{item.detail}</p>
                    <p className="contact-note">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="col-lg-7">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>Send us a message</h2>

              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    className="form-control"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label">Phone number</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="form-control"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="contact-submit" disabled={sending}>
                {sending ? "Sending..." : "Send message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = `
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap");

.contact-page {
  --ink: #12263a;
  --ink-soft: #52667a;
  --teal: #0f7b6c;
  --teal-dark: #0a5c51;
  --sun: #f2b134;
  --mist: #eef3f6;
  --line: #d5dfe6;
  background: var(--mist);
  color: var(--ink);
  font-family: "Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
  min-height: 100vh;
}

.contact-back {
  background: none;
  border: 0;
  padding: 0;
  margin-bottom: 2rem;
  color: var(--teal);
  font-weight: 600;
  cursor: pointer;
}
.contact-back:hover { color: var(--teal-dark); text-decoration: underline; }

.contact-header { max-width: 640px; margin-bottom: 2.5rem; }
.contact-header h1 {
  font-size: clamp(2rem, 4.5vw, 3rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
}
.contact-header p { color: var(--ink-soft); font-size: 1.1rem; line-height: 1.6; margin: 0; }

.contact-info {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.25rem 1.5rem;
  background: #fff;
  border-radius: 14px;
  border-left: 5px solid var(--sun);
}
.contact-info h2 { font-size: 1rem; font-weight: 700; margin: 0 0 0.25rem; }
.contact-detail { font-weight: 600; margin: 0 0 0.25rem; word-break: break-word; }
.contact-note { color: var(--ink-soft); font-size: 0.9rem; margin: 0; }

.contact-icon {
  flex: none;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: var(--ink);
  color: var(--sun);
}

.contact-form {
  background: #fff;
  border-radius: 18px;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  box-shadow: 0 18px 40px -24px rgba(18, 38, 58, 0.35);
}
.contact-form h2 { font-size: 1.4rem; font-weight: 700; margin-bottom: 1.5rem; }
.contact-form .form-label { font-weight: 600; font-size: 0.9rem; margin-bottom: 0.35rem; }
.contact-form .form-control {
  border: 1.5px solid var(--line);
  border-radius: 10px;
  padding: 0.7rem 0.9rem;
  color: var(--ink);
}
.contact-form .form-control:focus {
  border-color: var(--teal);
  box-shadow: 0 0 0 4px rgba(15, 123, 108, 0.15);
}

.contact-submit {
  margin-top: 1.5rem;
  width: 100%;
  border: 0;
  border-radius: 10px;
  padding: 0.85rem 1.5rem;
  background: var(--teal);
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.15s ease;
}
.contact-submit:hover:not(:disabled) { background: var(--teal-dark); }
.contact-submit:focus-visible { outline: 3px solid var(--sun); outline-offset: 2px; }
.contact-submit:disabled { opacity: 0.7; cursor: not-allowed; }

@media (min-width: 576px) {
  .contact-submit { width: auto; }
}
`

export default Contact