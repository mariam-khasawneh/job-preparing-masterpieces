import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";

function SkillsCard() {
  const skills = [
    "Active Listening",
    "Empathy",
    "Communication",
    "Motivational Techniques",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 flex-wrap">
          {skills.map((skill, index) => (
            <Badge key={index} variant="default">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default SkillsCard;
