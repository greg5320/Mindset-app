"use client"
import type { FC } from "react"
import "./Footer.css"

interface FooterProps {
    id?: string;
  }
  
  const Footer: FC<FooterProps> = ({ id }) => {
  return (
    <footer className="footer" id={id}>
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__logo">
            <img
              src="mindsetLogoBig.png"
              alt="Mindset Logo"
              className="footer__logo-image"
            />
          </div>

          <div className="footer__contacts">
            <h3 className="footer__subtitle">Связаться с нами:</h3>
            <div className="footer__social-links"></div>
            <a href="mailto:mindsetstudy@yandex.ru" className="footer__link">
              mindsetstudy@yandex.ru
            </a>
            <a href="tel:+78005553535" className="footer__link">
              +7 (800) 555-35-35
            </a>
          </div>

          <div className="footer__social">
            <h3 className="footer__subtitle">Ссылки на наши соцсети:</h3>
            <div className="footer__social-links">
              <a href="#" className="footer__social-link"></a>
              <a href="#" className="footer__social-link"></a>
              <a href="#" className="footer__social-link"></a>
              <a href="#" className="footer__social-link"></a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__legal">
          <p className="footer__legal-text">ИНН 772841744929</p>
            
            <a href="#" className="footer__legal-link">
              Политика конфиденциальности
            </a>
            <p className="footer__legal-text">ОГРНИП 324774600735749</p>
            <a href="#" className="footer__legal-link">
            Договор оферты
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

