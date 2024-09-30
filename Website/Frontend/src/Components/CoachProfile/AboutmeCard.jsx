import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

function AboutmeCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">About me</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-500 text-justify">
          As a Senior HR Assistant Instructor, you expertly guide future HR
          professionals with your extensive knowledge and experience. Your clear
          and engaging teaching style makes complex HR concepts accessible,
          inspiring students to excel in their careers. Your dedication to
          continuous learning ensures you provide valuable insights on the
          latest HR trends and best practices.
        </p>
      </CardContent>
    </Card>
  );
}

export default AboutmeCard;
