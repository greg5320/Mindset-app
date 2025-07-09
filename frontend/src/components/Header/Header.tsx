"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import "./Header.css"

const Header = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const sectionOrder = [
      "hero",
      "courses",
      "learning-process",
      "prices",
      "data-form",
      "footer"
    ];
    const sections = sectionOrder.map((key) => ({
      key,
      el: document.getElementById(key)
    }));

    const handleScroll = () => {
      if (pathname !== "/") {
        return
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        setActiveSection("footer");
        return;
      }

      let currentSection = null

      for (const { key, el: section } of sections) {
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 120) {
          currentSection = key;
          break;
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    document.body.style.overflow = !isMenuOpen ? "hidden" : ""
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    document.body.style.overflow = ""
  }

  const handleTrialClick = () => {
    const dataFormSection = document.getElementById("data-form")
    if (dataFormSection) {
      dataFormSection.scrollIntoView({ behavior: "smooth" })
    }
    if (isMenuOpen) {
      closeMenu()
    }
  }

  const isProgramPage = pathname === "/program"
  const isInfoPage = pathname === "/info"

  return (
    <>
      <header className="header">
        <div className="header__container">
          <div className="header__content">
            <a href="/" className="header__logo">
              <div className="logo__inner">
                <picture>
                  <source media="(max-width: 768px)" srcSet="mindsetLogoBig.png" />
                  <img src="mindsetLogoSmall.png" alt="Logo" />
                </picture>
              </div>
            </a>

            <nav className="header__nav">
              <a
                href="/#courses"
                className={`nav__link ${pathname === "/" && activeSection === "courses" ? "active" : ""}`}
              >
                Курсы
              </a>
              <a
                href="/#learning-process"
                className={`nav__link ${pathname === "/" && activeSection === "learning-process" ? "active" : ""}`}
              >
                Процесс обучения
              </a>
              <a
                href="/#prices"
                className={`nav__link ${pathname === "/" && activeSection === "prices" ? "active" : ""}`}
              >
                Услуги и цены
              </a>
              <a
                href="/#data-form"
                className={`nav__link ${pathname === "/" && activeSection === "data-form" ? "active" : ""}`}
              >
                Заявки
              </a>
              <a
                href="/#footer"
                className={`nav__link ${pathname === "/" && activeSection === "footer" ? "active" : ""}`}
              >
                Контакты
              </a>
              <a href="/info" className={`nav__link ${isInfoPage ? "active" : ""}`}>
                Сведения об организации
              </a>
            </nav>

            <button className="header__cta" onClick={handleTrialClick}>
              ПРОБНОЕ ЗАНЯТИЕ
            </button>
            <button className="header__menu-button" onClick={toggleMenu}>
              <span className={`header__menu-icon ${isMenuOpen ? "open" : ""}`}></span>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${isMenuOpen ? "mobile-menu--open" : ""}`}>
        <button className="mobile-menu__close" onClick={closeMenu}>
          ×
        </button>
        <div className="mobile-menu__content">
          <div className="mobile-menu__logo">
            <img src="mindsetLogoBig.png" alt="Mindset Logo" />
          </div>
          <nav className="mobile-menu__nav">
            <a href="/#courses" onClick={closeMenu}>
              Курсы
            </a>
            <a href="/#learning-process" onClick={closeMenu}>
              Процесс обучения
            </a>
            <a href="/#prices" onClick={closeMenu}>
              Услуги и цены
            </a>
            <a href="/#data-form" onClick={closeMenu}>
              Заявки
            </a>
            <a href="/#footer" onClick={closeMenu}>
              Контакты
            </a>
            <a href="/info" onClick={closeMenu} className={isInfoPage ? "active" : ""}>
              Сведения об организации
            </a>
          </nav>
          <button className="mobile-menu__cta" onClick={handleTrialClick}>
            ПРОБНОЕ ЗАНЯТИЕ
          </button>
          <div className="mobile-menu__contacts">
            <h3>Связаться с нами:</h3>
            <a href="mailto:mindsetstudy@yandex.ru">mindsetstudy@yandex.ru</a>
            <a href="tel:+78005553535">+7 (800) 555-35-35</a>
          </div>
          <div className="mobile-menu__social">
            <h3>Ссылки на наши соцсети:</h3>
            <div className="mobile-menu__social-links">
              <a href="#" className="mobile-menu__social-link"></a>
              <a href="#" className="mobile-menu__social-link"></a>
              <a href="#" className="mobile-menu__social-link"></a>
              <a href="#" className="mobile-menu__social-link"></a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
