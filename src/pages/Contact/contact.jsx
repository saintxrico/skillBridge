import { useState } from "react"

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(form)
    alert("Message sent!")
    setForm({ name: "", email: "", phone: "", message: "" })

    fetch("http://localhost:3000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
    .then(response => response.json())
    .then(data => {
      console.log("Success:", data)
    })
    .catch((error) => {
      console.error("Error:", error)
    })
  }

  const contactInfo = [
    { title: "Our Office", detail: "Westlands, Mpaka Road" },
    { title: "Call Us", detail: "+254799737826" },
    { title: "Email Us", detail: "info@skillbridge.co.ke" },
  ]

  return (
    <div>
      <div className="container my-3">
        {/* Info cards */}
        <div className="row">
          {contactInfo.map((item) => (
            <div className="col-md-4" key={item.title}>
              <div className="card p-3 border-0 shadow-sm mb-3">
                <h5>{item.title}</h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequatur beatae blanditiis architecto non, quae nisi odit.
                </p>
                <p>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div className="py-4 mx-auto" style={{ maxWidth: 600 }}>
          <h1 className="mb-4">Contact Us</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
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
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                name="message"
                className="form-control"
                rows="4"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact