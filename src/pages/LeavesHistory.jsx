import React from "react";
import UserLeaveHistory from "../ui/UserLeaveHistory";
import useGetUserLeaveHistory from "../features/leaves/useGetUserLeaveHistory";
import getUserIdRole from "../utils/getUserIdRole";
import { LoaderIcon } from "react-hot-toast";
import { MdOutlineSick } from "react-icons/md";
import { FaRegClipboard } from "react-icons/fa";
import { PiBagLight } from "react-icons/pi";
import { BsCalendar4Event } from "react-icons/bs";
import { ImStarEmpty } from "react-icons/im";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { GoHourglass } from "react-icons/go";
import { GoThumbsup, GoThumbsdown } from "react-icons/go";
import { format } from "date-fns";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button, Tag } from "antd";
import useCancleLeaveRequest from "../features/leaves/useCancleLeaveRequest";

const LeavesHistory = () => {
  const { id } = getUserIdRole();
  const { cancleRequest } = useCancleLeaveRequest();
  const { data, isPending } = useGetUserLeaveHistory(id);
  const userleave = data?.userAllLeaves[0]?.leaves;
  const userleavecount = data?.userAllLeaves[0]?.leavescounts;
  // console.log(userleave);
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

      {userleavecount &&
        userleavecount.map((leavecount, index) => (
          <section key={index} className="p-5 ">
            <div className="w-full justify-center flex p-2">
              <h2 className="text-lg font-bold">User Leave Balance</h2>
            </div>
            {/* available_leave_sections --- start*/}
            <section className="available_leave_section grid grid-cols-3 md:grid-cols-6 gap-3 w-full  bg-white p-5">
              <div className="md:border-r md:border-gray-400 w-full ">
                <span className="flex flex-col justify-center gap-2 h-[10rem] items-center text-center">
                  <FaRegClipboard size={25} />
                  <p className="min-w-[5rem]">total Availabe leaves</p>
                  <p>
                    {leavecount?.floaterleave +
                    leavecount?.privilageleave +
                    leavecount?.sickleave +
                    leavecount?.casualleave
                      ? leavecount?.floaterleave +
                        leavecount?.privilageleave +
                        leavecount?.sickleave +
                        leavecount?.casualleave
                      : "0"}
                  </p>
                </span>
              </div>
              <div className="md:border-r md:border-gray-400 w-full">
                <span className="flex flex-col justify-center gap-2 h-[10rem] text-center items-center">
                  <BsCalendar4Event size={25} />
                  <p className="flex items-center justify-center">
                    Floater Leaves
                  </p>
                  <p>{leavecount?.floaterleave}</p>
                </span>
              </div>
              <div className="md:border-r md:border-gray-400 w-full">
                <span className="flex flex-col justify-center gap-2 h-[10rem] items-center text-center">
                  <ImStarEmpty size={25} />
                  <p>Privilage Leaves</p>
                  <p>{leavecount?.privilageleave}</p>
                </span>
              </div>
              <div className="md:border-r md:border-gray-400 w-full">
                <span className="flex flex-col justify-center gap-2 h-[10rem] items-center text-center">
                  <MdOutlineSick size={25} />
                  <p>Sick Leave</p>
                  <p>{leavecount?.sickleave}</p>
                </span>
              </div>
              <div className="md:border-r md:border-gray-400 w-full">
                <span className="flex flex-col justify-center gap-2 h-[10rem] items-center text-center">
                  <PiBagLight size={25} />
                  <p>Casual Leave</p>
                  <p>{leavecount?.casualleave}</p>
                </span>
              </div>
              <div className="w-full">
                <span className="flex flex-col justify-center gap-2 h-[10rem] items-center text-center">
                  <LiaRupeeSignSolid size={25} />
                  <p>unpaid Leave taken by you</p>
                  <p>{leavecount?.unpaidleave}</p>
                </span>
              </div>
            </section>
            {/* available_leave_sections --- ends*/}

            {/* user leave activity --- start*/}
            <div className="w-full justify-center flex p-2">
              <h2 className="text-lg font-bold">User Leave Activity</h2>
            </div>
            <section className="available_leave_section grid grid-cols-2 md:grid-cols-4 gap-3 w-full  bg-white p-5">
              <div className="md:border-r md:border-gray-400 w-full ">
                <span className="flex flex-col justify-center gap-2 h-[10rem] items-center text-center">
                  <FaRegClipboard size={25} />
                  <p className="min-w-[5rem]">total leaves</p>
                  <p>{leavecount?.totalLeaves}</p>
                </span>
              </div>
              <div className="md:border-r md:border-gray-400 w-full">
                <span className="flex flex-col justify-center gap-2 h-[10rem] text-center items-center">
                  <GoHourglass size={25} />
                  <p className="flex items-center justify-center">
                    Pending Leaves
                  </p>
                  <p>{leavecount?.pendingLeaves}</p>
                </span>
              </div>
              <div className="md:border-r md:border-gray-400 w-full">
                <span className="flex flex-col justify-center gap-2 h-[10rem] items-center text-center">
                  <GoThumbsup size={25} />
                  <p>Approved Leaves</p>
                  <p>{leavecount?.approvedLeaves}</p>
                </span>
              </div>
              <div className=" w-full">
                <span className="flex flex-col justify-center gap-2 h-[10rem] items-center text-center">
                  <GoThumbsdown size={25} />
                  <p>Rejected Leaves</p>
                  <p>{leavecount?.rejectedLeaves}</p>
                </span>
              </div>
            </section>
          </section>
        ))}
      <div style={{ overflowX: "auto" }}>
        <UserLeaveHistory userleave={userleave} columns={columns} />
      </div>
    </main>
  );
};

export default LeavesHistory;
