import { NavLink, Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Button from "../Button/Button";
import { Caption } from "../Typography-components/Typography";

function Navbar() {
  return (
    <div className={styles.nav}>
      <ul className={styles.navLinks}>
        <li>
          <NavLink to="home" className={styles.navLink}>
            <Caption>Home</Caption>
          </NavLink>
        </li>
        <li>
          <NavLink to="/featuers" className={styles.navLink}>
            <Caption>Featuers</Caption>
          </NavLink>
        </li>
        <li>
          <NavLink to="/resources" className={styles.navLink}>
            <Caption>Resources</Caption>
          </NavLink>
        </li>
        <li>
          <NavLink to="/how-It-work" className={styles.navLink}>
            <Caption>How It Work</Caption>
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={styles.navLink}>
            <Caption>Conatct</Caption>
          </NavLink>
        </li>
        <li>
          <NavLink to="/pricing" className={styles.navLink}>
            <Caption>Pricing</Caption>
          </NavLink>
        </li>
      </ul>
      <ul className={styles.navButtons}>
        <li>
          <Link to="/login">
            <Button primary extraSmall>
              <Caption>Login</Caption>
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/signup">
            <Button secondary extraSmall>
              <Caption> Get Started</Caption>
            </Button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
