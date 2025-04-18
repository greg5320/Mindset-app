"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import "./program.css"

export default function ProgramPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Header />
      <main className="program-page">
        <div className="program-container">
          <h1 className="program-title">ПРОГРАММА ОБУЧЕНИЯ</h1>

          {loading ? (
            <div className="program-loading">
              <div className="spinner"></div>
              <p>Загрузка программы...</p>
            </div>
          ) : (
            <div className="pdf-container">
              <iframe
                src="/program.pdf#toolbar=0&navpanes=0&scrollbar=0"
                className="pdf-viewer"
                title="Программа обучения"
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
