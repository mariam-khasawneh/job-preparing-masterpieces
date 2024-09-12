import { Section } from "../Components/styles-components/containers";
import { H5 } from "../Components/Typography-components/Typography";
import SearchBar from "../Components/SearchBar/SearchBar";
import CourseCard from "../Components/cards/Course-card/CourseCard";

function Courses() {
  return (
    <Section className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <H5 className="text-blue-900 font-inter font-semibold col-span-3 ">
          Our Courses
        </H5>
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  sm:ga-4 gap-6 pt-12">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </Section>
  );
}

export default Courses;
