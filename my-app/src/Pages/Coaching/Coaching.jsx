import coaches from "../../Images/coaches.png";
import { Section } from "../../Components/styles-components/containers";
import { H2, H5 } from "../../Components/Typography-components/Typography";
import SearchBar from "../../Components/SearchBar/SearchBar";
import CoachCard from "../../Components/cards/Coach-card/CoachCard";

function Coaching() {
  return (
    <Section className="flex flex-col">
      <CtaSection />
      <CoachingGrid />
    </Section>
  );
}

function CtaSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
      <div id="content" className="flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-4">
          <H2 className="font-semibold font-spaceGrotesk text-primaryIndigo">
            {" "}
            Find Your Perfect Coach
          </H2>
          <H5 className="font-medium text-slate-500">
            Discover the ideal coach for personalized 1-on-1 sessions. Let us
            help you achieve your goals with expert guidance and support.
          </H5>
        </div>
        <div id="search">
          <SearchSection />
        </div>
      </div>
      <div
        id="img"
        className="hidden invisible md:flex md:visible flex-col items-end justify-center"
      >
        <img src={coaches} alt="coahes " width="80%" />
      </div>
    </div>
  );
}

function SearchSection() {
  return (
    <div className="flex flex-col sm:flex-col lg:flex-row justify-between self-stretch w-full">
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
