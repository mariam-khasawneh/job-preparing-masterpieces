import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Button from "../../Components/Button/Button";
import {
  Section,
  Wrapper,
} from "../../Components/styles-components/containers";
import {
  H6,
  Body,
  H1,
  H2,
} from "../../Components/Typography-components/Typography.jsx";

// Page Component
function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
    </>
  );
}

// Sections Components
function HeroSection() {
  return (
    <div>
      <Section className={styles.heroSection}>
        <Wrapper dark className={styles.heroWrapper}>
          <div className={styles.heroSwitcher}>
            <H6>Job Seeker</H6>
            <div className={styles.switcher}>
              <div className={styles.switchweCircle}></div>
            </div>
            <H6>Job Coach</H6>
          </div>
          <div className={styles.heroContent}>
            <H1 className={styles.heroDisplay}>
              Unlock Your Potential as a Job Coach with JobPortal
            </H1>
            <Body className={styles.heroBody}>
              Enhance Coaching Practice, Connect with Clients, and Maximize
              Impact in Career Development
            </Body>
          </div>
          <div className={styles.heroBtns}>
            <Link to="/login">
              <Button primary extraSmall>
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button secondary extraSmall>
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
    <>
      <Section className={styles.aboutSection}>
        <Wrapper className={styles.aboutContentWrapper}>
          <H2 className={styles.aboutHeading}>
            What Is <br></br> JobPortal ?
          </H2>
          <H6 className={styles.aboutBody}>
            JobPortal offers job coaches a powerful platform to enhance their
            coaching practice, connect with clients, and maximize their impact
            in career development. As a job coach on JobPortal, you gain access
            to a suite of tools and resources designed to streamline your
            coaching process and elevate your services.
          </H6>
        </Wrapper>
        <Wrapper className={styles.aboutImgtWrapper}></Wrapper>
      </Section>
    </>
  );
}

export { AboutSection, HeroSection, Home };
