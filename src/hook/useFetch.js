import { useEffect, useState } from "react"

const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    const load = async () => {
      setLoading(true)
      setError("")

      try {
        const res = await fetch(url, { signal: controller.signal })

        if (!res.ok) {
          throw new Error(`Server responded with ${res.status} ${res.statusText}`)
        }

        let json
        try {
          json = await res.json()
        } catch {
          throw new Error("Received an invalid response from the server")
        }

        setData(json)
      } catch (err) {
        if (err.name === "AbortError") return // component unmounted, ignore

        console.error("Failed to load data:", err)

        setError(
          err instanceof TypeError
            ? "Could not connect to the server. Is json-server running?"
            : err.message
        )
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    load()

    return () => controller.abort()
  }, [url, attempt])

  const retry = () => setAttempt((a) => a + 1)

  return { data, loading, error, retry }
}

export default useFetch;