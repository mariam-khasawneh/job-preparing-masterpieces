import { Link } from "react-router-dom";
import styles from "./CourseCard.module.css";
import { Body, Caption } from "../../Typography-components/Typography";
import Button from "../../Button/Button";
import LessonsSVG from "./svg/LessonSvg";
import StdSVG from "./svg/StdSVG";

function CourseCard() {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.courseImg}>
          {/* <img src="./imgs/interviews.jpg" alt="" /> */}
          {/* <img src={interviews} alt="" /> */}
        </div>
        <div className={styles.courseInfo}>
          <Body className={styles.courseName}> How To get the interviews</Body>
          <div className={styles.courseStatistics}>
            <div className={styles.lessonsStatiscs}>
              <LessonsSVG />
              <Caption className={styles.caption}>3 Lessons</Caption>
            </div>
            <div className={styles.studentsStatiscs}>
              <StdSVG />
              <Caption className={styles.caption}>100 Students</Caption>
            </div>
          </div>
          <Caption className={styles.courseDescription}>
            How To get the interviews
          </Caption>
        </div>
        <Link to="/course" className={styles.btnLink}>
          <Button primary extraSmall className={styles.courseBtn}>
            Start Learning
          </Button>
        </Link>
      </div>
    </>
  );
}

export default CourseCard;
