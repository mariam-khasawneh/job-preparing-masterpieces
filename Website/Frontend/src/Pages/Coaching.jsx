import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import coaches from "../Images/coaches.png";
import { Section } from "../Components/styles-components/containers";
import { H2, H6 } from "../Components/Typography-components/Typography";

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
  const navigate = useNavigate();

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

  const handleViewProfile = (userId, coachId) => {
    navigate("/coach-profile", { state: { userId, coachId } });
  };

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
              <Button
                variant="default"
                size="sm"
                className="w-full"
                onClick={() => handleViewProfile(coach.userId._id, coach._id)}
              >
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
