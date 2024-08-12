import { H6 } from "../../../Components/Typography-components/Typography";
import { Link } from "react-router-dom";
import {
  Caption,
  Body,
  SmallBody,
} from "../../../Components/Typography-components/Typography";

function EducatinCard() {
  const education = [
    {
      university: "The University of Sydney",
      credential: "BA (Hons) Business Management (Human Resource Management)",
      startDate: "May 2003",
      endDate: "Aug 2007",
    },
    {
      university: "Harvard University",
      credential: "Master of Business Administration (MBA)",
      startDate: "Sep 2008",
      endDate: "May 2010",
    },
    {
      university: "Stanford University",
      credential: "Bachelor of Science in Computer Science",
      startDate: "Sep 2011",
      endDate: "Jun 2015",
    },
  ];

  return (
    <div className="flex flex-col p-8 items-start gap-6 rounded-2xl border-2	 border-slate-200  ">
      <H6 className="font-semibold text-slate-900 leading-5	">
        Educational Background
      </H6>
      <div className=" flex flex-col gap-7 w-full ">
        {education.map((props, key) => (
          <CredentialRow key={key} {...props} />
        ))}
      </div>
    </div>
  );
}

function CredentialRow({ university, credential, startDate, endDate }) {
  return (
    <div className=" flex flex-row gap-8 w-full self-stretch border-b pb-3">
      <div className="rounded-full bg-slate-200 w-14 h-14"></div>
      <div id="content" className=" flex flex-col gap-1 w-full">
        <div className="flex flex-col md:flex-row justify-between">
          <SmallBody className="font-semibold text-slate-700">
            {university}
          </SmallBody>
          <Link>
            <div className="flex flex-row gap-2">
              <Caption className="font-semibold text-primaryIndigo">
                Show credential
              </Caption>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
              >
                <path
                  d="M7.44464 11.5291C7.36125 11.9153 7.1688 12.2695 6.89014 12.5496L5.54914 13.8926C5.15934 14.2824 4.63066 14.5014 4.07939 14.5014C3.52813 14.5014 2.99945 14.2824 2.60964 13.8926C2.21984 13.5028 2.00085 12.9741 2.00085 12.4229C2.00085 11.8716 2.21984 11.3429 2.60964 10.9531L3.94914 9.61012C4.22813 9.33265 4.58066 9.14077 4.96514 9.05712L6.38514 7.63712C5.77401 7.46552 5.12822 7.4596 4.51404 7.61996C3.89986 7.78031 3.33939 8.10117 2.89014 8.54962L1.54914 9.89262C0.900098 10.568 0.541723 11.4709 0.550955 12.4075C0.560188 13.3442 0.936293 14.2398 1.59852 14.9023C2.26076 15.5647 3.15632 15.9411 4.09295 15.9506C5.02958 15.9601 5.9326 15.602 6.60814 14.9531L7.94914 13.6101C8.3982 13.1602 8.71933 12.5989 8.87953 11.9837C9.03973 11.3686 9.03321 10.7219 8.86064 10.1101L7.44464 11.5291Z"
                  fill="#4F46E5"
                />
                <path
                  d="M9.39295 2.05007L8.04995 3.39107C7.60124 3.84046 7.28022 4.40119 7.11986 5.01566C6.9595 5.63013 6.96557 6.27622 7.13745 6.88757L8.55745 5.46757C8.64083 5.08255 8.83273 4.72946 9.11045 4.45007L10.4534 3.10757C10.8436 2.71777 11.3727 2.49894 11.9243 2.49922C12.4758 2.4995 13.0046 2.71887 13.3944 3.10907C13.7843 3.49927 14.0031 4.02834 14.0028 4.57988C14.0025 5.13142 13.7831 5.66027 13.3929 6.05007L12.0499 7.39107C11.7698 7.66973 11.4157 7.86217 11.0294 7.94557L9.61145 9.36307C10.2232 9.53563 10.8699 9.54215 11.4851 9.38196C12.1002 9.22176 12.6616 8.90062 13.1114 8.45157L14.4544 7.10907C15.1096 6.43465 15.473 5.52947 15.4661 4.58925C15.4592 3.64902 15.0825 2.7493 14.4174 2.0846C13.7524 1.41991 12.8525 1.04366 11.9123 1.03719C10.972 1.03073 10.067 1.39458 9.39295 2.05007Z"
                  fill="#4F46E5"
                />
                <path
                  d="M4.71789 11.7807C4.78754 11.8504 4.87024 11.9057 4.96126 11.9434C5.05229 11.9812 5.14986 12.0006 5.24839 12.0006C5.34692 12.0006 5.44449 11.9812 5.53551 11.9434C5.62654 11.9057 5.70924 11.8504 5.77889 11.7807L11.2789 6.28074C11.4196 6.14004 11.4986 5.94922 11.4986 5.75024C11.4986 5.55126 11.4196 5.36044 11.2789 5.21974C11.1382 5.07904 10.9474 5 10.7484 5C10.5494 5 10.3586 5.07904 10.2179 5.21974L4.71789 10.7197C4.64819 10.7894 4.5929 10.8721 4.55518 10.9631C4.51746 11.0541 4.49805 11.1517 4.49805 11.2502C4.49805 11.3488 4.51746 11.4463 4.55518 11.5374C4.5929 11.6284 4.64819 11.7111 4.71789 11.7807Z"
                  fill="#4F46E5"
                />
              </svg>
            </div>
          </Link>
        </div>
        <Caption className="text-slate-500">{credential}</Caption>
        <Caption className="text-slate-500">
          {startDate} - {endDate}
        </Caption>
      </div>
    </div>
  );
}

export default EducatinCard;
