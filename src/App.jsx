import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Home from "./pages/Home/home"
import AllJobs from "./pages/Jobs/allJobs"
import About from "./pages/About/about"
import Contact from "./pages/Contact/contact"
import JobDetails from "./pages/JobDetails"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import JobSeeker from "./pages/auth/JobSeeker"
import Employer from "./pages/auth/Employer"
import PublicLayout from "./layout/public"

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        {/* Public routes: rendered inside the layout, so they get the Navbar and Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<AllJobs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/jobdetails/:id" element={<JobDetails />} />
        </Route>

        {/* Auth routes: standalone pages without the Navbar and Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobseeker" element={<JobSeeker />} />
        <Route path="/employer" element={<Employer />} />
      </Routes>
    </>
  )
}

export default App
