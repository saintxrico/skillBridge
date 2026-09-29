import { useState } from "react"

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(form) // replace with a call to your backend
    alert("Message sent!")
    setForm({ name: "", email: "", message: "" })
  }

  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <h1 className="mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea name="message" className="form-control" rows="4" value={form.message} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
    </div>
  )
}

export default ContactUs
