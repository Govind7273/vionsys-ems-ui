import React from "react";
import { Table, Tag } from "antd";
import { format } from "date-fns";

const UserLeaveHistory = (props) => {
  const { userleave } = props;

  const columns = [
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
    },
    {
      title: "Leave Reason",
      dataIndex: "leaveReason",
      key: "leaveReason",
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
      title: "leave cancle",
      dataIndex: "leavecancle",
      key: "leavecancle",
    },
  ];

  return (
    <>
      <div style={{ overflowX: "auto" }}>
        <Table dataSource={userleave} columns={columns} className="px-5" />
      </div>
    </>
  );
};

export default UserLeaveHistory;
