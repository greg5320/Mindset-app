"use client"

import type { FC } from "react"
import "./Courses.css"

interface CourseData {
  id: number
  title: string
  items: string[]
  type: "orange" | "blue",
  packageType: string
}


interface CoursesProps {
    id?: string;
    onTrialClick: () => void;
    onMoreClick: (packageId: string) => void;
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
    },
    {
      id: 2,
      title: "ШКОЛЬНЫЙ АНГЛИЙСКИЙ",
      items: [
        "Повысим уровень знания грамматики",
        "Малые группы и индивидуальный подход к каждому ученику",
        "Разговорная практика – обсуждение актуальных тем на английском языке",
        "Повысим уверенность в своих знаниях и успеваемость",
      ],
      type: "blue",
      packageType: "basic",
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
      packageType: "advanced",
    },
    {
      id: 4,
      title: "ПРОДВИНУТЫЙ АНГЛИЙСКИЙ",
      items: [
        "Углубленное изучение грамматики",
        "Продвинутая разговорная практика",
        "Развитие письменных навыков и критического мышления",
        "Полное погружение в язык",
      ],
      type: "blue",
      packageType: "advanced", 
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
      packageType: "advanced",
    },
  ];
  

  const Courses: FC<CoursesProps> = ({ id, onTrialClick, onMoreClick }) => {
    return (
      <section className="courses" id={id}>
        <div className="courses__container">
          <h2 className="courses__title">ДОСТУПНЫЕ КУРСЫ</h2>
          <div className="courses__list">
            {coursesData.map((course) => (
              <div
                key={course.id}
                className={`course-card course-card--${course.type}`}
              >
                <h3 className="course-card__title">{course.title}</h3>
                <ul className="course-card__list">
                  {course.items.map((item, index) => (
                    <li key={index} className="course-card__item">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="course-card__buttons">
                  <button
                    className="course-card__trial"
                    onClick={() => onMoreClick(course.packageType)}
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
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  
  export default Courses;