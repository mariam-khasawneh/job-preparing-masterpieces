import { H6 } from "../Typography-components/Typography";
import Badges from "../Badges";

function SkillsCard() {
  return (
    <div className="flex flex-col p-8 items-start gap-5 rounded-2xl border-2	 border-slate-200  ">
      <H6 className="font-semibold text-slate-900 leading-5	">Skills</H6>
      <div className="flex gap-2 flex-wrap">
        <Badges>Active Listening</Badges>
        <Badges>Empathy</Badges>
        <Badges>Communication</Badges>
        <Badges>Active Listening</Badges>
        <Badges>Communication</Badges>
        <Badges>Motivational Techniques</Badges>
      </div>
    </div>
  );
}

export default SkillsCard;
