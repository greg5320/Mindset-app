"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import "./Header.css"
import Link from "next/link"

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
    closeMenu()
    if (pathname !== "/") {
      window.location.href = "/#data-form"
    } else {
      const dataFormSection = document.getElementById("data-form")
      if (dataFormSection) {
        dataFormSection.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const isInfoPage = pathname === "/info"
  const isRatingPage = pathname === "/rating"

  return (
    <>
      <header className="header">
        <div className="header__container">
          <div className="header__content">
            <Link href="/" className="header__logo">
              <div className="logo__inner">
                <picture>
                  <source media="(max-width: 768px)" srcSet="mindsetLogoBig.png" />
                  <img src="mindsetLogoSmall.png" alt="Logo" />
                </picture>
              </div>
            </Link>

            <nav className="header__nav">
              <Link
                href="/#courses"
                className={`nav__link ${pathname === "/" && activeSection === "courses" ? "active" : ""}`}
              >
                Курсы
              </Link>
              <Link
                href="/#learning-process"
                className={`nav__link ${pathname === "/" && activeSection === "learning-process" ? "active" : ""}`}
              >
                Процесс обучения
              </Link>
              <Link
                href="/#prices"
                className={`nav__link ${pathname === "/" && activeSection === "prices" ? "active" : ""}`}
              >
                Услуги и цены
              </Link>
              <Link
                href="/#data-form"
                className={`nav__link ${pathname === "/" && activeSection === "data-form" ? "active" : ""}`}
              >
                Заявки
              </Link>
              <Link
                href="/#footer"
                className={`nav__link ${pathname === "/" && activeSection === "footer" ? "active" : ""}`}
              >
                Контакты
              </Link>
              <Link href="/rating" className={`nav__link ${isRatingPage ? "active" : ""}`}>
                Рейтинг
              </Link>
              <Link href="/info" className={`nav__link ${isInfoPage ? "active" : ""}`}>
                Сведения об организации
              </Link>
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
            <Link href="/#courses" onClick={closeMenu}>
              Курсы
            </Link>
            <Link href="/#learning-process" onClick={closeMenu}>
              Процесс обучения
            </Link>
            <Link href="/#prices" onClick={closeMenu}>
              Услуги и цены
            </Link>
            <Link href="/#data-form" onClick={closeMenu}>
              Заявки
            </Link>
            <Link href="/#footer" onClick={closeMenu}>
              Контакты
            </Link>
            <Link href="/rating" onClick={closeMenu} className={isRatingPage ? "active" : ""}>
                Рейтинг
              </Link>
            <Link href="/info" onClick={closeMenu} className={isInfoPage ? "active" : ""}>
              Сведения об организации
            </Link>
          </nav>
          <button onClick={handleTrialClick}>
              ПРОБНОЕ ЗАНЯТИЕ
            </button>
          <div className="mobile-menu__contacts">
            <h3>Связаться с нами:</h3>
            <Link href="mailto:mindsetstudy@yandex.ru">mindsetstudy@yandex.ru</Link>
            <Link href="tel:+79261926309">+7 (926) 192-63-09</Link>
          </div>
          <div className="mobile-menu__social">
            <h3>Ссылки на наши соцсети:</h3>
            <div className="mobile-menu__social-links">
            <Link href="https://vk.com/schoolmindset" className="footer__social-link"></Link>
            <Link href="https://t.me/onlineschoolmindset" className="footer__social-link-tg"></Link>
              {/* <a href="#" className="mobile-menu__social-link"></a>
              <a href="#" className="mobile-menu__social-link"></a>
              <a href="#" className="mobile-menu__social-link"></a>
              <a href="#" className="mobile-menu__social-link"></a> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
