// Sidebar Component
import {
  X,
  Activity,
  Users,
  MessageSquare,
  FileText,
  Utensils,
  Flag,
  Menu,
  Video,
  Play,
  UserPen,
  UserPlus,
  User,
  SquarePlus,
} from "lucide-react";
const Sidebar = ({
  setActivePage,
  activePage,
  isSidebarOpen,
  toggleSidebar,
}) => (
  <div
    className={`bg-primaryIndigo text-white h-screen rounded-r-2xl px-2 ${
      isSidebarOpen ? "w-56" : "w-20"
    } transition-all duration-300 ease-in-out`}
  >
    <div className="py-4 pl-2 flex justify-between items-center">
      {isSidebarOpen && <h2 className="text-2xl font-bold">Profile</h2>}
      <button
        onClick={toggleSidebar}
        className="p-2 hover:bg-custom-rgba rounded w-12 flex justify-center"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </div>
    <nav className="mt-8">
      <ul>
        {[
          { name: "Overview", icon: <Activity size={20} /> },
          { name: "Account", icon: <UserPen size={20} /> },
          { name: "Sessions", icon: <Video size={20} /> },
          { name: "Courses", icon: <Play size={20} /> },
          { name: "Coach Request", icon: <UserPlus size={20} /> },
          { name: "Coach Profile", icon: <User size={20} /> },
          { name: "Create Service", icon: <SquarePlus size={20} /> },
        ].map((item) => (
          <li key={item.name} className="mb-2">
            <button
              onClick={() => setActivePage(item.name)}
              className={`flex items-center space-x-4 w-full p-3 transition-colors duration-200 font-medium rounded-md py-2 px-4 text-indigo-50  hover:bg-custom-rgba  ${
                activePage === item.name
                  ? " bg-custom-rgba border border-indigo-300"
                  : ""
              }`}
            >
              {item.icon}
              {isSidebarOpen && <span>{item.name}</span>}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  </div>
);

export default Sidebar;
