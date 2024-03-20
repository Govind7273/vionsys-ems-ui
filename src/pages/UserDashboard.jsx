import useGetAttendance from "../features/attendance/useGetAttendance";
import useUpdateAttendance from "../features/attendance/useUpdateAttendance";
import useCreateAttendance from "../features/attendance/useCreateAttendance";
import useGetCurrentUser from "../features/users/useGetCurrentUser";
import getDateDifferenceWithFormat from "../utils/getDateDifferenceWithFormat";
import { Button, Card, Table } from "antd";
import getUserIdRole from "../utils/getUserIdRole";
import { isToday, lightFormat } from "date-fns";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { id } = getUserIdRole();
  const { data: employeesAttendance, isPending: tableLoading } =
    useGetAttendance();
  const { updateAttendance, isPending: updateLoading } = useUpdateAttendance();
  const { createAttendance, isPending: attendanceLoading } =
    useCreateAttendance();
  const { user: userData, isPending } = useGetCurrentUser(id);

  const checkIsToday = (employeesAttendance) => {
    const checkIsToday = employeesAttendance?.data?.attendance.filter((obj) =>
      isToday(obj?.date)
    );
    return checkIsToday;
  };

  const handleAttendanceLogin = () => {
    const time = new Date().toISOString();
    if (!checkIsToday(employeesAttendance)?.length) {
      createAttendance({ user: id, time, timeTag: "login" });
    }else{
      toast.error("You are already checked in")
    }
  };
  const handleAttendanceLogout = () => {
    const time = new Date().toISOString();
    if (checkIsToday(employeesAttendance)?.length) {
      updateAttendance({ user: id, time, timeTag: "logout" });
    }
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Login",
      dataIndex: "login",
      key: "login",
    },
    {
      title: "Logout",
      dataIndex: "logout",
      key: "logout",
    },
    {
      title: "Work Time",
      dataIndex: "workTime",
      key: "workTime",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
  ];

  const dataSource = employeesAttendance?.data?.attendance?.map((item) => {
    return {
      key: item?._id,
      date: lightFormat(new Date(item?.date), "MM - dd - yyyy"),
      login: lightFormat(new Date(item?.loginTime), "h:mm:ss a"),
      logout:
        item?.logoutTime &&
        lightFormat(new Date(item?.logoutTime), "h:mm:ss a"),
      workTime:
        item?.loginTime && item?.logoutTime
          ? getDateDifferenceWithFormat(
              new Date(item?.logoutTime),
              new Date(item?.loginTime)
            )
          : "--",
    };
  });

  return (
    <>
      <div className="p-4 w-full flex flex-col gap-4">
        <Card title="Profile">
          <div className="w-full rounded-lg text-lg">
            {isPending && <p>Loading...</p>}
            <div className="flex justify-between">
              <div className="flex-1">
                <h2>
                  <span className="text-slate-500">Name: </span>
                  {`${userData?.data?.user?.firstName} ${userData?.data?.user?.firstName}`}
                </h2>
                <h2>
                  <span className="text-slate-500">Email: </span>
                  {userData?.data?.user?.email}
                </h2>
                <h2>
                  <span className="text-slate-500">Employee Id: </span>
                  {userData?.data?.user?.employeeId}
                </h2>
                <h2>
                  <span className="text-slate-500">Reporting Manager: </span>
                  {userData?.data?.user?.reportingManager}
                </h2>
                <h2>
                  <span className="text-slate-500">Team Lead: </span>
                  {userData?.data?.user?.teamLead}
                </h2>
              </div>
              <div className="flex gap-4 flex-1">
                <Button
                  onClick={handleAttendanceLogin}
                  disabled={
                    attendanceLoading ||
                    employeesAttendance?.data?.attendanceForDay?.loginTime
                  }
                >
                  Check In
                </Button>
                <Button
                  onClick={handleAttendanceLogout}
                  disabled={
                    updateLoading ||
                    employeesAttendance?.data?.attendanceForDay?.logoutTime
                  }
                >
                  Check Out
                </Button>
              </div>
              <div>
                {/* <textarea
                  name=""
                  id=""
                  cols="20"
                  rows="4"
                  maxLength={"200px"}
                >
                  
                </textarea> */}
                <img src={userData?.data?.user?.profile} className="w-56 h-56 object-cover rounded-2xl" alt="h" />
              </div>
            </div>
          </div>
        </Card>
        {/* <div className="w-full grid md:grid-cols-3 gap-4 h-56">
            <DashboardCard label="Holidays">
              <ul>
                <ListItem>21/12/2024 | Sunday</ListItem>
                <ListItem>21/12/2024 | Tuesday</ListItem>
                <ListItem>21/12/2024 | Thursday</ListItem>
                <ListItem>21/12/2024 | Tuesday</ListItem>
                <ListItem>21/12/2024 | Thursday</ListItem>
              </ul>
            </DashboardCard>
            <DashboardCard label="Task">
              <ul>
                <ListItem>Create a navbar for Project1</ListItem>
                <ListItem>Front End Developer Interview</ListItem>
              </ul>
            </DashboardCard>
            <DashboardCard label="Recent">
              <ul>
                <ListItem>21/12/2024 | Thursday</ListItem>
              </ul>
            </DashboardCard>
          </div> */}
        <div className="w-full text-slate-800 h-56 rounded-lg">
          {tableLoading && <h1>Loading...</h1>}
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Dashboard;
