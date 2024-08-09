import styles from "./CoachCard.module.css";
import Button from "../../Button/Button";
import { Body, Caption } from "../../Typography-components/Typography";
import RatingSvg from "./svg/RatingSvg";
import SessionSvg from "./svg/SessionSvg";
import { Link } from "react-router-dom";

function CoachCard({ name, position, description }) {
  return (
    <div className="flex p-4 items-stretch gap-4 rounded-2xl border-slate-200 border-2 justify-between place-content-between content-between">
      {/* <div className={styles.img}></div> */}
      <div className="flex flex-col items-start gap-6 w-full">
        <div className="flex gap-4 justify-center">
          <div className={styles.img}></div>
          <div className="flex flex-col self-stretch gap-1 justify-center">
            <div className="flex flex-col gap-0">
              <Body className="font-semibold text-slate-700">{name}</Body>
              <Caption className="text-slate-500 font-medium line-clamp-1">
                {position}
              </Caption>
            </div>
          </div>
        </div>
        <Body className="line-clamp-2 tracking-normal text-slate-500 font-medium 	">
          {description}
        </Body>
        <div>
          <div className="flex gap-3">
            <div className="flex flex-row gap-2 place-content-center">
              <RatingSvg />
              <Caption className="text-slate-500 font-medium">
                4.0 rating
              </Caption>
            </div>
            <div className="flex flex-row gap-2">
              <SessionSvg />
              <Caption className="text-slate-500 font-medium">
                50 session
              </Caption>
            </div>
          </div>
        </div>
        <Link to="/coach-profile" className="w-full">
          <Button primary extraSmall className="w-full">
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  );
}
export default CoachCard;
