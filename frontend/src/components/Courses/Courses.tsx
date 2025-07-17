"use client"

import type { FC } from "react"
import "./Courses.css"

interface CourseData {
  id: number
  title: string
  items: string[]
  type: "orange" | "blue"
  packageType: string
  imageUrl: string
}

interface CoursesProps {
  id?: string
  onTrialClick: () => void
  onMoreClick: (packageId: string) => void
}

const coursesData: CourseData[] = [
  {
    id: 1,
    title: "ШКОЛЬНАЯ МАТЕМАТИКА",
    items: [
      "Простые и понятные объяснения",
      "Заполним пробелы в знаниях и поможем разобраться в сложных темах",
      "Научим решать задачи быстро и правильно",
      "Повысим уровень успеваемости и уверенности в предмете",
    ],
    type: "orange",
    packageType: "basic",
    imageUrl: "/матеш.png",
  },
  {
    id: 2,
    title: "БАЗОВЫЙ АНГЛИЙСКИЙ",
    items: [
      "Повысим уровень знания грамматики",
      "Малые группы и индивидуальный подход к каждому ученику",
      "Разговорная практика – обсуждение актуальных тем на английском языке",
      "Подходит для уровней A1 и A2",
    ],
    type: "blue",
    packageType: "basic",
    imageUrl: "/базАнгл.png",
  },
  {
    id: 3,
    title: "ПРОДВИНУТАЯ МАТЕМАТИКА",
    items: [
      "Освоение сложных математических тем",
      "Повышение скорости решения задач",
      "Углубленный уровень изучения",
      "Решение сложных математических задач",
    ],
    type: "orange",
    packageType: "basic",
    imageUrl: "/прод.png",
  },
  {
    id: 4,
    title: "ПРОДВИНУТЫЙ АНГЛИЙСКИЙ",
    items: [
      "Углубленное изучение грамматики",
      "Продвинутая разговорная практика",
      "Развитие письменных навыков и критического мышления",
      "Подходит для уровней B1 и B2",
    ],
    type: "blue",
    packageType: "basic",
    imageUrl: "/продангл.png",
  },
  {
    id: 5,
    title: "ОЛИМПИАДНАЯ МАТЕМАТИКА",
    items: [
      "Разбор типовых олимпиадных задач от простых до самых сложных",
      "Развиваем скорость и точность мышления",
      "Подготовка к будущим и разбор олимпиад предыдущих лет",
      "Повышение результатов в математических олимпиадах",
    ],
    type: "orange",
    packageType: "basic",
    imageUrl: "/олимпи.png",
  },
]

const Courses: FC<CoursesProps> = ({ id, onTrialClick, onMoreClick }) => (
  <section className="courses" id={id}>
    <div className="courses__container">
      <h2 className="courses__title">ДОСТУПНЫЕ КУРСЫ</h2>
      <div className="courses__list">
        {coursesData.map((course) => (
          <div
            key={course.id}
            className={`course-card course-card--${course.type}`}
          >
            <div className="course-card__content">
              <h3 className="course-card__title">{course.title}</h3>
              <ul className="course-card__list">
                {course.items.map((item, idx) => (
                  <li key={idx} className="course-card__item">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="course-card__buttons">
                <button
                  className="course-card__trial"
                  onClick={() => onTrialClick()}
                >
                  Пробное занятие
                </button>
                
                <button
                  className="course-card__more"
                  onClick={() => onMoreClick(course.packageType)}
                >
                  Подробнее
                  <span className="course-card__more-icon"></span>
                </button>
              </div>
            </div>
            <div className="course-card__image">
              <img src={course.imageUrl} alt={course.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default Courses
