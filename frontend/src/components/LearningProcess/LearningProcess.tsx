import type { FC } from "react"
import "./LearningProcess.css"

interface LearningProcessProps {
  id?: string;
}

const LearningProcess: FC<LearningProcessProps> = ({ id }) => {
  return (
    <section className="learning" id="learning-process">
      <div className="learning__container">
        <h2 className="learning__title">КАК ПРОХОДИТ ОБУЧЕНИЕ</h2>

        <div className="learning__grid">
          <div className="learning-card learning-card--blue">
            <h3 className="learning-card__title">
              МАЛЫЕ ГРУППЫ
              <br />
              ОТ 3 ДО 5 ЧЕЛОВЕК
            </h3>
            <p className="learning-card__text">
              Мы уверены, что обучение в небольших группах обеспечивает максимальную вовлеченность каждого ученика и
              позволяет преподавателю уделять внимание каждому, что повышает эффективность занятий и позволяет создавать
              комфортную атмосферу для обучения
            </p>
          </div>

          <div className="learning-card learning-card--white">
            <h3 className="learning-card__title">МОЛОДЫЕ ПРЕПОДАВАТЕЛИ - ВЫПУСКНИКИ ЛУЧШИХ ВУЗОВ РОССИИ</h3>
            <p className="learning-card__text">
              Наша команда состоит из энергичных и мотивированных педагогов, окончивших ведущие университеты страны. Они
              не только обладают глубокими знаниями в своих предметах, но и умеют заинтересовать и вдохновить учеников
              на достижение высоких результатов
            </p>
          </div>

          <div className="learning-card learning-card--white">
            <h3 className="learning-card__title">
              СОВРЕМЕННЫЕ
              <br />
              МЕТОДИКИ ОБУЧЕНИЯ
              <br />И СИСТЕМА РЕЙТИНГА
            </h3>
            <p className="learning-card__text">
              Мы используем проверенные и актуальные методики преподавания. Наши уроки всегда динамичны и адаптированы под индивидуальные
              потребности каждого ученика, а система рейтинга повышает мотивацию ребенка и позволяет отслеживать его
              прогресс
            </p>
          </div>

          <div className="learning-card learning-card--blue">
            <h3 className="learning-card__title">
              АКТИВНАЯ
              <br />
              ВНЕУРОЧНАЯ ДЕЯТЕЛЬНОСТЬ
            </h3>
            <p className="learning-card__text">
              Мы понимаем, что полноценное обучение включает не только уроки, но и активное взаимодействие вне их. В
              нашей школе вы сможете участвовать в просмотрах интересных фильмов, увлекательных играх, интерактивных
              занятиях и других мероприятиях, которые помогут развить коммуникативные навыки и творческое мышление
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LearningProcess

