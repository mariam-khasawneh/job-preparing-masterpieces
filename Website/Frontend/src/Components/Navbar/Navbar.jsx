import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import Button from "../Button/Button";
import { Caption } from "../Typography-components/Typography";
import { logout, checkAuthState } from "../../Store/authSlice";
import Cookies from "js-cookie";
import axios from "axios";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // const [isMediumScreen, setIsMediumScreen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const checkScreenSize = () => {
  //     setIsMediumScreen(window.innerWidth >= 768 && window.innerWidth < 1024);
  //   };

  //   checkScreenSize();
  //   window.addEventListener("resize", checkScreenSize);

  //   // Check auth state when component mounts
  //   dispatch(checkAuthState());

  //   return () => window.removeEventListener("resize", checkScreenSize);
  // }, [dispatch]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      // Make a request to the server to log out
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      // Dispatch logout action
      dispatch(logout());

      // Clear local state
      localStorage.removeItem("authState");

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Array of nav links
  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Courses", path: "/courses" },
    { name: "Coaching", path: "/coaching" },
    { name: "Contact", path: "/contact" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <span>Logo</span>
      </div>
      <div className={`${styles.navContent} ${isOpen ? styles.open : ""}`}>
        <ul className={styles.navLinks}>
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path}
                className={styles.navLink}
                onClick={toggleMenu}
              >
                <Caption>{link.name}</Caption>
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className={styles.navButtons}>
          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/login">
                  <Button secondary extraSmall>
                    <Caption>Login</Caption>
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <Button primary extraSmall>
                    <Caption>Get Started</Caption>
                  </Button>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/user-profile">
                  <div className="w-8 h-8 rounded-full bg-slate-400"></div>
                </Link>
              </li>
              {/* <li>
                <Button primary extraSmall onClick={handleLogout}>
                  <Caption>Logout</Caption>
                </Button>
              </li> */}
            </>
          )}
        </ul>
      </div>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}

export default Navbar;
