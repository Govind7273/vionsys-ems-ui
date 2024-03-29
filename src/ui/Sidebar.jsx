import { Button } from "antd";
import { HiHome, HiUsers, HiOutlineClipboardList } from "react-icons/hi";
import { BiTask } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoNotificationsCircle } from "react-icons/io5";
import getUserIdRole from "../utils/getUserIdRole";
import { Link } from "react-router-dom";
/*
TODO:
  password reset & email verification functionality
  USER: add tasks functionality
  ADMIN: delete edit users
*/
const Sidebar = ({ isMobile }) => {
  const { role } = getUserIdRole();
  return (
    <div
      className={`${
        !isMobile ? "hidden" : ""
      }  sm:block h-full dark:bg-slate-800 dark:text-slate-100 bg-slate-100 text-slate-800 p-4`}
    >
      <h1 className="mb-4 text-2xl text-center">Vionsys</h1>
      <div className="flex flex-col gap-2">
        <Button className="text-left text-lg " icon={<HiHome />}>
          <Link to="/">Home</Link>
        </Button>
        {role == "user" && (
          <div className="flex flex-col gap-2 justify-center ">
            <Button className="text-left text-lg" icon={<BiTask />}>
              <Link to="/taskpage">Task</Link>
            </Button>
            <Button
              className="text-left text-lg"
              icon={<IoNotificationsCircle />}
            >
              <Link to="/notifications">Notifications</Link>
            </Button>
            <Button className="text-left text-lg" icon={<FaRegCalendarAlt />}>
              <Link to="/LeavesPage">Leaves</Link>
            </Button>
            <Button className="text-left text-lg" icon={<FaHistory />}>
              <Link to="/LeavesHistory">Leaves History</Link>
            </Button>
          </div>
        )}

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
