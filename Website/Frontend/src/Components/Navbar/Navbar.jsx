// import React, { useEffect, useState } from "react";
// import { NavLink, Link } from "react-router-dom";
// import styles from "./Navbar.module.css";
// import Button from "../Button/Button";
// import { Caption } from "../Typography-components/Typography";
// import Cookies from "js-cookie";

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     // Check if the token is present in cookies
//     const token = Cookies.get("token");
//     setIsLoggedIn(!!token);
//   }, []);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const handelLogout = () => {
//     // Clear the token from cookies
//     Cookies.remove("tooken");
//     setIsLoggedIn(false);
//   };

//   // Array of nav links
//   const navLinks = [
//     { name: "Home", path: "/home" },
//     { name: "Courses", path: "/courses" },
//     { name: "Coaching", path: "/coaching" },
//     { name: "Contact", path: "/contact" },
//     { name: "Blog", path: "/blog" },
//   ];

//   return (
//     <nav className={styles.nav}>
//       <div className={styles.logo}>
//         {/* Add your logo here */}
//         <span>Logo</span>
//       </div>
//       <div className={`${styles.navContent} ${isOpen ? styles.open : ""}`}>
//         <ul className={styles.navLinks}>
//           {navLinks.map((link, index) => (
//             <li key={index}>
//               <NavLink
//                 to={link.path}
//                 className={styles.navLink}
//                 onClick={toggleMenu}
//               >
//                 <Caption>{link.name}</Caption>
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//         <ul className={styles.navButtons}>
//           {!isLoggedIn && (
//             <>
//               <li>
//                 <Link to="/login">
//                   <Button secondary extraSmall>
//                     <Caption>Login</Caption>
//                   </Button>
//                 </Link>
//               </li>{" "}
//               <li>
//                 <Link to="/signup">
//                   <Button secondary extraSmall>
//                     <Caption>Get Started</Caption>
//                   </Button>
//                 </Link>
//               </li>
//             </>
//           )}
//           {isLoggedIn && (
//             <li>
//               <Button primary extraSmall onClick={handelLogout}>
//                 <Caption>Logout</Caption>
//               </Button>
//             </li>
//           )}
//         </ul>
//         {/* <ul className={styles.navButtons}>
//           <li>
//             <Link to="/login">
//               <Button secondary extraSmall>
//                 <Caption>Login</Caption>
//               </Button>
//             </Link>
//           </li>
//           <li>
//             <Link to="/signup">
//               <Button primary extraSmall>
//                 <Caption>Get Started</Caption>
//               </Button>
//             </Link>
//           </li>
//           <li>
//             <Button primary extraSmall>
//               <Caption>Logout</Caption>
//             </Button>
//           </li>
//         </ul> */}
//       </div>
//       <div className={styles.hamburger} onClick={toggleMenu}>
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>
//     </nav>
//   );
// }
// // export default Navbar;
// import React, { useState, useEffect } from "react";
// import { NavLink, Link } from "react-router-dom";
// import styles from "./Navbar.module.css";
// import Button from "../Button/Button";
// import { Caption } from "../Typography-components/Typography";
// import Cookies from "js-cookie";

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     // Check if token is present in cookies
//     const token = Cookies.get("token");
//     setIsLoggedIn(!!token);
//   }, []);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleLogout = () => {
//     // Clear the token from cookies
//     Cookies.remove("token");
//     setIsLoggedIn(false);
//     // Optionally, navigate to login page or homepage after logout
//   };

//   // Array of nav links
//   const navLinks = [
//     { name: "Home", path: "/home" },
//     { name: "Courses", path: "/courses" },
//     { name: "Coaching", path: "/coaching" },
//     { name: "Contact", path: "/contact" },
//     { name: "Blog", path: "/blog" },
//   ];

//   return (
//     <nav className={styles.nav}>
//       <div className={styles.logo}>
//         {/* Add your logo here */}
//         <span>Logo</span>
//       </div>
//       <div className={`${styles.navContent} ${isOpen ? styles.open : ""}`}>
//         <ul className={styles.navLinks}>
//           {navLinks.map((link, index) => (
//             <li key={index}>
//               <NavLink
//                 to={link.path}
//                 className={styles.navLink}
//                 onClick={toggleMenu}
//               >
//                 <Caption>{link.name}</Caption>
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//         <ul className={styles.navButtons}>
//           {!isLoggedIn && (
//             <>
//               <li>
//                 <Link to="/login">
//                   <Button secondary extraSmall>
//                     <Caption>Login</Caption>
//                   </Button>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/signup">
//                   <Button primary extraSmall>
//                     <Caption>Get Started</Caption>
//                   </Button>
//                 </Link>
//               </li>
//             </>
//           )}
//           {isLoggedIn && (
//             <li>
//               <Button primary extraSmall onClick={handleLogout}>
//                 <Caption>Logout</Caption>
//               </Button>
//             </li>
//           )}
//         </ul>
//       </div>
//       <div className={styles.hamburger} onClick={toggleMenu}>
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import { NavLink, Link, useNavigate } from "react-router-dom";
// import styles from "./Navbar.module.css";
// import Button from "../Button/Button";
// import { Caption } from "../Typography-components/Typography";
// import Cookies from "js-cookie";

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isMediumScreen, setIsMediumScreen] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = Cookies.get("token");
//     console.log("token in navbar:", token);
//     setIsLoggedIn(!!token);

//     const checkScreenSize = () => {
//       setIsMediumScreen(window.innerWidth >= 768 && window.innerWidth < 1024);
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleLogout = () => {
//     Cookies.remove("token");
//     setIsLoggedIn(false);
//     navigate("/");
//   };

//   // Array of nav links
//   const navLinks = [
//     { name: "Home", path: "/home" },
//     { name: "Courses", path: "/courses" },
//     { name: "Coaching", path: "/coaching" },
//     { name: "Contact", path: "/contact" },
//     { name: "Blog", path: "/blog" },
//   ];

//   return (
//     <nav className={styles.nav}>
//       <div className={styles.logo}>
//         <span>Logo</span>
//       </div>
//       <div className={`${styles.navContent} ${isOpen ? styles.open : ""}`}>
//         <ul className={styles.navLinks}>
//           {navLinks.map((link, index) => (
//             <li key={index}>
//               <NavLink
//                 to={link.path}
//                 className={styles.navLink}
//                 onClick={toggleMenu}
//               >
//                 <Caption>{link.name}</Caption>
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//         <ul className={styles.navButtons}>
//           {!isLoggedIn && (
//             <>
//               <li>
//                 <Link to="/login">
//                   <Button secondary extraSmall>
//                     <Caption>Login</Caption>
//                   </Button>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/signup">
//                   <Button primary extraSmall>
//                     <Caption>Get Started</Caption>
//                   </Button>
//                 </Link>
//               </li>
//             </>
//           )}
//           {isLoggedIn && (
//             <li>
//               <Button primary extraSmall onClick={handleLogout}>
//                 <Caption>Logout</Caption>
//               </Button>
//             </li>
//           )}
//         </ul>
//       </div>
//       <div className={styles.hamburger} onClick={toggleMenu}>
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

//////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import { NavLink, Link, useNavigate } from "react-router-dom";
// import styles from "./Navbar.module.css";
// import Button from "../Button/Button";
// import { Caption } from "../Typography-components/Typography";
// import Cookies from "js-cookie";

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isMediumScreen, setIsMediumScreen] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkLoginStatus = () => {
//       const token = Cookies.get("token");
//       console.log("token in navbar:", token);
//       setIsLoggedIn(!!token);
//     };

//     const checkScreenSize = () => {
//       setIsMediumScreen(window.innerWidth >= 768 && window.innerWidth < 1024);
//     };

//     checkLoginStatus();
//     checkScreenSize();

//     window.addEventListener("resize", checkScreenSize);
//     window.addEventListener("storage", checkLoginStatus); // Listen for localStorage changes

//     return () => {
//       window.removeEventListener("resize", checkScreenSize);
//       window.removeEventListener("storage", checkLoginStatus);
//     };
//   }, []);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleLogout = () => {
//     Cookies.remove("token");
//     setIsLoggedIn(false);
//     navigate("/");
//   };

//   // Array of nav links
//   const navLinks = [
//     { name: "Home", path: "/home" },
//     { name: "Courses", path: "/courses" },
//     { name: "Coaching", path: "/coaching" },
//     { name: "Contact", path: "/contact" },
//     { name: "Blog", path: "/blog" },
//   ];

//   return (
//     <nav className={styles.nav}>
//       <div className={styles.logo}>
//         <span>Logo</span>
//       </div>
//       <div className={`${styles.navContent} ${isOpen ? styles.open : ""}`}>
//         <ul className={styles.navLinks}>
//           {navLinks.map((link, index) => (
//             <li key={index}>
//               <NavLink
//                 to={link.path}
//                 className={styles.navLink}
//                 onClick={toggleMenu}
//               >
//                 <Caption>{link.name}</Caption>
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//         <ul className={styles.navButtons}>
//           {!isLoggedIn ? (
//             <>
//               <li>
//                 <Link to="/login">
//                   <Button secondary extraSmall>
//                     <Caption>Login</Caption>
//                   </Button>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/signup">
//                   <Button primary extraSmall>
//                     <Caption>Get Started</Caption>
//                   </Button>
//                 </Link>
//               </li>
//             </>
//           ) : (
//             <li>
//               <Button primary extraSmall onClick={handleLogout}>
//                 <Caption>Logout</Caption>
//               </Button>
//             </li>
//           )}
//         </ul>
//       </div>
//       <div className={styles.hamburger} onClick={toggleMenu}>
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

// ===================

import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import Button from "../Button/Button";
import { Caption } from "../Typography-components/Typography";
import { useAuth, useLogout } from "../../Context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const { isLoggedIn, checkLoginStatus } = useAuth();
  const handleLogout = useLogout();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMediumScreen(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    // Check login status when component mounts
    checkLoginStatus();

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [checkLoginStatus]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
            <li>
              <Button primary extraSmall onClick={handleLogout}>
                <Caption>Logout</Caption>
              </Button>
            </li>
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
