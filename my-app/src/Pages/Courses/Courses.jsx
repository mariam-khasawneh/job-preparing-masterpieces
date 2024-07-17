import { Section } from "../../Components/styles-components/containers";
import { H5 } from "../../Components/Typography-components/Typography";
import SearchBar from "../../Components/SearchBar/SearchBar";
import CourseCard from "../../Components/cards/Course-card/CourseCard";

function Courses() {
  return (
    <Section className="flex flex-col">
      <div className="flex flex-col sm:flex-col lg:flex-row justify-between self-stretch	">
        <H5 className="text-blue-900 font-inter font-semibold"> Our Courses</H5>
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
