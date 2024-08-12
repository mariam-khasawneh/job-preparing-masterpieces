import { Section } from "../../Components/styles-components/containers";
import InfoCard from "./Components/InfoCard";
import AboutmeCard from "./Components/AboutmeCard";
import SkillsCard from "./Components/SkillsCard";
import EducatinCard from "./Components/EducatinCard";
import CoursesCard from "./Components/CoursesCard";
import ServicesCard from "./Components/ServicesCard";

function CoachProfile() {
  return (
    <Section className="flex flex-col">
      <div className="grid grid-cols-1  lg:grid-cols-12 gap-6">
        <div id="right" className=" lg:col-span-4 flex flex-col gap-6">
          <InfoCard />
          <AboutmeCard />
          <SkillsCard />
        </div>
        <div id="left" className="lg:col-span-8 flex flex-col gap-6">
          <EducatinCard />
          <CoursesCard />
          <ServicesCard />
        </div>
      </div>
    </Section>
  );
}

export default CoachProfile;
