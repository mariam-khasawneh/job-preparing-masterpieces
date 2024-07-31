// import React from "react";
// import { Link } from "react-router-dom";
// import { Box, MessageSquare, Users } from "react-feather";

// function Sidebar() {
//   const SIDEBAR_LINKS = [
//     { id: 1, path: "/dashboard/home", name: "Dashboard", icon: Box },
//     { id: 2, path: "/dashboard/members", name: "Members", icon: Users },
//     {
//       id: 3,
//       path: "/dashboard/messages",
//       name: "Messages",
//       icon: MessageSquare,
//     },
//   ];

//   return (
//     <div className="w-16 md:w-56 fixed left-0 top-0 z-10 h-screen pt-8 px-4 bg-primaryIndigo rounded-r-2xl">
//       {/* logo */}
//       <div>
//         <img src="/logo.svg" alt="logo" className="w-28 hidden md:flex" />
//         <img src="/logo_mini.svg" alt="logo" className="w-8 flex md:hidden" />
//       </div>
//       {/* logo */}

//       {/* navigation Links  */}
//       <ul className="mt-6 space-y-6 ">
//         {SIDEBAR_LINKS.map((link) => (
//           <li
//             key={link.id}
//             className={`font-medium rounded-md py-2 px-4 text-indigo-50  hover:bg-custom-rgba `}
//           >
//             <Link
//               to={link.path}
//               className="flex items-center md:justify-start  md:space-x-5"
//             >
//               <link.icon />
//               <span className="text-sm hidden invisible md:flex md:visible">
//                 {link.name}
//               </span>
//             </Link>
//           </li>
//         ))}
//       </ul>
//       {/* navigation Links  */}

//       <div className="w-full absolute bottom-5 left-0 px-4 py-2 cursor-pointer text-center">
//         <p className="flex gap-1 items-center space-x2 text-xs py-2 px-5 font-semibold rounded-2xl  text-primaryIndigo bg-primaryYellow hover:bg-hoverYellow">
//           <span>?</span>
//           <span>Need Help</span>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;

import React, { useState } from "react";

// ICONS //
import { LuBox, LuUser, LuMessageSquare } from "react-icons/lu";
import { Link } from "react-router-dom";
// ICONS //

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(0);
  const handleLinkClick = (index) => {
    setActiveLink(index);
  };
  const SIDEBAR_LINKS = [
    { id: 1, path: "/dashboard/home", name: "Dashboard", icon: LuBox },
    { id: 2, path: "/dashboard/members", name: "Members", icon: LuUser },
    {
      id: 3,
      path: "/dashboard/messages",
      name: "Messages",
      icon: LuMessageSquare,
    },
  ];
  return (
    <div className="w-16 md:w-56 fixed left-0 top-0 z-10 h-screen pt-8 px-4 bg-primaryIndigo rounded-r-2xl">
      {/* logo */}
      <div className="mb-8">
        <img src="/logo.svg" alt="logo" className="w-28 hidden md:flex" />
        <img src="/logo_mini.svg" alt="logo" className="w-8 flex md:hidden" />
      </div>
      {/* logo */}
      {/* Navigation Links */}
      <ul className="mt-6 space-y-6 ">
        {SIDEBAR_LINKS.map((link, index) => (
          <li
            key={index}
            className={`font-medium rounded-md py-2 px-4 text-indigo-50  hover:bg-custom-rgba 
              ${
                activeLink === index
                  ? " bg-custom-rgba border border-indigo-300 "
                  : ""
              }`}
          >
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
          </li>
        ))}
      </ul>
      {/* Navigation Links */}
      <div className="w-full absolute bottom-5 left-0 px-4 py-2 cursor-pointer text-center">
        <p className="flex gap-1 items-center space-x2 text-xs py-2 px-5 font-semibold rounded-2xl  text-primaryIndigo bg-primaryYellow hover:bg-hoverYellow">
          <span>?</span> <span className="hidden md:flex">Need Help</span>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
