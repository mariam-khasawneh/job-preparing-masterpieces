import { Section } from "../Components/styles-components/containers";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/Components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import axios from "axios";
import { Separator } from "@/Components/ui/separator";
import { Link as LinkIcon } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { Loader2, Star } from "lucide-react";

import avatar from "../Images/coach.jpg";

function CoachProfile() {
  const [coach, setCoach] = useState(null);
  const [services, setServices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { userId, coachId } = location.state || {};

  useEffect(() => {
    const fetchCoachDetails = async () => {
      if (!userId) {
        setError("Coach ID is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/api/coaches/details",
          { userId },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setCoach(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchCoachDetails();
  }, [userId]);

  useEffect(() => {
    const fetchCoachServices = async () => {
      if (!coachId) {
        setError("Coach ID is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/api/services/coach",
          { coachId },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setServices(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchCoachServices();
  }, [coachId]);

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

  if (!coach) {
    return <div className="text-center">Coach not found</div>;
  }

  if (!services) {
    return <div className="text-center">Coach not found</div>;
  }

  function InfoCard() {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col gap-5 p-8">
          <Avatar className="w-full h-auto rounded-lg">
            <AvatarImage
              src={coach.userId.profilePicture}
              alt="Coach"
              className="object-cover"
            />
          </Avatar>

          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-indigo-600">
              {coach.userId.full_name}{" "}
            </h2>
            <p className="text-sm text-slate-500">@{coach.userId.user_name}</p>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
            <div className="col-span-3 md:col-span-4">
              <Button asChild className="w-full" size="lg">
                <Link to="/appointment">Book a Session</Link>
              </Button>
            </div>
            <div className="col-span-1">
              <Button variant="secondary" size="icon" className="w-full h-full">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  function AboutmeCard() {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">About me</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-500 text-justify">{coach.about}</p>
        </CardContent>
      </Card>
    );
  }

  function SkillsCard() {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            {coach.skills &&
              coach.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  function EducationCard() {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibol">
            Educational Background
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {coach.educationalBackground.map((props, key) => (
            <CredentialRow key={key} {...props} />
          ))}
        </CardContent>
      </Card>
    );
  }

  function CredentialRow({
    university,
    credential,
    startDate,
    endDate,
    major,
  }) {
    return (
      <div className="flex items-start gap-4 pb-4 border-b last:border-b-0 last:pb-0">
        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between mb-1">
            <h4 className="text-sm font-semibold text-slate-700">
              {university}
            </h4>
            <Button variant="link" asChild className="p-0 h-auto">
              <Link
                to="#"
                className="flex items-center text-xs font-semibold text-indigo-600"
              >
                Show credential
                <LinkIcon className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
          <p className="text-xs text-slate-500">{credential}</p>{" "}
          <p className="text-xs text-slate-500">{major}</p>
          <p className="text-xs text-slate-500">
            {startDate} - {endDate}
          </p>
        </div>
      </div>
    );
  }

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
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Lessons</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{course.name}</TableCell>
                  <TableCell>{course.lessons}</TableCell>
                  <TableCell>{course.price}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="link" asChild>
                      <Link to="#">
                        View Course
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  function ServicesCard() {
    // const services = [
    //   {
    //     service: "Resume and Cover Letter Writing",
    //     description:
    //       "Crafting or refining resumes and cover letters to effectively highlight skills and experience.",
    //   },
    //   {
    //     service: "Interview Preparation",
    //     description:
    //       "Conducting mock interviews and providing feedback on responses and interview techniques.",
    //   },
    //   {
    //     service: "Career Planning and Goal Setting",
    //     description:
    //       "Helping clients identify their career goals, create a career plan, and develop strategies to achieve those goals.",
    //   },
    //   {
    //     service: "Personal Branding",
    //     description:
    //       "Assisting with building a strong personal brand, including optimizing LinkedIn profiles and developing a professional online presence.",
    //   },
    // ];

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Services</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {services.map((props, index) => (
            <React.Fragment key={index}>
              <ServiceRow {...props} />
              {index < services.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </CardContent>
      </Card>
    );
  }

  function ServiceRow({
    service,
    description,
    serviceType,
    availability,
    price,
    currency,
    duration,
    rating,
    tags,
  }) {
    return (
      <div className="flex flex-col gap-2  rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-slate-700">{service}</h3>
            <p className="text-sm text-slate-500">{description}</p>
          </div>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
            {serviceType}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-slate-600">{rating}</span>
          </div>
          <div>
            <span className="text-slate-600">{availability}</span>
            <span className="font-semibold text-slate-700">
              {currency}
              {price} | {duration}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Section className="flex flex-col">
      <div className="grid grid-cols-1  lg:grid-cols-12 gap-6">
        <div id="right" className=" lg:col-span-4 flex flex-col gap-6">
          <InfoCard />
          <AboutmeCard />
          <SkillsCard />
        </div>
        <div id="left" className="lg:col-span-8 flex flex-col gap-6">
          <EducationCard />
          <CoursesCard />
          <ServicesCard />
        </div>
      </div>
    </Section>
  );
}

export default CoachProfile;
