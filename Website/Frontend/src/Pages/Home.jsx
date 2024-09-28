import { Link } from "react-router-dom";
import styles from "../Styles/Home.module.css";
import Button from "../Components/Button/Button.jsx";
import {
  Section,
  Wrapper,
} from "../Components/styles-components/containers.jsx";
import {
  H6,
  Body,
  H3,
  Display,
  Caption,
} from "../Components/Typography-components/Typography.jsx";
import Accordian, { AccordianItem } from "../Components/Accordion.jsx";
import PropTypes from "prop-types";

import {
  Card,
  CardBody,
  Typography,
  CardHeader,
} from "@material-tailwind/react";
import { Helmet } from "react-helmet-async";

// Page Component
function Home() {
  return (
    <>
      <Helmet>
        <title>JobReady | Home Page</title>
      </Helmet>
      <HeroSection />
      <AboutSection />
      <Features />
      <Testimonials />
      {/* <TestimonialSection16 /> */}
      <FAQs />
      <CTA />
    </>
  );
}

// Sections Components
function HeroSection() {
  return (
    <div>
      <Section className="h-screen">
        <Wrapper
          dark
          className="flex flex-col justify-center items-center gap-12 py-16 px-20 rounded-2xl"
        >
          <div className={styles.heroSwitcher}>
            <H6 className="text-center">Job Coach</H6>
            <div className={styles.switcher}>
              <div className={styles.switchweCircle}></div>
            </div>
            <H6 className={styles.switcherText}>Job Seeker</H6>
          </div>
          <div className="flex flex-col justify-center items-center gap-8">
            <Display className="text-center font-spaceGrotesk font-extrabold w-full sm:w-3/4 leading-none text-primaryYellow">
              Transform your career with personalized preparation tools
            </Display>
            <Body className="text-center leading-6">
              From resume building to interview prep, get every thing you need
              to land your dream job.
            </Body>
          </div>
          <div className="flex p-2 justify-center items-center gap-4 rounded-lg border-slate-50 border-2 border-dashed">
            <Link to="/login" className={styles.heroBtnLink}>
              <Button primary extraSmall className={styles.heroBtn}>
                Login
              </Button>
            </Link>
            <Link to="/signup" className={styles.heroBtnLink}>
              <Button secondary extraSmall className={styles.heroBtn}>
                Get started
              </Button>
            </Link>
          </div>
        </Wrapper>
      </Section>
    </div>
  );
}

function AboutSection() {
  return (
    <Section className="justify-center items-center gap-8">
      <div className="w-full grid grid-cols-1 md:grid-cols-2">
        <Wrapper className="flex flex-col gap-4">
          <H3 className="text-primaryIndigo font-spaceGrotesk font-bold leading-none capitalize">
            What Is <br></br> JobReady ?
          </H3>
          <Body className="text-slate-500 text-justify font-medium">
            JobPortal offers job coaches a powerful platform to enhance their
            coaching practice, connect with clients, and maximize their impact
            in career development. As a job coach on JobPortal, you gain access
            to a suite of tools and resources designed to streamline your
            coaching process and elevate your services.
          </Body>
        </Wrapper>
        <Wrapper className="flex flex-col gap-4">img</Wrapper>
      </div>
    </Section>
  );
}

function Features() {
  const featureDataArray = [
    {
      feature: "Coaching Sessions",
      description: [
        "Easy booking of coaching sessions with available coaches..",
      ],
      className: "",
    },
    {
      feature: "Interview Preparation",
      description: [
        "Mock interview tools and practice sessions.",
        "Tips and best practices for various types of interviews.",
      ],
      className: "lg:col-span-3",
    },
    {
      feature: "Skills Development",
      description: [
        "Personalized skills development plans.",
        "Access to online courses,  workshops, and training modules.",
      ],
      className: "lg:col-span-3",
    },
    {
      feature: "Career Resource ",
      description: [
        // "Library of resources including resume templates, interview tips, and job search strategies..",
        "Articles, videos, and podcasts on career development.",
      ],
      className: "",
    },
  ];

  return (
    <Section className="flex flex-col gap-6">
      <div className="w-full text-center">
        <H3 className="text-primaryIndigo font-spaceGrotesk font-bold leading-none capitalize">
          Features For You !
        </H3>
      </div>
      <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featureDataArray.map((data, index) => (
          <FeatureCard
            key={index}
            feature={data.feature}
            description={data.description}
            className={data.className}
          />
        ))}
      </div>
    </Section>
  );
}

function FeatureCard({ feature, description, className }) {
  return (
    <div
      className={`p-8 rounded-2xl bg-yellow-100 min-h-56  justify-end items-end place-content-end ${className}`}
    >
      <div className="font-bold text-primaryIndigo">{feature}</div>
      <ul className="list-none pl-0">
        {description.map((item, index) => (
          <li key={index} className="text-slate-500 font-medium flex">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.0505 9.28727C19.9138 9.90909 20.5 10.8727 20.5 12C20.5 13.1273 19.9138 14.0916 19.0505 14.7127C19.2251 15.7615 18.9531 16.864 18.1582 17.6582C17.3618 18.4545 16.26 18.7193 15.2156 18.5491C14.5967 19.4153 13.6244 20 12.5 20C11.3727 20 10.4069 19.4131 9.78655 18.5484C8.74073 18.7193 7.63818 18.4553 6.84109 17.6582C6.04473 16.8618 5.78 15.7593 5.956 14.7127C5.09345 14.0924 4.5 13.128 4.5 12C4.5 10.872 5.09345 9.90691 5.956 9.28727C5.78 8.24073 6.04473 7.13818 6.84182 6.34182C7.63673 5.54618 8.74 5.27491 9.79236 5.44945C10.4091 4.58473 11.3749 4 12.5 4C13.6236 4 14.5945 4.584 15.2142 5.44945C16.2629 5.27491 17.364 5.54764 18.1582 6.34182C18.9531 7.136 19.2258 8.23855 19.0505 9.28727ZM15.8316 9.22618C15.9094 9.28167 15.9754 9.35192 16.026 9.43294C16.0766 9.51396 16.1108 9.60414 16.1265 9.69836C16.1422 9.79257 16.1393 9.88896 16.1177 9.98202C16.0962 10.0751 16.0566 10.163 16.0011 10.2407L12.3647 15.3316C12.3033 15.4176 12.224 15.4892 12.1321 15.5414C12.0403 15.5936 11.9382 15.6251 11.8329 15.6338C11.7276 15.6426 11.6217 15.6282 11.5225 15.5919C11.4233 15.5555 11.3332 15.498 11.2585 15.4233L9.07673 13.2415C8.94425 13.1043 8.87094 12.9206 8.8726 12.7299C8.87426 12.5392 8.95074 12.3568 9.08559 12.222C9.22043 12.0871 9.40284 12.0106 9.59353 12.009C9.78422 12.0073 9.96793 12.0806 10.1051 12.2131L11.6796 13.7876L14.8171 9.39491C14.9293 9.238 15.0992 9.13208 15.2894 9.10044C15.4797 9.0688 15.6747 9.11403 15.8316 9.22618Z"
                  fill="#64748b "
                />
              </svg>
            </div>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

FeatureCard.propTypes = {
  feature: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

function CTA() {
  return (
    <Section>
      <Wrapper className="bg-primaryIndigo w-full rounded-2xl">
        <div className="flex flex-col gap-8">
          <div>
            <H3 className="font-spaceGrotesk font-bold text-primaryYellow">
              Land your Dream job{" "}
            </H3>
            <Body className="text-indigo-50">
              Transform Your Career with Personalized Preparation Tools
            </Body>
          </div>
          <div className="w-full md:w-1/2">
            <Button larg ternary>
              Start Your Free Trail
            </Button>
          </div>
        </div>
      </Wrapper>
    </Section>
  );
}

function FAQs() {
  return (
    <div className="my-12 md:my-24">
      <Wrapper className="justify-center items-center gap-8 bg-indigo-100 ">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 py-12">
          <div className="px-0 ">
            <H3 className="text-primaryIndigo font-spaceGrotesk font-bold leading-none capitalize">
              Frequently Asked <br></br> Questions
            </H3>
          </div>
          <div>
            <Accordian>
              <AccordianItem
                value="1"
                trigger="What Kind of customer support can i expect?"
              >
                our customer support team is here to help with all your
                questions. you get access to chat and email support.
              </AccordianItem>
              <AccordianItem
                value="2"
                trigger="What Kind of customer support can i expect?"
              >
                our customer support team is here to help with all your
                questions. you get access to chat and email support.
              </AccordianItem>
              <AccordianItem
                value="3"
                trigger="What Kind of customer support can i expect?"
              >
                our customer support team is here to help with all your
                questions. you get access to chat and email support.
              </AccordianItem>
              <AccordianItem
                value="4"
                trigger="What Kind of customer support can i expect?"
              >
                our customer support team is here to help with all your
                questions. you get access to chat and email support.
              </AccordianItem>
            </Accordian>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}

function Testimonials() {
  const testimonials = [
    {
      name: "John Doe",
      title: "Full Stack Developer",
      text: "The interview tips and practice questions were exactly what I needed. Highly recommend!",
      imgSrc:
        "https://images.unsplash.com/photo-1633796250021-4b8b53c3a6e0?q=80&w=1896&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "John Doe",
      title: "Software Engineer",
      text: "This platform helped me prepare for my job interviews effectively.",
      imgSrc:
        "https://images.unsplash.com/photo-1685703206477-aa1df00a1f0e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Jane Smith",
      title: "UI/UX Designer",
      text: "Great resources and coaching sessions that boosted my confidence.",
      imgSrc:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
    },
    {
      name: "Alice Johnson",
      title: "Product Manager",
      text: "The personalized coaching sessions were a game changer for my career. Highly recommend!",
      imgSrc:
        "https://images.unsplash.com/photo-1663079974166-b154aac575d6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Michael Brown",
      title: "Data Scientist",
      text: "The resume building tools and interview prep resources are top-notch.",
      imgSrc:
        "https://images.unsplash.com/photo-1719425061941-16d3384f6096?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Emily Davis",
      title: "Marketing Specialist",
      text: "I landed my dream job thanks to the comprehensive preparation tools available here.",
      imgSrc:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
    },
    {
      name: "Robert Wilson",
      title: "Sales Manager",
      text: "Excellent platform with great resources for job seekers at all levels.",
      imgSrc:
        "https://images.unsplash.com/photo-1720663929380-d4ec24253069?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Sarah Lee",
      title: "Human Resources",
      text: "The career development articles and videos were incredibly helpful.",
      imgSrc:
        "https://images.unsplash.com/photo-1606704429734-141fb1ec9278?q=80&w=1905&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <Section className="flex flex-col">
      <div className="w-full text-center">
        <H3 className="text-primaryIndigo font-spaceGrotesk font-bold leading-none capitalize">
          Hear what our customers <br /> have to say{" "}
        </H3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  sm:ga-4 gap-6 pt-12">
        {testimonials.slice(0, 4).map((testimonial, index) => (
          <TestimonialCard
            key={index}
            name={testimonial.name}
            title={testimonial.title}
            text={testimonial.text}
            imgSrc={testimonial.imgSrc}
          />
        ))}
      </div>
    </Section>
  );
}

function TestimonialCard({ name, title, text, imgSrc }) {
  return (
    <div className="flex flex-col p-4 items-stretch gap-4 rounded-2xl border-slate-200 border-2 justify-start place-content-start">
      <div className="flex gap-2">
        <div id="img" className="rounded-full bg-slate-400 w-12 h-12">
          <img
            src={imgSrc}
            alt=""
            className="rounded-full bg-slate-400 w-12 h-12 object-cover"
          />
        </div>
        <div className="flex flex-col gap-0 place-content-center">
          <H6 className="leading-0 text-slate-700 text-justify	font-semibold ">
            {name}
          </H6>
          <Caption className="leading-0 text-slate-600 text-justify	font-medium ">
            {title}
          </Caption>
        </div>
      </div>
      <div className="px-2">
        <Body className="text-slate-500 text-justify	font-normal ">{text}</Body>
      </div>
    </div>
  );
}

TestimonialCard.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

// ===========================================
function TestimonialCard2({ imgSrc, name, title, text }) {
  return (
    <Card
      shadow={false}
      className="rounded-2xl  border-slate-200 border-2  p-6"
    >
      <CardHeader color="transparent" floated={false} shadow={false}>
        <H6 className="leading-0 text-slate-700 text-justify	font-semibold ">
          {name}
        </H6>
      </CardHeader>
      <CardBody className="px-4 py-0 flex flex-wrap-reverse gap-x-6 justify-between items-center">
        <div>
          <Caption className="leading-0 text-slate-600 text-justify	font-medium ">
            {title}
          </Caption>
          <Body className="text-slate-500 text-justify	font-normal ">
            {text}
          </Body>
        </div>
        {/* <img src={imgSrc} className="max-w-[8rem]" alt={name} /> */}
      </CardBody>
    </Card>
  );
}

function TestimonialSection16() {
  const testimonials = [
    {
      name: "John Doe",
      title: "Full Stack Developer",
      text: "The interview tips and practice questions were exactly what I needed. Highly recommend!",
      imgSrc:
        "https://images.unsplash.com/photo-1633796250021-4b8b53c3a6e0?q=80&w=1896&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Michael Brown",
      title: "Software Engineer",
      text: "This platform helped me prepare for my job interviews effectively.",
      imgSrc:
        "https://images.unsplash.com/photo-1685703206477-aa1df00a1f0e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Jane Smith",
      title: "UI/UX Designer",
      text: "Great resources and coaching sessions that boosted my confidence.",
      imgSrc:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
    },
    {
      name: "Alice Johnson",
      title: "Product Manager",
      text: "The personalized coaching sessions were a game changer for my career. Highly recommend!",
      imgSrc:
        "https://images.unsplash.com/photo-1663079974166-b154aac575d6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <Section className="px-8 py-10 lg:py-28">
      <div className="container mx-auto">
        <div className="w-full text-center pb-6">
          <H3 className="text-primaryIndigo font-spaceGrotesk font-bold leading-none capitalize">
            Hear what our customers <br /> have to say
          </H3>
        </div>
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
          {testimonials.map((props, key) => (
            <TestimonialCard2 key={key} {...props} />
          ))}
        </div>

        {/* <Card
          shadow={false}
          className="mt-8 bg-gray-100/50 text-center rounded-2xl p-6"
        >
          <CardHeader color="transparent" floated={false} shadow={false}>
            <Typography
              color="blue-gray"
              className="mb-4 !text-2xl lg:!text-3xl max-w-4xl !leading-snug mx-auto font-bold"
            >
              &quot;Its intuitive design and powerful features make it
              indispensable. I can&apos;t imagine going back to life before
              it!&quot;
            </Typography>
          </CardHeader>
          <CardBody className="items-center mx-auto py-2">
            <img
              src="/image/spotify.svg"
              className="max-w-[8rem] mx-auto grayscale"
              alt="spotify"
            />
            <Typography variant="h6" color="blue-gray">
              Emma Roberts
            </Typography>
            <Typography
              variant="paragraph"
              className="font-normal !text-gray-500"
            >
              Chief Executive @Spotify
            </Typography>
          </CardBody>
        </Card> */}
      </div>
    </Section>
  );
}

export default Home;
