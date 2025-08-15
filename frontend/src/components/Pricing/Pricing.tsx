"use client"
import { type FC, useState, useEffect } from "react"
import "./Pricing.css"

interface PricingTier {
  title: string
  price: number
  oldPrice?: number
  duration: string
  featured?: boolean
}

interface PricingPackage {
  id: string
  title: string
  color: "orange" | "blue"
  tiers: PricingTier[]
}

interface PricingProps {
  id?: string
  openPackageId?: string | null
}

const pricingData: PricingPackage[] = [
  {
    id: "basic",
    title: "ПАКЕТ << ОДНОПРЕДМЕТНЫЙ >>",
    color: "orange",
    tiers: [
      {
        title: "Малый",
        price: 6990,
        duration: "8 занятий",
      },
      {
        title: "Средний",
        price: 19990,
        oldPrice: 20990,
        duration: "24 занятия",
        featured: true,
      },
      {
        title: "Большой",
        price: 38990,
        oldPrice: 41990,
        duration: "48 занятий",
      },
    ],
  },
  {
    id: "advanced",
    title: "ПАКЕТ << ДВУПРЕДМЕТНЫЙ >>",
    color: "blue",
    tiers: [
      {
        title: "Малый",
        price: 12990,
        oldPrice:13990,
        duration: "8 занятий X2",
      },
      {
        title: "Средний",
        price: 36990,
        oldPrice: 39990,
        duration: "24 занятия X2",
        featured: true,
      },
      {
        title: "Большой",
        price: 71990,
        oldPrice: 77990,
        duration: "48 занятий X2",
      },
    ],
  },
]

const Pricing: FC<PricingProps> = ({ id, openPackageId }) => {
  const [openPackage, setOpenPackage] = useState<string | null>(null)

  useEffect(() => {
    if (openPackageId) {
      setOpenPackage(openPackageId)
      setTimeout(() => {
        const packageElement = document.getElementById(openPackageId)
        packageElement?.scrollIntoView({ behavior: "smooth" })
      }, 300)
    }
  }, [openPackageId])

  const togglePackage = (pkgId: string) => {
    setOpenPackage(openPackage === pkgId ? null : pkgId)
  }

  const handleRequestClick = () => {
    const dataFormSection = document.getElementById("data-form")
    if (dataFormSection) {
      dataFormSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="pricing" id={id}>
      <div className="pricing__container">
        <h2 className="pricing__title">УСЛУГИ И ЦЕНЫ</h2>

        {pricingData.map((pkg) => (
          <div key={pkg.id} id={pkg.id} className="package">
            <div className="package__header" onClick={() => togglePackage(pkg.id)}>
              <h3 className="package__title">{pkg.title}</h3>
              <span className={`package__arrow ${openPackage === pkg.id ? "package__arrow--open" : ""}`}>▼</span>
            </div>

            <div className={`package__content ${openPackage === pkg.id ? "package__content--open" : ""}`}>
              <div className="pricing-cards">
                {pkg.tiers.map((tier, index) => (
                  <div
                    key={index}
                    className={`pricing-card pricing-card--${pkg.color} ${tier.featured ? "pricing-card--featured" : ""}`}
                  >
                    <div className="pricing-card__price-wrapper">
                      <h4 className="pricing-card__title">{tier.title}</h4>
                      <div className="pricing-card__price">{tier.price.toLocaleString("ru-RU")}₽</div>
                      {tier.oldPrice && (
                        <div className="pricing-card__old-price">{tier.oldPrice.toLocaleString("ru-RU")}₽</div>
                      )}
                      <div className="pricing-card__duration">{tier.duration}</div>
                    </div>
                    <button className="pricing-card__button" onClick={handleRequestClick}>
                      ОСТАВИТЬ ЗАЯВКУ
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Pricing

