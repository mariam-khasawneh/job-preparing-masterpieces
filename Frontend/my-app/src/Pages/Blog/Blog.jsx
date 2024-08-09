import { Section } from "../../Components/styles-components/containers";
import {
  H1,
  H5,
  H6,
  Body,
  Caption,
} from "../../Components/Typography-components/Typography";
import img from "../../Images/stress.jpg";
import { Link } from "react-router-dom";

function Blog() {
  return (
    <Section className="justify-center">
      <div className="w-full sm:w-2/3">
        <BlogHeader />
        <Articles />
      </div>
    </Section>
  );
}

function BlogHeader() {
  return (
    <div className="w-full text-center flex flex-col place-items-center gap-4 pb-28">
      <H1 className="font-extrabold text-primaryIndigo font-spaceGrotesk">
        Blog
      </H1>
      <H5 className="w-full sm:w-3/4">
        <Body className="text-slate-500 font-medium text-center">
          Discover the latest news, tips, and expert insights on career
          preparation, including job search strategies, interview techniques,
          success stories, and valuable resources to help you achieve your
          career goals.
        </Body>
      </H5>
    </div>
  );
}

function Articles() {
  return (
    <div className="flex flex-col sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
    </div>
  );
}

function BlogCard() {
  return (
    <Link to="/article">
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-4 rounded-2xl border-slate-200 border-2 items-center justify-center content-center place-items-center p-4">
        <div id="img" className="h-full w-auto">
          <img
            src={img}
            alt="Artical image"
            className="rounded-2xl h-full w-auto"
          />
        </div>
        <div id="content" className=" md:col-span-2 flex flex-col gap-4">
          <H6 id="artical-name" className="font-bold text-hoverIndigo">
            How to manage stress at my work
          </H6>
          <Body className="line-clamp-2 font-medium text-slate-500">
            Explore practical strategies for managing workplace stress
            effectively. This article provides actionable tips on identifying
            stress triggers, implementing stress-reduction techniques, and
            maintaining a healthy work-life balance. Discover how to create a
            more productive and positive work environment by mastering stress
            management skills.
          </Body>
          <div className="flex gap-2 items-center">
            <div className="h-8 w-8 rounded-full">
              <img src={img} alt="" className="w-full h-full rounded-full" />
            </div>
            <Caption className="text-slate-600 font-medium">User Name</Caption>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default Blog;
