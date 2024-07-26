import coaches from "../../Images/coaches.png";
import { Section } from "../../Components/styles-components/containers";
import styles from "./Coaching.module.css";
import {
  Body,
  H1,
  H2,
  H4,
  H5,
  H6,
} from "../../Components/Typography-components/Typography";
import SearchBar from "../../Components/SearchBar/SearchBar";
import CoachCard from "../../Components/cards/Coach-card/CoachCard";
import Button from "../../Components/Button/Button";

function Coaching() {
  return (
    <Section className="flex flex-col">
      <CtaSection />
      <SearchSection />
      <CoachingGrid />
    </Section>
  );
}

function CtaSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
      <div id="content" className="flex flex-col gap-3 justify-center ">
        <H2 className="font-bold"> Find Your Perfect Coach</H2>
        <H6>
          Discover the ideal coach for personalized 1-on-1 sessions. Let us help
          you achieve your goals with expert guidance and support.
        </H6>
        {/* <div className="w-1/4">
          <Button primary larg>
            Find coach
          </Button>
        </div> */}
      </div>
      <div id="img" className="flex flex-col items-end justify-center">
        <img src={coaches} alt="coahes " width="80%" />
      </div>
    </div>
  );
}

function SearchSection() {
  return (
    <div className="flex flex-col sm:flex-col lg:flex-row justify-between self-stretch	">
      <SearchBar />
    </div>
  );
}

function CoachingGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  sm:ga-4 gap-6 pt-12">
      <CoachCard />
      <CoachCard />
      <CoachCard />
      <CoachCard />
      <CoachCard />
      <CoachCard />
      <CoachCard />
      <CoachCard />
      <CoachCard />
      <CoachCard />
      <CoachCard />
      <CoachCard />
      <CoachCard />
      <CoachCard />
      <CoachCard />
      <CoachCard />
    </div>
  );
}
export default Coaching;
