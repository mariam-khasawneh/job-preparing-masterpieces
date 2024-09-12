import { Section } from "../Components/styles-components/containers";
import InfoCard from "../Components/CoachProfile/InfoCard";

import AboutmeCard from "../Components/CoachProfile/AboutmeCard";
import SkillsCard from "../Components/CoachProfile/SkillsCard";
import EducatinCard from "../Components/CoachProfile/EducatinCard";
import CoursesCard from "../Components/CoachProfile/CoursesCard";
import ServicesCard from "../Components/CoachProfile/ServicesCard";

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
