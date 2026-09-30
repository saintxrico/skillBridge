const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Message sent!")
  }

  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <h1 className="mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea className="form-control" rows="4" required />
        </div>
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
    </div>
  )
}

export default ContactUs