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
  H3,
  Display,
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
            <H6 className={styles.switcherText}>Job Seeker</H6>
            <div className={styles.switcher}>
              <div className={styles.switchweCircle}></div>
            </div>
            <H6 className={styles.switcherText}>Job Coach</H6>
          </div>
          <div className={styles.heroContent}>
            <Display className={styles.heroDisplay}>
              Unlock Your Potential as a Job Coach with JobPortal
            </Display>
            <Body className={styles.heroBody}>
              Enhance Coaching Practice, Connect with Clients, and Maximize
              Impact in Career Development
            </Body>
          </div>
          <div className={styles.heroBtnsContainer}>
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
    <>
      <Section className={styles.aboutSection}>
        <Wrapper className={styles.aboutContentWrapper}>
          <H3 className={styles.aboutHeading}>
            What Is <br></br> JobPortal ?
          </H3>
          <Body className={styles.aboutBody}>
            JobPortal offers job coaches a powerful platform to enhance their
            coaching practice, connect with clients, and maximize their impact
            in career development. As a job coach on JobPortal, you gain access
            to a suite of tools and resources designed to streamline your
            coaching process and elevate your services.
          </Body>
        </Wrapper>
        <Wrapper className={styles.aboutImgtWrapper}></Wrapper>
      </Section>
    </>
  );
}

export { AboutSection, HeroSection, Home };
