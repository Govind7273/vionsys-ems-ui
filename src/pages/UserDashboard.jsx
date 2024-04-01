import { useEffect, useState } from "react";
import { isToday, lightFormat } from "date-fns";
import { Button, Card, Table } from "antd";
import useGetAttendance from "../features/attendance/useGetAttendance";
import useUpdateAttendance from "../features/attendance/useUpdateAttendance";
import useCreateAttendance from "../features/attendance/useCreateAttendance";
import useGetCurrentUser from "../features/users/useGetCurrentUser";
import getUserIdRole from "../utils/getUserIdRole";
import getDateDifferenceWithFormat from "../utils/getDateDifferenceWithFormat";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { id } = getUserIdRole();
  const { data: employeesAttendance, isPending: tableLoading } =
    useGetAttendance();
  const { updateAttendance, isPending: updateLoading } = useUpdateAttendance();
  const { createAttendance, isPending: attendanceLoading } =
    useCreateAttendance();
  const { user: userData, isPending: userLoading } = useGetCurrentUser(id);

  const checkIsToday = (employeesAttendance) => {
    const checkIsToday = employeesAttendance?.data?.attendance.filter((obj) =>
      isToday(obj?.date)
    );
    return checkIsToday;
  };

  const [startTime, setStartTime] = useState();
  const [isActive, setIsActive] = useState(localStorage.getItem("isActive") ? localStorage.getItem("isActive") : false);

  useEffect(() => {
    if (!tableLoading && isActive) {
      setInterval(() => {
        const currentDateData = checkIsToday(employeesAttendance);
        const timeDifference = Math.abs(new Date().getTime() - new Date(currentDateData[0]?.loginTime)?.getTime());
        let hours = Math.floor(timeDifference / (1000 * 60 * 60));
        let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.abs(Math.floor((timeDifference % (1000 * 60)) / 1000));
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        const stopwatchOrTimerFormat = `${hours}:${minutes}:${seconds}`;
        setStartTime(stopwatchOrTimerFormat);
      }, 1000);
    } else {
      setStartTime('00:00:00');
    }

  }, [tableLoading, employeesAttendance]);

  const handleAttendanceLogin = () => {
    const time = new Date().toISOString();
    if (!checkIsToday(employeesAttendance)?.length) {
      handleCheckIn();
      createAttendance({ user: id, time, timeTag: "login" });
    } else {
      toast.error("You are already checked in");
    }
  };
  const handleAttendanceLogout = () => {
    const time = new Date().toISOString();
    if (checkIsToday(employeesAttendance)?.length) {
      handleCheckOut();
      updateAttendance({ user: id, time, timeTag: "logout" });
    } else {
      handleCheckOut();
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

  const handleCheckIn = () => {
    if (!isActive) {
      localStorage.setItem('isActive', true);
      setIsActive(true);
    }
  };

  const handleCheckOut = () => {
    setStartTime("00:00:00");
    setIsActive(false);
    window.location.reload();
    localStorage.removeItem('isActive');
  };

  return (
    <>
      <div className="p-4 w-full flex flex-col gap-4">
        <Card title="Profile">
          <div className="w-full rounded-lg text-lg">
            {userLoading && <p>Loading profile...</p>}
            {!userLoading && (
              <div className="flex justify-around gap-8">
                <div className="flex-1">
                  <h2>
                    <span className="order-1 text-slate-500">Name: </span>
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
                <div className="order-2 flex flex-col gap-4 flex-1 justify-start items-center">
                  <div className="flex gap-6">
                    <Button
                      type="button"
                      className={`bg-green-400 text-white ${isActive ? 'pointer-events-none opacity-50' : 'hover:bg-white hover:text-green-400 hover:border-green-400'}`}
                      onClick={handleAttendanceLogin}
                      disabled={
                        attendanceLoading ||
                        employeesAttendance?.data?.attendanceForDay?.loginTime
                      }
                    >
                      Check In
                    </Button>
                    <Button
                      type="button"
                      className={`bg-red-500 text-white ${!isActive ? 'pointer-events-none opacity-50' : 'hover:bg-white hover:text-red-500 hover:border-red-500'}`}
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
                    <h3 className="border px-10 rounded-xl text-white bg-violet-500 py-4 text-3xl font-bold tracking-wider">{startTime}</h3>
                  </div>
                </div>
                <div className="order-3">
                  <img src={userData?.data?.user?.profile} className="w-56 h-56 object-cover rounded-2xl" alt="Profile" />
                </div>
              </div>
            )}
          </div>
        </Card>
        <div className="w-full text-slate-800 h-56 rounded-lg">
          {tableLoading && <h1>Loading attendance data...</h1>}
          {!tableLoading && <Table dataSource={dataSource} columns={columns} />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
