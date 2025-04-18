"use client"
import type { FC } from "react"
import "./Hero.css"

interface HeroProps {
  id?: string
}

const Hero: FC<HeroProps> = ({ id }) => {
  const handleEnrollClick = () => {
    const dataFormSection = document.getElementById("data-form")
    if (dataFormSection) {
      dataFormSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="hero" id={id}>
      <div className="hero__container">
        <div className="hero__content">
          <h1 className="hero__title">
            ДОБРО ПОЖАЛОВАТЬ
            <br />В ОНЛАЙН-ШКОЛУ MINDSET
          </h1>

          <p className="hero__text">
            Мы рады предложить вам уникальную образовательную платформу,
            <br />
            сочетающую высококачественное обучение математике, английскому языку
            <br />и внеучебную деятельность
          </p>

          <p className="hero__text_less_bold">
            Наша школа разработана для тех, кто стремится к успеху
            <br />и ценит индивидуальный подход в обучении
          </p>

          <button className="hero__cta" onClick={handleEnrollClick}>
            ЗАПИСАТЬСЯ НА КУРС
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero

