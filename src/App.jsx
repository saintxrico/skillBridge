import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import Home from "./pages/Home/home"
import AllJobs from "./pages/Jobs/allJobs"
import About from "./pages/About/about"
import Contact from "./pages/Contact/contact"
import JobDetails from "./pages/JobDetails"
import { Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import JobSeeker from "./pages/auth/JobSeeker"
import Employer from "./pages/auth/Employer"
import PublicLayout from "./layout/public"

function App() {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<AllJobs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/jobdetails/:id" element={<JobDetails />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/jobseeker" element={<JobSeeker />} />
          <Route path="/employer" element={<Employer />} />

        </Route>
      </Routes>
    </div>
  )
}

export default App