import {Card } from "antd";
import UserAvailable from "../ui/UserAvailable";
import Notifications from "../ui/Notifications";

const AdminDashboard = () => {

  return (
    <div className="p-8 grid md:grid-cols-3 gap-2">
      <UserAvailable/>
      <Notifications />
      <Card />
    </div>
  );
};

export default AdminDashboard;
