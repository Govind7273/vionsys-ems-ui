import React from "react";
import getUserIdRole from "../../utils/getUserIdRole";
import useGetUserLeaveHistory from "../../features/leaves/useGetUserLeaveHistory";
import { FaRegClipboard } from "react-icons/fa";
import { BsCalendar4Event } from "react-icons/bs";
import { ImStarEmpty } from "react-icons/im";
import { PiBagLight } from "react-icons/pi";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { GoHourglass, GoThumbsdown, GoThumbsup } from "react-icons/go";
import { MdOutlineSick } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { FaRegCalendarTimes } from "react-icons/fa";

const UserLeaveActivity = () => {
  const { id } = getUserIdRole();
  const { data } = useGetUserLeaveHistory(id);
  const userleavecount = data?.userAllLeaves[0]?.leavescounts;
  return (
    <main>
      {userleavecount &&
        userleavecount.map((leavecount, index) => (
          <section key={index} className="p-5 bg-white h-[100vh]">
            <div className="w-full justify-center flex p-2">
              <h2 className="text-xl font-bold">User Leave Balance</h2>
            </div>
            {/* available_leave_sections --- start*/}
            <section className="available_leave_section grid grid-cols-1 md:grid-cols-3 gap-3 w-full p-5">
              <div className="md:border-r bg-[#FBC950] w-full ">
                <span className="flex flex-col justify-center gap-2 h-[10rem] items-center text-center  text-black">
                  <FaRegClipboard size={30} />
                  <p className="min-w-[5rem] text-black text-xl">
                    Total Available Leaves
                  </p>
                  <p>
                    {leavecount?.floaterleave +
                      leavecount?.privilageleave +
                      leavecount?.sickleave +
                      leavecount?.casualleave}
                  </p>
                </span>
              </div>
              <div className="md:border-r bg-[#D1B5F0]  w-full">
                <span className="flex flex-col justify-center gap-2 h-[10rem] text-center items-center  text-black">
                  <BsCalendar4Event size={30} />
                  <p className="flex items-center justify-center text-black text-xl">
                    Floater Leaves
                  </p>
                  <p>{leavecount?.floaterleave}</p>
                </span>
              </div>
              <div className="md:border-r bg-[#C9EF9A]  w-full">
                <span className="flex flex-col justify-center gap-2 h-[10rem] items-center text-center text-black">
                  <ImStarEmpty size={30} />
                  <p className="flex items-center justify-center text-black text-xl">
                    Privilage Leaves
                  </p>
                  <p>{leavecount?.privilageleave}</p>
                </span>
              </div>
              <div className="md:border-r bg-[#EFBF9A]  w-full">
                <span className="flex flex-col justify-center gap-2 h-[10rem] items-center text-center  text-black">
                  <MdOutlineSick size={30} />
                  <p className="flex items-center justify-center text-black text-xl">
                    Sick Leave
                  </p>
                  <p>{leavecount?.sickleave}</p>
                </span>
              </div>
              <div className="md:border-r bg-[#F5B8CF]  w-full">
                <span className="flex flex-col justify-center gap-2 h-[10rem] items-center text-center  text-black">
                  <PiBagLight size={30} />
                  <p className="flex items-center justify-center text-black text-xl">
                    Casual Leave
                  </p>
                  <p>{leavecount?.casualleave}</p>
                </span>
              </div>
              <div className="bg-[#9AEFCA] w-full">
                <span className="flex flex-col justify-center gap-2 h-[10rem] items-center text-center  text-black">
                  <LiaRupeeSignSolid size={30} />
                  <p className="flex items-center justify-center text-black text-xl">
                    Unpaid Leave taken by you
                  </p>
                  <p>{leavecount.unpaidleave}</p>
                </span>
              </div>
            </section>
            {/* available_leave_sections --- ends*/}

            {/* user leave activity --- start*/}
            <div className="w-full justify-center flex p-2">
              <h2 className="text-xl font-bold">User Leave Activity</h2>
            </div>
            <section className="available_leave_section grid grid-cols-1 md:grid-cols-3 gap-3 w-full  bg-white p-5">
              <div className="md:border-r bg-[#ADE9E3]  w-full ">
                <span className="flex flex-col justify-center gap-2 h-[10rem] items-center text-center">
                  <FaRegClipboard size={30} />
                  <p className="min-w-[5rem] text-xl">Total Leaves</p>
                  <p>{leavecount?.totalLeaves}</p>
                </span>
              </div>
              <div className="md:border-r bg-[#FFF933]  w-full">
                <span className="flex flex-col justify-center gap-2 h-[10rem] text-center items-center">
                  <GoHourglass size={30} />
                  <p className="flex items-center justify-center text-xl">
                    Pending Leaves
                  </p>
                  <p>{leavecount?.pendingLeaves}</p>
                </span>
              </div>
              <div className="md:border-r bg-[#33FF57]  w-full">
                <span className="flex flex-col justify-center gap-2 h-[10rem] items-center text-center text-black">
                  <GoThumbsup size={30} />
                  <p className="text-xl">Approved Leaves</p>
                  <p>{leavecount?.approvedLeaves}</p>
                </span>
              </div>
              <div className=" w-full bg-[#FB8750]">
                <span className="flex flex-col justify-center gap-2 h-[10rem] items-center text-center">
                  <GoThumbsdown size={30} />
                  <p className="text-xl">Rejected Leaves</p>
                  <p>{leavecount?.rejectedLeaves}</p>
                </span>
              </div>
              <div className=" w-full bg-[#FF8E8F]">
                <span className="flex flex-col justify-center gap-2 h-[10rem] items-center text-center">
                  <MdOutlineCancel size={30} />
                  <p className="text-xl">Cancelled Leaves</p>
                  <p>{leavecount?.cancelledLeaves}</p>
                </span>
              </div>
              <div className=" w-full bg-gray-300">
                <span className="flex flex-col justify-center gap-2 h-[10rem] items-center text-center">
                  <FaRegCalendarTimes size={30} />
                  <p className="text-xl">Expired Leaves</p>
                  <p>{leavecount?.expiredLeaves}</p>
                </span>
              </div>
            </section>
          </section>
        ))}
    </main>
  );
};

export default UserLeaveActivity;
