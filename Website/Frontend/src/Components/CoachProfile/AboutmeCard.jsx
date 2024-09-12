import { H6, Caption } from "../Typography-components/Typography";

function AboutmeCard() {
  return (
    <div className="flex flex-col  p-8 items-start gap-5 rounded-2xl border-2	 border-slate-200 ">
      <H6 className="font-semibold text-slate-900 leading-5	">About me</H6>
      <Caption className="text-slate-500 text-justify	font-normal ">
        As a Senior HR Assistant Instructor, you expertly guide future HR
        professionals with your extensive knowledge and experience. Your clear
        and engaging teaching style makes complex HR concepts accessible,
        inspiring students to excel in their careers. Your dedication to
        continuous learning ensures you provide valuable insights on the latest
        HR trends and best practices.
      </Caption>
    </div>
  );
}

export default AboutmeCard;
