import React, { useState } from "react";
import Sidebar from "./Sidebar";
import OverViewPage from "./OverViewPage";
import SessionsPage from "./SessionsPage";
import CoursesPage from "./CoursesPage";

const UserProfilePage = () => {
  const [activePage, setActivePage] = useState("Overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderActivePage = () => {
    switch (activePage) {
      case "Overview":
        return <OverViewPage />;
      case "Sessions":
        return <SessionsPage />;
      case "Courses":
        return <CoursesPage />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="flex h-screen ">
      <Sidebar
        setActivePage={setActivePage}
        activePage={activePage}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 overflow-auto">
        <header className="shadow-sm p-4">
          <h1 className="text-2xl font-bold text-gray-800">{activePage}</h1>
        </header>
        <main className="p-6">{renderActivePage()}</main>
      </div>
    </div>
  );
};

export default UserProfilePage;
