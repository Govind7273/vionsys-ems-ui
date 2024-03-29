import useGetAttendance from "../features/attendance/useGetAttendance";
import useUpdateAttendance from "../features/attendance/useUpdateAttendance";
import useCreateAttendance from "../features/attendance/useCreateAttendance";
import useGetCurrentUser from "../features/users/useGetCurrentUser";
import getDateDifferenceWithFormat from "../utils/getDateDifferenceWithFormat";
import { Button, Card, Table } from "antd";
import getUserIdRole from "../utils/getUserIdRole";
import { isToday, lightFormat } from "date-fns";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

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
      handleCheckIn();
      createAttendance({ user: id, time, timeTag: "login" });
    } else {
      toast.error("You are already checked in")
    }
  };
  const handleAttendanceLogout = () => {
    const time = new Date().toISOString();
    if (checkIsToday(employeesAttendance)?.length) {
      handleCheckOut();
      updateAttendance({ user: id, time, timeTag: "logout" });
    }else{
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

  const [startTime, setStartTime] = useState(
    localStorage.getItem('startTime') ? new Date(parseInt(localStorage.getItem('startTime'))).getTime(): 0
  );
  const [isActive, setIsActive] = useState(
    localStorage.getItem('isActive') ? localStorage.getItem('isActive').toString():false);

  useEffect(() => {
     let interval;
    if (isActive) {
      interval = setInterval(() => {
        setStartTime((prevSeconds)=>prevSeconds+1) // Convert milliseconds to seconds
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]); // Empty dependency array ensures that effect runs only once


  if(isActive || !startTime){
    window.addEventListener('beforeunload',function(){
      this.localStorage.setItem('startTime',startTime);
    })
  }

  const handleCheckIn = () => {
    if (!isActive) {
      localStorage.setItem('startTime',startTime);
      setIsActive(true);
      localStorage.setItem('isActive',true);
    }
  };

  const handleCheckOut = () => {
       setStartTime(0)
       setIsActive(false);
       localStorage.removeItem('startTime');
       localStorage.removeItem('isActive');
    // if (elapsedTime >= 8 * 3600) { // 8 hours in seconds
    //   setIsActive(false);
    // } else {
    //   toast.error("You can't check out until you complete 8 hours.");
    // }
  };

  // Format the seconds into hours, minutes, and seconds
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <>
      <div className="p-4 w-full flex flex-col gap-4">
        <Card title="Profile">
          <div className="w-full rounded-lg text-lg">
            {isPending && <p>Loading...</p>}
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
                <div className="flex gap-2">
                  <Button
                    type="button"
                    className={`bg-green-400 text-white ${isActive ? 'pointer-events-none opacity-50' : 'hover:bg-white hover:text-green-400 hover:border-green-400'}`}
                    onClick={handleAttendanceLogin}
                    disabled={
                      attendanceLoading ||
                      employeesAttendance?.data?.attendanceForDay?.loginTime || isActive
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

                {/* Print the timer and from that timer user may able to checkin and checkout
                 if user is checked in then timer will start and checkout button will be disabled
                 once the user completes 8 hours of work then and then he is able to click checkout button */}

                <div>
                  <h3>Timer: {formatTime(startTime)}</h3>
                </div>

                
              </div>
              <div className="order-3">
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
