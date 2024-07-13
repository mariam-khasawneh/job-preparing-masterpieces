import { NavLink, Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Button from "../Button/Button";
import { Body } from "../Typography-components/Typography";

function Navbar() {
  return (
    <div className={styles.nav}>
      <ul className={styles.navLinks}>
        <li>
          <NavLink to="home" className={styles.navLink}>
            <Body>Home</Body>
          </NavLink>
        </li>
        <li>
          <NavLink to="/featuers" className={styles.navLink}>
            <Body>Featuers</Body>
          </NavLink>
        </li>
        <li>
          <NavLink to="/resources" className={styles.navLink}>
            <Body>Resources</Body>
          </NavLink>
        </li>
        <li>
          <NavLink to="/how-It-work" className={styles.navLink}>
            <Body>How It Work</Body>
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={styles.navLink}>
            <Body>Conatct</Body>
          </NavLink>
        </li>
        <li>
          <NavLink to="/pricing" className={styles.navLink}>
            <Body>Pricing</Body>
          </NavLink>
        </li>
      </ul>
      <ul className={styles.navButtons}>
        <li>
          <Link to="/login">
            <Button primary extraSmall>
              <Body>Login</Body>
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/signup">
            <Button secondary extraSmall>
              <Body> Get Started</Body>
            </Button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
