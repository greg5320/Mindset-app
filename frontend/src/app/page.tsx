"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header/Header"
import Hero from "@/components/Hero/Hero"
import Courses from "@/components/Courses/Courses"
import LearningProcess from "@/components/LearningProcess/LearningProcess"
import Pricing from "@/components/Pricing/Pricing"
import License from "@/components/License/License"
import DataForm from "@/components/DataForm/DataForm"
import Footer from "@/components/Footer/Footer"

export default function Home() {
  const [openPackageId, setOpenPackageId] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (openPackageId) {
      const timer = setTimeout(() => setOpenPackageId(undefined), 500) 
      return () => clearTimeout(timer)
    }
  }, [openPackageId])

  const handleTrialClick = () => {
    const pricingSection = document.getElementById("pricing")
    setOpenPackageId(undefined)
    pricingSection?.scrollIntoView({ behavior: "smooth" })
  }

  const handleMoreClick = (packageId: string) => {
    setOpenPackageId(packageId)
    const pricingSection = document.getElementById("pricing")
    pricingSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main>
      <Header />
      <Hero id="hero" />
      <Courses id="courses" onTrialClick={handleTrialClick} onMoreClick={handleMoreClick} />
      <LearningProcess id="learning-process" />
      <Pricing id="prices" openPackageId={openPackageId} />
      <License />
      <DataForm id="data-form"/>
      <Footer id="footer" />
    </main>
  )
}

