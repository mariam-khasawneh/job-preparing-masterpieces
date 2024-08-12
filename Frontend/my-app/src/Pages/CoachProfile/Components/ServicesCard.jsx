import {
  Caption,
  H6,
  SmallBody,
} from "../../../Components/Typography-components/Typography";

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
    <div className="flex flex-col p-8 items-start gap-6 rounded-2xl border-2 border-slate-200">
      <H6 className="font-semibold text-slate-900 leading-5">Services</H6>
      <div className="flex flex-col gap-7 w-full">
        {services.map((props, key) => (
          <ServiceRow key={key} {...props} />
        ))}
      </div>
    </div>
  );
}

function ServiceRow({ service, description }) {
  return (
    <div className="flex flex-row gap-8 w-full self-stretch border-b pb-3">
      <div id="content" className="flex flex-col gap-1 w-full">
        <div className="flex flex-col md:flex-row justify-between">
          <SmallBody className="font-semibold text-slate-700">
            {service}
          </SmallBody>
        </div>
        <Caption className="text-slate-500">{description}</Caption>
      </div>
    </div>
  );
}

export default ServicesCard;
