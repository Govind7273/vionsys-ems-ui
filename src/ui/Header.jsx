import { useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import ThemeButton from "./ThemeButton";
import { Button, Drawer } from "antd";
import { logout } from "../services/authApi";
import getUserIdRole from "../utils/getUserIdRole";
import Sidebar from './Sidebar'
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const onClose = () => {
    setOpen(false);
  }

  const { role } = getUserIdRole();
  return (
    <div className="dark:bg-slate-800 dark:text-slate-100 bg-slate-100 text-slate-800 p-4 flex justify-around">
      <div className="flex gap-6 items-center">
        <h1 className="text-xl">Employee Management Dashboard</h1>
      </div>
      <div className="flex gap-6 items-center">
        <h2>{role}</h2>
        <ThemeButton />
        <Button className="dark:text-slate-100" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <Button className="cursor-pointer sm:hidden" onClick={() => setOpen(true)}>
        <HiMenu />
      </Button>
      <Drawer title="Basic Drawer" onClose={onClose} open={open}>
        <Sidebar isMobile={true}/>
      </Drawer>
    </div>
  );
};

export default Header;
