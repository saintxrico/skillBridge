import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home/home"
import AllJobs from "./pages/Jobs/allJobs"
import About from "./pages/About/about"
import Contact from "./pages/Contact/contact"
import JobDetails from "./pages/JobDetails"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<AllJobs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobdetails/:id" element={<JobDetails />} /> 
      </Routes>
      <Footer />
    </div>
  )
}

export default App