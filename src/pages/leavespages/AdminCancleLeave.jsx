import React from "react";
import getUserIdRole from "../../utils/getUserIdRole";
import useGetLeaveRequests from "../../features/leaves/useGetLeaveRequests";
import { format } from "date-fns";
import { Tag } from "antd";
import { LoaderIcon } from "react-hot-toast";
import UserLeaveHistory from "../../ui/leavesUI/UserLeaveHistory";

const AdminCancleLeave = () => {
  const { id } = getUserIdRole();
  const { data, isPending } = useGetLeaveRequests(id);

  const dataSource = [];
  const AllLeaves = data?.AllLeaves;
  AllLeaves?.forEach((leave) => {
    leave?.leaves?.forEach((leaveData) => {
      dataSource?.unshift({
        key: leaveData?._id,
        email: leave?.email,
        ...leaveData,
      });
    });
  });

  const CancledLeaves = dataSource?.filter(
    (leave) => leave?.leaveStatus == "Cancelled"
  );

  const sorteduserLeaves = CancledLeaves?.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

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
      render: (leaveReason) => (leaveReason ? leaveReason : "NA"),
    },
    {
      title: "Cancle Reason",
      dataIndex: "cancleReason",
      key: "cancleReason",
      render: (cancleReason) => (cancleReason ? cancleReason : "NA"),
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
      render: (date) => (date ? format(new Date(date), "d-MM-yyyy") : "NA"),
    },
    {
      title: "Cancelled date",
      dataIndex: "cancleDate",
      key: "cancleDate",
      render: (date) => (date ? format(new Date(date), "d-MM-yyyy") : "NA"),
    },
    {
      title: "Leave Start",
      dataIndex: "leaveStart",
      key: "leaveStart",
      render: (date) => (date ? format(new Date(date), "d-MM-yyyy") : "NA"),
    },
    {
      title: "Leave End",
      dataIndex: "leaveEnd",
      key: "leaveEnd",
      render: (date) => (date ? format(new Date(date), "d-MM-yyyy") : "NA"),
    },
    {
      title: "Leave Status",
      dataIndex: "leaveStatus",
      key: "leaveStatus",
      render: (leaveStatus) => {
        let color = "red";
        return (
          <Tag color={color} key={leaveStatus}>
            {leaveStatus}
          </Tag>
        );
      },
    },
  ];

  return (
    <div className="p-5">
      {isPending && <LoaderIcon />}
      {data && (
        <UserLeaveHistory userleave={sorteduserLeaves} columns={columns} />
      )}
    </div>
  );
};

export default AdminCancleLeave;
