import { useEffect, useState } from "react"

const useFetch = (url) => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    const loadJobs = async () => {
      setLoading(true)
      setError("")

      try {
        const res = await fetch(url, { signal: controller.signal })

        if (!res.ok) {
          throw new Error(`Server responded with ${res.status} ${res.statusText}`)
        }

        let data
        try {
          data = await res.json()
        } catch {
          throw new Error("Received an invalid response from the server")
        }

        if (!Array.isArray(data)) {
          throw new Error("Unexpected data format received")
        }

        setJobs(data)
      } catch (err) {
        if (err.name === "AbortError") return // component unmounted, ignore

        console.error("Failed to load jobs:", err)

        setError(
          err instanceof TypeError
            ? "Could not connect to the server. Is json-server running?"
            : err.message
        )
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadJobs()

    return () => controller.abort()
  }, [url, attempt])

  const retry = () => setAttempt((a) => a + 1)

  return { jobs, loading, error, retry }
}

export default useFetch