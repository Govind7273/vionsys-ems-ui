import { Button } from "antd";
import { HiHome, HiUsers, HiOutlineClipboardList } from "react-icons/hi";
import getUserIdRole from "../utils/getUserIdRole";
import { Link } from "react-router-dom";
/*
TODO:
  password reset & email verification functionality
  USER: add tasks functionality
  ADMIN: delete edit users
*/
const Sidebar = ({isMobile}) => {
  const { role } = getUserIdRole();
  return (
    <div className={`${!isMobile ? "hidden" : ""}  sm:block h-full dark:bg-slate-800 dark:text-slate-100 bg-slate-100 text-slate-800 p-4`}>
      <h1 className="mb-4 text-2xl text-center">Vionsys</h1>
      <div className="flex flex-col gap-2">
        <Button className="text-left" icon={<HiHome />}>
          <Link to="/">Home</Link>
        </Button>
        {/* <Button className="text-left" icon={<HiHome />}>
          <Link to="/">Task</Link>
        </Button> */}
        
        {role !== "user" && (
          <>
            <Button icon={<HiUsers />}>
              <Link to="/employees">Employees</Link>
            </Button>
            <Button icon={<HiOutlineClipboardList />}>
              <Link to="/attendance">Attendance</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
