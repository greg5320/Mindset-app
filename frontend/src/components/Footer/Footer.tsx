"use client"
import type { FC } from "react"
import "./Footer.css"
import Link from "next/link"
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
            <Link href="mailto:mindsetstudy@yandex.ru" className="footer__link-mail">
              mindsetstudy@yandex.ru
            </Link>
            <Link href="tel:+79261926309" className="footer__link-phone">
              +7 (926) 192-63-09
            </Link>
          </div>

          <div className="footer__social">
            <h3 className="footer__subtitle">Ссылки на наши соцсети:</h3>
            <div className="footer__social-links">
              <Link href="https://vk.com/schoolmindset" className="footer__social-link"></Link>
              <Link href="https://t.me/onlineschoolmindset" className="footer__social-link-tg"></Link>
              {/* <a href="#" className="footer__social-link"></a> */}
              {/* <a href="#" className="footer__social-link"></a> */}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__legal">
          <p className="footer__legal-text">ИНН 772841744929</p>
            
            <Link href="/info#policy-opd" className="footer__legal-link">
              Политика конфиденциальности
            </Link>
            <p className="footer__legal-text">ОГРНИП 324774600735749</p>
            <p  className="footer__legal-text">
            ИП Мандрик Е.А.
            </p>
            <Link href="/info#requisites" className="footer__legal-link">
              Реквизиты
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

