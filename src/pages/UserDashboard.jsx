import { Link } from "react-router-dom";
import UserProfile from "../ui/user/UserProfile";
import { useState } from "react";
import EmploymentType from "../ui/user/EmploymentType";
import PreviousWork from "../ui/user/PreviousWork";
import JoiningKit from "../ui/user/JoiningKit";
import UserDocuments from "../ui/user/UserDocuments";
const Dashboard = () => {
  const [activeLink, setActiveLink] = useState("Profile");

  const handleSidebarLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="flex h-screen pt-[1px]">
      {/* Sidebar */}
      <div className="flex flex-1 flex-col h-full fixed bg-slate-50 px-8 py-10  gap-2 shadow-md">
        <Link
          className={`flex gap-2 hover:text-blue-400 rounded-md ${activeLink === "Profile" ? "font-bold text-blue-300" : ""
            }`}
          onClick={() => handleSidebarLinkClick("Profile")}
        >
          Profile
        </Link>
        <Link
          className={`flex gap-2 hover:text-blue-400 rounded-md ${activeLink === "Employment Type" ? "font-bold text-blue-300" : ""
            }`}
          onClick={() => handleSidebarLinkClick("Employment Type")}
        >
          Employment Type
        </Link>
        <Link
          className={`flex gap-2 hover:text-blue-400 rounded-md ${activeLink === "Previous Work" ? "font-bold text-blue-300" : ""
            }`}
          onClick={() => handleSidebarLinkClick("Previous Work")}
        >
          Previous work
        </Link>
        <Link
          className={`flex gap-2 hover:text-blue-400 rounded-md ${activeLink === "Joining Kit" ? "font-bold text-blue-300" : ""
            }`}
          onClick={() => handleSidebarLinkClick("Joining Kit")}
        >
          Joining Kit
        </Link>
        <Link
          className={`flex gap-2 hover:text-blue-400 rounded-md ${activeLink === "Documents" ? "font-bold text-blue-300" : ""
            }`}
          onClick={() => handleSidebarLinkClick("Documents")}
        >
          Documents
        </Link>
      </div>

      {/* Content */}
      <div className="p-4 ml-52 flex-1 w-full">
        {activeLink === "Profile" && <UserProfile />}
        {activeLink === "Employment Type" && <EmploymentType />}
        {activeLink === "Previous Work" && <PreviousWork />}
        {activeLink === "Joining Kit" && <JoiningKit />}
        {activeLink === "Documents" && <UserDocuments />}
        {activeLink !== "Profile" &&
          activeLink !== "Employment Type" &&
          activeLink !== "Previous Work" &&
          activeLink !== "Joining Kit" &&
          activeLink !== "Documents" && (
            <div className="text-center">
              <p>No content available for this link</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default Dashboard;
