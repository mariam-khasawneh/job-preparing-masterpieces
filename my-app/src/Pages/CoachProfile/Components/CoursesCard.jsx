import {
  H6,
  SmallBody,
  Caption,
} from "../../../Components/Typography-components/Typography";
import { Link } from "react-router-dom";
function CoursesCard() {
  return (
    <div className="flex flex-col p-8 items-start gap-6 rounded-2xl border-2	 border-slate-200  ">
      <H6 className="font-semibold text-slate-900 leading-5	">Courses</H6>
      <div className=" flex flex-col gap-7 w-full ">
        <CourseRow />
        <CourseRow />
        <CourseRow />
      </div>
    </div>
  );
}

function CourseRow() {
  return (
    <div className="flex flex-row justify-between border-b pb-3">
      <div>
        <SmallBody className="font-semibold text-slate-700">
          Course Name
        </SmallBody>
      </div>
      <div>
        <Caption className="text-slate-500 font-medium">10 Lessons</Caption>
      </div>
      <div>
        <Caption className="text-slate-500 font-semibold">100$</Caption>
      </div>
      <Link>
        <div className="flex flex-row gap-2">
          <Caption className="font-semibold text-indigo-600">
            View Course
          </Caption>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M3.19922 12.7992L12.7992 3.19922"
              stroke="#4F46E5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.7992 8.79922V3.19922H7.19922"
              stroke="#4F46E5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Link>
    </div>
  );
}

export default CoursesCard;
