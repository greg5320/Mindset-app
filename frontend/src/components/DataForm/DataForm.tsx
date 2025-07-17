"use client"
import { useState, type FC, type FormEvent } from "react"
import axios from "axios"
import "./DataForm.css"

interface FormData {
  first_name: string
  last_name: string
  patronymic: string
  phone_number: string
  agreement: boolean
}

type FormErrors = Partial<Record<keyof FormData, string>>

interface DataFormProps {
  id?: string
}

const DataForm: FC<DataFormProps> = ({ id }) => {
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    patronymic: "",
    phone_number: "",
    agreement: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.last_name.trim()) newErrors.last_name = "Введите фамилию"
    if (!formData.first_name.trim()) newErrors.first_name = "Введите имя"
    if (!formData.patronymic.trim()) newErrors.patronymic = "Введите отчество"
    const rawPhone = formData.phone_number.replace(/\D/g, "")
    if (!rawPhone) newErrors.phone_number = "Введите номер телефона"
    else if (!/^[78]\d{10}$/.test(rawPhone)) newErrors.phone_number = "Введите корректный номер телефона"

    if (!formData.agreement) newErrors.agreement = "Необходимо согласиться с обработкой персональных данных"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsLoading(true)
    try {
      const raw = formData.phone_number.replace(/\D/g, "")
      await axios.post(
        "/api/students",
        { ...formData, phone_number: `+${raw}` },
        { headers: { "Content-Type": "application/json" } }
      )
      alert("Заявка успешно отправлена!")
      setFormData({ first_name: "", last_name: "", patronymic: "", phone_number: "", agreement: false })
      setErrors({})
    } catch (error: any) {
      const msg = error.response?.data || error.message
      alert(`Ошибка: ${JSON.stringify(msg)}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")
    if (!value) { setFormData({ ...formData, phone_number: "" }); return }
    if (value.length === 1 && value.startsWith("8")) value = "7"
    if (value.length > 11) value = value.slice(0, 11)
    let formatted = "+7"
    if (value.length > 1) formatted += ` (${value.slice(1,4)}`
    if (value.length > 4) formatted += `) ${value.slice(4,7)}`
    if (value.length > 7) formatted += `-${value.slice(7,9)}`
    if (value.length > 9) formatted += `-${value.slice(9,11)}`
    setFormData({ ...formData, phone_number: formatted })
  }

  return (
    <section className="data-form" id={id}>
      <div className="data-form__container">
        <h2 className="data-form__title">ФОРМА ДЛЯ ЗАЯВОК</h2>
        <form className="data-form__form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Фамилия*"
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              className={errors.last_name ? "error" : ""}
            />
            {errors.last_name && <span className="error-message">{errors.last_name}</span>}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Имя*"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              className={errors.first_name ? "error" : ""}
            />
            {errors.first_name && <span className="error-message">{errors.first_name}</span>}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Отчество*"
              value={formData.patronymic}
              onChange={(e) => setFormData({ ...formData, patronymic: e.target.value })}
              className={errors.patronymic ? "error" : ""}
            />
            {errors.patronymic && <span className="error-message">{errors.patronymic}</span>}
          </div>
          <div className="form-group">
            <input
              type="tel"
              placeholder="Номер телефона*"
              value={formData.phone_number}
              onChange={handlePhoneInput}
              className={errors.phone_number ? "error" : ""}
            />
            {errors.phone_number && <span className="error-message">{errors.phone_number}</span>}
          </div>
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="agreement"
              checked={formData.agreement}
              onChange={(e) => setFormData({ ...formData, agreement: e.target.checked })}
            />
            <label htmlFor="agreement">
              Я соглашаюсь на обработку <a href="/info" className="link">персональных данных</a>
            </label>
            {errors.agreement && <span className="error-message">{errors.agreement}</span>}
          </div>
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Отправка..." : "ОТПРАВИТЬ ЗАЯВКУ"}
          </button>
        </form>
      </div>
    </section>
  )
}

export default DataForm
