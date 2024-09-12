import { H6, SmallBody, Caption } from "../Typography-components/Typography";

import { Link } from "react-router-dom";
function CoursesCard() {
  const courses = [
    {
      name: "Mastering Resume Writing",
      lessons: "8 lessons",
      price: "35.00 JOD",
    },
    {
      name: "Building Professional LinkedIn Profiles",
      lessons: "6 lessons",
      price: "30.00 JOD",
    },
    {
      name: "Effective Networking Strategies",
      lessons: "7 lessons",
      price: "30.00 JOD",
    },
    {
      name: "Personal Branding for Job Seekers",
      lessons: "9 lessons",
      price: "50.00 JOD",
    },
  ];

  return (
    <div className="flex flex-col p-8 items-start gap-6 rounded-2xl border-2	 border-slate-200  ">
      <H6 className="font-semibold text-slate-900 leading-5	">Courses</H6>
      <div className=" flex flex-col gap-7 w-full ">
        {courses.map((props, key) => (
          <CourseRow key={key} {...props} />
        ))}
      </div>
    </div>
  );
}

function CourseRow({ name, lessons, price }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-6 border-b pb-3">
      <div className="sm:col-span-2">
        <SmallBody className="font-semibold text-slate-700">{name}</SmallBody>
      </div>
      <div>
        <Caption className="text-slate-500 font-medium">{lessons}</Caption>
      </div>
      <div>
        <Caption className="text-slate-500 font-semibold">{price}</Caption>
      </div>
      <Link>
        <div className="flex flex-row gap-2 justify-end">
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
