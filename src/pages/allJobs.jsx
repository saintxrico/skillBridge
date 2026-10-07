import { useState, useEffect } from "react";
import JobCards from "../components/JobCards";
import useFetch from "../hook/useFetch";

const AllJobs = () => {

    const { allData: jobs, loading, error } = useFetch("http://localhost:3000/jobs");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
        const allJobs = Array.isArray(jobs) ? jobs : [];
        const term = searchTerm.trim().toLowerCase();
        const place = searchLocation.trim().toLowerCase();

        setFilteredJobs(
            allJobs.filter((job) => {
                const matchesTerm =
                    job.jobTitle?.toLowerCase().includes(term) ||
                    job.companyName?.toLowerCase().includes(term);
                const matchesLocation = job.location?.toLowerCase().includes(place);
                return matchesTerm && matchesLocation;
            })
        );
    }, [searchTerm, searchLocation, jobs]);

    return (
        <div className="container my-3">
            {/* Search bar: inline styles so nothing can hide it */}
            <div
                style={{
                    background: "#0d6efd",
                    color: "#fff",
                    padding: "16px",
                    borderRadius: "8px",
                    marginBottom: "24px",
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                }}
            >
                <input
                    type="text"
                    placeholder="Job title or company, e.g. Developer"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ flex: "1 1 250px", padding: "10px", color: "#000", background: "#fff" }}
                />
                <input
                    type="text"
                    placeholder="Location, e.g. Nairobi or Remote"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    style={{ flex: "1 1 250px", padding: "10px", color: "#000", background: "#fff" }}
                />
            </div>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>Error: {String(error)}</p>}
            {!loading && !error && filteredJobs.length === 0 && (
                <p>No jobs match your search.</p>
            )}
            {!loading && !error && <JobCards allJobs={filteredJobs} />}
        </div>
    );
}

export default AllJobs;