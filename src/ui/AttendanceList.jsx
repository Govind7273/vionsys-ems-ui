import { LoaderIcon } from "react-hot-toast";
import { Table } from "antd";
import useGetAllAttendance from "../features/attendance/useGetAllAttendance";
import withAuth from "../store/withAuth";
import { format, parseISO } from "date-fns";
import getDateDifferenceWithFormat from "../utils/getDateDifferenceWithFormat";
import ButtonWrapper from "./NeumoBtn";
import ExcelForm from "./ExcelForm";
import { useState } from "react";

const dateFormatNormal = (date) => {
  return format(parseISO(date), "dd:MM:yyyy");
};

const dateToTime = (dateStr) => {
  return format(parseISO(dateStr), "h:mm:ss a");
};

const AttendanceList = () => {
  const [modal, setmodal] = useState(false);
  const { data, isPending } = useGetAllAttendance();

  const columns = [
    {
      key: "name",
      dataIndex: "name",
      title: "Name",
      fixed: "left",
      width: "100px",
    },
    {
      key: "date",
      dataIndex: "date",
      title: "Date",
      // width: '100px',
      // responsive: ["md"]
    },
    {
      key: "employeeId",
      dataIndex: "employeeId",
      title: "EmployeeId",
      // width: '100px',
    },
    {
      key: "loginTime",
      dataIndex: "loginTime",
      title: "Login Time",
      // width: '100px',
    },
    {
      key: "logoutTime",
      dataIndex: "logoutTime",
      title: "Logout Time",
      // width: '100px',
    },
    {
      key: "workTime",
      dataIndex: "workTime",
      title: "Work Time",
      // width: '100px',
    },
  ];
  const dataSource = data?.data?.attendance?.map((item) => {
    return {
      name: `${item?.user?.firstName} ${item?.user?.lastName}`,
      date: dateFormatNormal(item?.attendances[0]?.date),
      employeeId: item?.user?.employeeId,
      loginTime:
        item?.attendances[0]?.loginTime &&
        dateToTime(item?.attendances[0]?.loginTime),
      logoutTime:
        item?.attendances[0]?.logoutTime &&
        dateToTime(item?.attendances[0]?.logoutTime),
      workTime:
        item?.attendances[0]?.logoutTime &&
        item?.attendances[0]?.loginTime &&
        getDateDifferenceWithFormat(
          item?.attendances[0]?.logoutTime,
          item?.attendances[0]?.loginTime
        ),
    };
  });

  return (
    <div className="p-6">
      <ExcelForm isModalOpen={modal} setIsModalOpen={setmodal} />
      <div className="flex justify-between p-4">
        <h2 className="text-xl py-4 ">Attendance List : </h2>
        <button onClick={() => setmodal(true)}>
          <ButtonWrapper text={"Export as Excel"} />
        </button>
      </div>
      {isPending && <LoaderIcon />}
      <Table
        scroll={{
          x: 200,
        }}
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  );
};

export default withAuth(AttendanceList, ["admin"]);
