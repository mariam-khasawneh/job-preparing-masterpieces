import React from "react";

//icons

import { Box, MessageSquare, Calendar, User, Users } from "react-feather";
function Sidebar() {
  const SIDEBAR_LINKS = [
    { id: 1, path: "/", name: "Dashboard", icon: Box },
    { id: 2, path: "/members", name: "Members", icon: Users },
    { id: 3, path: "/messages", name: "Messages", icon: MessageSquare },
    { id: 5, path: "/", name: "Dashboard", icon: Box },
    { id: 6, path: "/", name: "Dashboard", icon: Box },
  ];

  return (
    <div>
      {/* logo */}
      <div>
        <img src="" alt="" />
      </div>
    </div>
  );
}

export default Sidebar;
