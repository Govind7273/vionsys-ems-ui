import React, { useState } from "react";
import useGetLeaveRequests from "../features/leaves/useGetLeaveRequests";
import { LoaderIcon } from "react-hot-toast";
import { Button, Table, Tag } from "antd";
import { format } from "date-fns";
import getUserIdRole from "../utils/getUserIdRole";
import { BsThreeDotsVertical } from "react-icons/bs";
import AdminLeaveModal from "../ui/AdminLeaveModal";

const AdminLeavePage = () => {
  const [modalOpen, setmodalOpen] = useState(false);
  const [leavedata, setleavedata] = useState({});

  const { id } = getUserIdRole();
  const { data, isPending } = useGetLeaveRequests(id);
  const AllLeaves = data?.AllLeaves;
  // the cloumns in admin leaves page
  const columns = [
    {
      title: "User Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
    },
    {
      title: "Leave Mode",
      dataIndex: "halfDay",
      key: "halfDay",
      render: (halfDay) => (halfDay ? "Half Day" : "Full Day"),
    },
    {
      title: "Leave Days",
      dataIndex: "leaveDays",
      key: "leaveDays",
    },
    {
      title: "Request date",
      dataIndex: "date",
      key: "date",
      render: (date) => format(new Date(date), "d-MM-yyyy"),
    },
    {
      title: "Leave Start",
      dataIndex: "leaveStart",
      key: "leaveStart",
      render: (date) => format(new Date(date), "d-MM-yyyy"),
    },
    {
      title: "Leave End",
      dataIndex: "leaveEnd",
      key: "leaveEnd",
      render: (date) => format(new Date(date), "d-MM-yyyy"),
    },
    {
      title: "Leave Status",
      dataIndex: "leaveStatus",
      key: "leaveStatus",
      render: (leaveStatus) => {
        let color = "";
        switch (leaveStatus) {
          case "Pending":
            color = "yellow";
            break;
          case "Approved":
            color = "green";
            break;
          case "Rejected":
            color = "red";
            break;
          default:
            color = "";
        }
        return (
          <Tag color={color} key={leaveStatus}>
            {leaveStatus}
          </Tag>
        );
      },
    },
    {
      title: "Note By Admin",
      dataIndex: "noteByAdmin",
      key: "noteByAdmin",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "user",
      render: (record) => (
        <Button
          icon={<BsThreeDotsVertical />}
          onClick={() => handleCancelLeave(record)}
        />
      ),
    },
  ];
  // the data of admin laves page
  const dataSource = [];

  AllLeaves?.forEach((leave) => {
    leave?.leaves?.forEach((leaveData) => {
      dataSource?.push({
        key: leaveData?._id,
        email: leave?.email,
        ...leaveData,
      });
    });
  });
  const handleCancelLeave = (record) => {
    setleavedata(record);
    setmodalOpen(true);
  };

  return (
    <div>
      <AdminLeaveModal
        modalOpen={modalOpen}
        setmodalOpen={setmodalOpen}
        leavedata={leavedata}
      />
      {isPending && <LoaderIcon />}
      {AllLeaves && <Table columns={columns} dataSource={dataSource} />}
    </div>
  );
};

export default AdminLeavePage;
