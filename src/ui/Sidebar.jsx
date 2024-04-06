import { Button } from "antd";
import { HiHome, HiUsers, HiOutlineClipboardList } from "react-icons/hi";
import { BiTask } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";
import { IoNotificationsCircle } from "react-icons/io5";
import getUserIdRole from "../utils/getUserIdRole";
import { BsCalendarEvent } from "react-icons/bs";
import { Link } from "react-router-dom";
import { MdCancelScheduleSend } from "react-icons/md";
import { GoCrossReference } from "react-icons/go";
import { TbActivity } from "react-icons/tb";
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
      className={`${!isMobile ? "hidden" : ""
        }  sm:block h-full dark:bg-slate-800 dark:text-slate-100 bg-slate-100 text-slate-800 p-4`}
    >
      <h1 className="mb-4 text-3xl font-bold *:text-center">Vionsys</h1>
      <div className="flex flex-col gap-2">
        <Link to="/" className="flex items-center justify-center">
          <Button
            className="text-left text-lg w-full flex justify-start items-center"
            icon={<HiHome />}
          >
            Home
          </Button>
        </Link>
        {role == "user" && (
          <div className="flex flex-col gap-2 justify-center ">
            <Link to="/taskpage">
              <Button
                className="text-left text-lg w-full flex justify-start items-center"
                icon={<BiTask />}
              >
                Task
              </Button>
            </Link>
            <Link to="/notifications">
              <Button
                className="text-left text-lg w-full flex justify-start items-center"
                icon={<IoNotificationsCircle />}
              >
                Notifications
              </Button>
            </Link>
            <Link to="/LeavesPage">
              <Button
                className="text-left text-lg w-full flex justify-start items-center"
                icon={<GoCrossReference />}
              >
                Leave Request
              </Button>
            </Link>
            <Link to="/UserLeaveActivity">
              <Button
                className="text-left text-lg w-full flex justify-start items-center"
                icon={<TbActivity />}
              >
                Leaves Activity
              </Button>
            </Link>
            <Link to="/UserCancleLeave">
              <Button
                className="text-left text-lg w-full flex justify-start items-center"
                icon={<MdCancelScheduleSend />}
              >
                cancled Leaves
              </Button>
            </Link>
            <Link to="/LeavesHistory">
              <Button
                className="text-left text-lg w-full flex justify-start items-center"
                icon={<FaHistory />}
              >
                Leaves History
              </Button>
            </Link>
          </div>
        )}

        {role !== "user" && (
          <div className="flex flex-col gap-2 justify-center">
            <Link to="/employees">
              <Button icon={<HiUsers />}
                className="text-left text-lg w-full flex justify-start items-center"
              >
                Employees
              </Button>
            </Link>
            <Link to="/attendance">
              <Button icon={<HiOutlineClipboardList />}
                className="text-left text-lg w-full flex justify-start items-center"
              >
                Attendance
              </Button>
            </Link>
            <Link to="/AdminLeavePage">
              <Button icon={<BsCalendarEvent />}
                className="text-left text-lg w-full flex justify-start items-center"
              >
                Leaves Request
              </Button>
            </Link>
            <Link to="/AdminCancleLeave">
              <Button icon={<BsCalendarEvent />}
                className="text-left text-lg w-full flex justify-start items-center"
              >
                Cancel Leaves
              </Button>
            </Link>
            <Link to="/taskHistory">
              <Button icon={<BiTask />}
                className="text-left text-lg w-full flex justify-start items-center"
              >
                Task History
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
