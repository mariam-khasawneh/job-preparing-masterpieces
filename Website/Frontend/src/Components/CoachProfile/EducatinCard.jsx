import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Avatar } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Link } from "react-router-dom";
import { Link as LinkIcon } from "lucide-react";

function EducationCard() {
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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibol">
          Educational Background
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {education.map((props, key) => (
          <CredentialRow key={key} {...props} />
        ))}
      </CardContent>
    </Card>
  );
}

function CredentialRow({ university, credential, startDate, endDate }) {
  return (
    <div className="flex items-start gap-4 pb-4 border-b last:border-b-0 last:pb-0">
      <div className="flex-1">
        <div className="flex flex-col md:flex-row justify-between mb-1">
          <h4 className="text-sm font-semibold text-slate-700">{university}</h4>
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
        <p className="text-xs text-slate-500">{credential}</p>
        <p className="text-xs text-slate-500">
          {startDate} - {endDate}
        </p>
      </div>
    </div>
  );
}

export default EducationCard;
