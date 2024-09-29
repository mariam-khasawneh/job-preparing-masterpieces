import coaches from "../Images/coaches.png";
import { Section } from "../Components/styles-components/containers";
import { H2, H6 } from "../Components/Typography-components/Typography";
// import SearchBar from "../Components/SearchBar/SearchBar";
// import CoachCard from "../Components/cards/Coach-card/CoachCard";

// function Coaching() {
//   return (
//     <Section className="flex flex-col">
//       <CtaSection />
//       <CoachingGrid />
//     </Section>
//   );
// }

// function CtaSection() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
//       <div id="content" className="flex flex-col justify-between gap-4">
//         <div className="flex flex-col gap-4">
//           <H2 className="font-semibold font-spaceGrotesk text-primaryIndigo">
//             {" "}
//             Find Your Perfect Coach
//           </H2>
//           <H6 className="font-medium text-slate-500">
//             Discover the ideal coach for personalized 1-on-1 sessions. Let us
//             help you achieve your goals with expert guidance and support.
//           </H6>
//         </div>
//         <div id="search">
//           <SearchSection />
//         </div>
//       </div>
//       <div
//         id="img"
//         className="hidden invisible md:flex md:visible flex-col items-end justify-center"
//       >
//         <img src={coaches} alt="coahes " width="80%" />
//       </div>
//     </div>
//   );
// }

// function SearchSection() {
//   return (
//     <div className="flex flex-col sm:flex-col lg:flex-row justify-between self-stretch w-full">
//       <SearchBar placeholder="Search about coach" />
//     </div>
//   );
// }

// function CoachingGrid() {
//   const coaches = [
//     {
//       name: "John Smith",
//       position: "Career Coach",
//       description:
//         "With over 10 years of experience, John specializes in helping professionals transition into new careers and achieve their full potential.",
//     },
//     {
//       name: "Emily Johnson",
//       position: "Resume Specialist",
//       description:
//         "Emily is an expert in crafting compelling resumes that highlight your strengths and help you stand out to employers.",
//     },
//     {
//       name: "Michael Brown",
//       position: "Interview Coach",
//       description:
//         "Michael offers personalized coaching to help you ace your interviews and secure your dream job.",
//     },
//     {
//       name: "Sarah Davis",
//       position: "LinkedIn Expert",
//       description:
//         "Sarah helps you optimize your LinkedIn profile to attract recruiters and grow your professional network.",
//     },
//     {
//       name: "David Wilson",
//       position: "Job Search Strategist",
//       description:
//         "David provides strategic advice on job searching, networking, and navigating the job market effectively.",
//     },
//     {
//       name: "Laura Garcia",
//       position: "Professional Development Coach",
//       description:
//         "Laura focuses on helping you develop the skills and confidence needed to advance in your career.",
//     },
//     {
//       name: "James Martinez",
//       position: "Executive Coach",
//       description:
//         "James works with senior executives to enhance their leadership skills and achieve their career goals.",
//     },
//     {
//       name: "Sophia Lee",
//       position: "Cover Letter Specialist",
//       description:
//         "Sophia assists in creating persuasive cover letters that complement your resume and grab the attention of hiring managers.",
//     },
//     {
//       name: "Daniel Anderson",
//       position: "Career Transition Coach",
//       description:
//         "Daniel helps individuals smoothly transition to new career paths, providing support and guidance throughout the process.",
//     },
//     {
//       name: "Olivia Thomas",
//       position: "Networking Coach",
//       description:
//         "Olivia offers strategies and tips to build and leverage professional networks for career advancement.",
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  sm:ga-4 gap-6 pt-12">
//       {coaches.map((coache, index) => (
//         <CoachCard
//           key={index}
//           name={coache.name}
//           position={coache.position}
//           description={coache.description}
//         />
//       ))}
//     </div>
//   );
// }
// export default Coaching;

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Loader2 } from "lucide-react";

function Coaches() {
  return (
    <Section className="flex flex-col">
      <CtaSection />
      <CoachesGrid />
    </Section>
  );
}

const CoachesGrid = () => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/coaches");
        if (!response.ok) {
          throw new Error("Failed to fetch coaches");
        }
        const data = await response.json();
        setCoaches(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCoaches();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Our Coaches</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {coaches.map((coach) => (
          <Card key={coach._id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={coach.userId.profilePicture} />
                  <AvatarFallback>
                    {coach.userId.full_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">
                    {coach.userId.full_name}
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    {coach.userId.user_name}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm mb-2">
                {coach.about || "No description available."}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {coach.skills &&
                  coach.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="default" size="sm">
                View Profile
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

function CtaSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12 items-center">
      <div id="content" className="flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-4">
          <H2 className="font-semibold font-spaceGrotesk text-primaryIndigo">
            {" "}
            Find Your Perfect Coach
          </H2>
          <H6 className="font-medium text-slate-500">
            Discover the ideal coach for personalized 1-on-1 sessions. Let us
            help you achieve your goals with expert guidance and support.
          </H6>
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

export default Coaches;
