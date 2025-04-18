"use client"
import { useState, type FC, type FormEvent } from "react"
import type React from "react"
import axios from "axios"

import "./DataForm.css"

interface FormData {
  first_name: string
  last_name: string
  patronymic: string
  phone_number: string
}

interface DataFormProps {
  id?: string;
}

const DataForm: FC<DataFormProps> = ({ id }) => {
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    patronymic: "",
    phone_number: "",
  })

  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Введите фамилию"
    }
    if (!formData.first_name.trim()) {
      newErrors.first_name = "Введите имя"
    }
    if (!formData.patronymic.trim()) {
      newErrors.patronymic = "Введите отчество"
    }
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Введите номер телефона"
    } else if (!/^\+?[78]\d{10}$/.test(formData.phone_number.replace(/\D/g, ""))) {
      newErrors.phone_number = "Введите корректный номер телефона"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
  
    setIsLoading(true)
    try {
      const rawPhoneNumber = formData.phone_number.replace(/\D/g, "") 
  
      const response = await axios.post("/api/clients", {
        last_name: formData.last_name,
        first_name: formData.first_name,
        patronymic: formData.patronymic,
        phone_number: `+${rawPhoneNumber}`, 
      }, {
        headers: { "Content-Type": "application/json" },
      })
  
      console.log("Ответ сервера:", response.data)
      alert("Заявка успешно отправлена!")
  
      setFormData({ first_name: "", last_name: "", patronymic: "", phone_number: "" })
    } catch (error: any) {
      if (error.response) {
        console.error("Ошибка от сервера:", error.response.data)
        alert(`Ошибка: ${JSON.stringify(error.response.data)}`)
      } else {
        console.error("Ошибка сети:", error.message)
        alert("Ошибка сети, попробуйте позже.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {

  let value = e.target.value.replace(/\D/g, "") 

  if (e.target.value === "" || value === "") {
    setFormData({ ...formData, phone_number: "" }) 
    return
  }

  if (value.length === 1 && value.startsWith("8")) {
    value = "7"
  }

  if (value.length > 11) {
    value = value.slice(0, 11) 
  }

  let formattedValue = "+7"
  if (value.length > 1) formattedValue += ` (${value.slice(1, 4)}`
  if (value.length > 4) formattedValue += `) ${value.slice(4, 7)}`
  if (value.length > 7) formattedValue += `-${value.slice(7, 9)}`
  if (value.length > 9) formattedValue += `-${value.slice(9, 11)}`

  setFormData({ ...formData, phone_number: formattedValue })
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
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Отправка..." : "ОТПРАВИТЬ ЗАЯВКУ"}
          </button>
        </form>
      </div>
    </section>
  )
}

export default DataForm
