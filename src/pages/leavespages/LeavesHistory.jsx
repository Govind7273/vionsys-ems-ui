import React from "react";
import UserLeaveHistory from "../../ui/leavesUI/UserLeaveHistory";
import useGetUserLeaveHistory from "../../features/leaves/useGetUserLeaveHistory";
import getUserIdRole from "../../utils/getUserIdRole";
import { LoaderIcon } from "react-hot-toast";
import { format } from "date-fns";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button, Tag } from "antd";
import useCancleLeaveRequest from "../../features/leaves/useCancleLeaveRequest";

const LeavesHistory = () => {
  const { id } = getUserIdRole();
  const { cancleRequest } = useCancleLeaveRequest();
  const { data, isPending } = useGetUserLeaveHistory(id);
  const userleave = data?.userAllLeaves[0]?.leaves;
  const handleCancelLeave = (user, record) => {
    const leaveId = record?._id;

    cancleRequest(
      { user, leaveId },
      {
        onSuccess: (res) => {
          console.log(res);
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };
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
      render: (reason) =>
        reason.length > 20 ? `${reason.substring(0, 20)}...` : reason,
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
      title: "Floater Date",
      dataIndex: "floaterDay",
      key: "floaterDay",
      render: (floaterDay) => (floaterDay ? floaterDay : "NA"),
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
      title: "Leave Cancel",
      dataIndex: "user",
      key: "user",
      render: (user, record) => (
        <Button
          icon={<FaRegTrashAlt />}
          onClick={() => handleCancelLeave(user, record)}
        />
      ),
    },
  ];

  return (
    <main>
      {isPending && <LoaderIcon />}

      <div style={{ overflowX: "auto" }}>
        <UserLeaveHistory userleave={userleave} columns={columns} />
      </div>
    </main>
  );
};

export default LeavesHistory;
