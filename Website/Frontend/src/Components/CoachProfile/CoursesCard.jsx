import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

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

export default CoursesCard;
