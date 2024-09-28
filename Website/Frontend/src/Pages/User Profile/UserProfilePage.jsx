import React, { useState } from "react";
import Sidebar from "./Sidebar";
import OverViewPage from "./OverViewPage";
import SessionsPage from "./SessionsPage";
import CoursesPage from "./CoursesPage";
import Account from "./Account";
import CoachRequestForm from "./CoachRequestForm";
import CoachProfileSettings from "../CoachProfile/CoachProfileSettings";
import { House } from "lucide-react";
import { Helmet } from "react-helmet-async";

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
      case "Account":
        return <Account />;
      case "Coach Request":
        return <CoachRequestForm />;
      case "Coach Profile":
        return <CoachProfileSettings />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <>
      <Helmet>
        <title>JobReady | User Profile Page</title>
      </Helmet>
      <div className="flex h-screen">
        <Sidebar
          setActivePage={setActivePage}
          activePage={activePage}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <div className="flex-1 flex flex-col overflow-auto">
          <header className="shadow-sm p-4 fixed top-0  w-full bg-primarybackground z-10 flex justify-between">
            <h1 className="text-2xl font-bold text-gray-800">{activePage}</h1>
            <House />
          </header>
          <main className="pt-20 p-6 flex-1">{renderActivePage()}</main>
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
