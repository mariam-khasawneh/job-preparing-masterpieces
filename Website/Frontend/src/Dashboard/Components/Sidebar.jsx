// import React, { useState } from "react";

// // ICONS //
// import {
//   LuBox,
//   LuUser,
//   LuMessageSquare,
//   LuArrowRightSquare,
// } from "react-icons/lu";
// import { Link } from "react-router-dom";
// // ICONS //

// const Sidebar = () => {
//   const [activeLink, setActiveLink] = useState(0);
//   const handleLinkClick = (index) => {
//     setActiveLink(index);
//   };
//   const SIDEBAR_LINKS = [
//     { id: 1, path: "/dashboard/home", name: "Dashboard", icon: LuBox },
//     { id: 2, path: "/dashboard/members", name: "Members", icon: LuUser },
//     {
//       id: 3,
//       path: "/dashboard/messages",
//       name: "Messages",
//       icon: LuMessageSquare,
//     },
//     {
//       id: 4,
//       path: "/dashboard/coach-requests",
//       name: "Coach Requests",
//       icon: LuArrowRightSquare,
//     },
//   ];
//   return (
//     <div className="w-16 md:w-56 fixed left-0 top-0 z-10 h-screen pt-8 px-4 bg-primaryIndigo rounded-r-2xl">
//       {/* logo */}
//       <div className="mb-8">
//         <img src="/logo.svg" alt="logo" className="w-28 hidden md:flex" />
//         <img src="/logo_mini.svg" alt="logo" className="w-8 flex md:hidden" />
//       </div>
//       {/* logo */}
//       {/* Navigation Links */}
//       <ul className="mt-6 space-y-6 ">
//         {SIDEBAR_LINKS.map((link, index) => (
//           <li
//             key={index}
//             className={`font-medium rounded-md py-2 px-4 text-indigo-50  hover:bg-custom-rgba
//               ${
//                 activeLink === index
//                   ? " bg-custom-rgba border border-indigo-300 "
//                   : ""
//               }`}
//           >
//             <Link
//               to={link.path}
//               className="flex justify-center md:justify-start items-center md:space-x-5"
//               onClick={() => handleLinkClick(index)}
//             >
//               <span>{link.icon()}</span>
//               <span className="text-sm hidden invisible md:flex md:visible">
//                 {link.name}
//               </span>
//             </Link>
//           </li>
//         ))}
//       </ul>
//       {/* Navigation Links */}
//       <div className="w-full absolute bottom-5 left-0 px-4 py-2 cursor-pointer text-center">
//         <p className="flex gap-1 items-center space-x2 text-xs py-2 px-5 font-semibold rounded-2xl  text-primaryIndigo bg-primaryYellow hover:bg-hoverYellow">
//           <span>?</span> <span className="hidden md:flex">Need Help</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import {
  LuBox,
  LuUser,
  LuMessageSquare,
  LuArrowRightSquare,
  LuChevronDown,
  LuChevronUp,
  LuUsers,
  LuUserCheck,
} from "react-icons/lu";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(0);
  const [membersExpanded, setMembersExpanded] = useState(false);

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const toggleMembersAccordion = () => {
    setMembersExpanded(!membersExpanded);
  };

  const SIDEBAR_LINKS = [
    { id: 1, path: "/dashboard/home", name: "Dashboard", icon: LuBox },
    {
      id: 2,
      name: "Members",
      icon: LuUser,
      subItems: [
        {
          id: 21,
          path: "/dashboard/members/users",
          name: "Users",
          icon: LuUsers,
        },
        {
          id: 22,
          path: "/dashboard/members/coaches",
          name: "Coaches",
          icon: LuUserCheck,
        },
      ],
    },
    {
      id: 3,
      path: "/dashboard/messages",
      name: "Messages",
      icon: LuMessageSquare,
    },
    {
      id: 4,
      path: "/dashboard/coach-requests",
      name: "Coach Requests",
      icon: LuArrowRightSquare,
    },
  ];

  return (
    <div className="w-16 md:w-56 fixed left-0 top-0 z-10 h-screen pt-8 px-4 bg-primaryIndigo rounded-r-2xl">
      {/* logo */}
      <div className="mb-8">
        <img src="/logo.svg" alt="logo" className="w-28 hidden md:flex" />
        <img src="/logo_mini.svg" alt="logo" className="w-8 flex md:hidden" />
      </div>
      {/* Navigation Links */}
      <ul className="mt-6 space-y-2">
        {SIDEBAR_LINKS.map((link, index) => (
          <li
            key={link.id}
            className={`font-medium rounded-md py-2 px-4 text-indigo-50 hover:bg-custom-rgba 
              ${
                activeLink === index && !link.subItems
                  ? "bg-custom-rgba border border-indigo-300"
                  : ""
              }`}
          >
            {link.subItems ? (
              <div>
                <button
                  onClick={toggleMembersAccordion}
                  className="w-full flex justify-center md:justify-between items-center md:space-x-5"
                >
                  <div className="flex items-center md:space-x-5">
                    <span>{link.icon()}</span>
                    <span className="text-sm hidden invisible md:flex md:visible">
                      {link.name}
                    </span>
                  </div>
                  <span className="hidden md:block">
                    {membersExpanded ? <LuChevronUp /> : <LuChevronDown />}
                  </span>
                </button>
                {membersExpanded && (
                  <ul className="mt-2 ml-4 space-y-2">
                    {link.subItems.map((subItem) => (
                      <li key={subItem.id}>
                        <Link
                          to={subItem.path}
                          className="flex items-center space-x-2 py-1 px-2 rounded-md hover:bg-custom-rgba"
                          onClick={() => handleLinkClick(subItem.id)}
                        >
                          <span>{subItem.icon()}</span>
                          <span className="text-sm hidden invisible md:flex md:visible">
                            {subItem.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link
                to={link.path}
                className="flex justify-center md:justify-start items-center md:space-x-5"
                onClick={() => handleLinkClick(index)}
              >
                <span>{link.icon()}</span>
                <span className="text-sm hidden invisible md:flex md:visible">
                  {link.name}
                </span>
              </Link>
            )}
          </li>
        ))}
      </ul>
      {/* Need Help button */}
      <div className="w-full absolute bottom-5 left-0 px-4 py-2 cursor-pointer text-center">
        <p className="flex gap-1 items-center space-x2 text-xs py-2 px-5 font-semibold rounded-2xl text-primaryIndigo bg-primaryYellow hover:bg-hoverYellow">
          <span>?</span> <span className="hidden md:flex">Need Help</span>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
