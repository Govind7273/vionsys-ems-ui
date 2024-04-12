import React from "react";
import { Timeline, Button } from "antd";
import useGetWorkHistory from "../../features/workhistory/useGetWorkHistory";
import getUserIdRole from "../../utils/getUserIdRole";
import { MdDeleteOutline } from "react-icons/md";
import { format } from "date-fns";
import { useParams } from "react-router";
import useAddWorkHistory from "../../features/workhistory/useAddWorkHistory";
import useDeleteWorkHistory from "../../features/workhistory/useDeleteWorkHistory";

const PreviousWork = () => {
  const { userId } = useParams();
  const { id, role } = getUserIdRole();
  const { data, isPending } = useGetWorkHistory(!userId ? id : userId);
  const { addwork, CreatePending } = useAddWorkHistory();
  const { deletework, deletePending } = useDeleteWorkHistory();
  const workhistory = data?.workhistory;
  const sortedData = workhistory?.sort(
    (a, b) => new Date(b.startDate) - new Date(a.startDate)
  );
  const handleDeleteWork = (id) => {
    deletework(id);
  };
  return (
    <div className="p-8">
      {isPending && "loading..."}
      {sortedData && sortedData.length > 0 ? (
        <Timeline mode="left" pending={isPending}>
          {sortedData.map((item) => (
            <Timeline.Item key={item._id} className="">
              <div className="bg-white text-black w-full p-8 rounded-md">
                <h3 className="text-2xl font-bold">
                  Company Name : {item?.componeyName}
                </h3>
                <p className="text-xl">
                  Joining Date :{" "}
                  {format(new Date(item?.startDate), "d-MM-yyyy")}
                </p>
                <p className="text-xl">
                  Exit Date : {format(new Date(item?.endDate), "d-MM-yyyy")}
                </p>
                <p className="text-xl">Duration : {item?.duration}</p>
                <p className="text-xl">Position : {item?.position}</p>
                <p className="text-xl">
                  Skills: {item?.skills?.join(" - ") || "No skills found"}
                </p>
                {role === "admin" && (
                  <Button
                    disabled={deletePending}
                    onClick={() => handleDeleteWork(item?._id)}
                  >
                    <MdDeleteOutline />
                  </Button>
                )}
              </div>
            </Timeline.Item>
          ))}
        </Timeline>
      ) : (
        <p>No data found!!</p>
      )}
    </div>
  );
};

export default PreviousWork;
