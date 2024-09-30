import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";

function ServicesCard() {
  const services = [
    {
      service: "Resume and Cover Letter Writing",
      description:
        "Crafting or refining resumes and cover letters to effectively highlight skills and experience.",
    },
    {
      service: "Interview Preparation",
      description:
        "Conducting mock interviews and providing feedback on responses and interview techniques.",
    },
    {
      service: "Career Planning and Goal Setting",
      description:
        "Helping clients identify their career goals, create a career plan, and develop strategies to achieve those goals.",
    },
    {
      service: "Personal Branding",
      description:
        "Assisting with building a strong personal brand, including optimizing LinkedIn profiles and developing a professional online presence.",
    },
  ];

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

function ServiceRow({ service, description }) {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-sm font-semibold text-slate-700">{service}</h3>
      <p className="text-xs text-slate-500">{description}</p>
    </div>
  );
}

export default ServicesCard;
