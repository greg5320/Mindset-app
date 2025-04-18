import { useState, useEffect } from "react"

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    const sections = document.querySelectorAll("section[id], footer")

    const options = {
      threshold: 0.3,
      rootMargin: "-50% 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.tagName.toLowerCase() === "footer") {
            setActiveSection("contacts")
          } else {
            setActiveSection(entry.target.id)
          }
        }
      })
    }, options)

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return activeSection
}

