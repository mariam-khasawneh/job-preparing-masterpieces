import styles from "./CoachCard.module.css";
import Button from "../../Button/Button";
import { Body, Caption } from "../../Typography-components/Typography";
import RatingSvg from "./svg/RatingSvg";
import SessionSvg from "./svg/SessionSvg";
import { Link } from "react-router-dom";

function CoachCard() {
  return (
    <>
      <div className={styles.card}>
        {/* <div className={styles.img}></div> */}
        <div className={styles.contant}>
          <div className="flex gap-4 justify-center	">
            <div className={styles.img}></div>
            <div className="flex flex-col self-stretch gap-1  justify-center">
              <div className={styles.nameAndRole}>
                <Body className={styles.coachName}>Coach Name</Body>
                <Caption className={styles.coachRole}>Product Manager</Caption>
              </div>
            </div>
          </div>
          <div>
            <div className=" flex gap-3">
              <div className="flex flex-row gap-2">
                <RatingSvg />
                <Caption className={styles.ratingCaption}>4.0 rating</Caption>
              </div>
              <div className="flex flex-row gap-2">
                <SessionSvg />
                <Caption className={styles.ratingCaption}>50 session</Caption>
              </div>
            </div>
            <Body>rrrrrrrrrrrrrrrrrrrrrrr</Body>
          </div>
          <Link to="/coach-profile" className={styles.btnLink}>
            <Button primary extraSmall className={styles.sessionBtn}>
              Book Session
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CoachCard;
