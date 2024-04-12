import React from "react";
import { Timeline } from "antd";
import useGetWorkHistory from "../../features/workhistory/useGetWorkHistory";
import getUserIdRole from "../../utils/getUserIdRole";
import { format } from "date-fns";

const PreviousWork = () => {
  const { id } = getUserIdRole();
  const { data, isPending } = useGetWorkHistory(id);
  const workhistory = data?.workhistory;
  const sortedData = workhistory?.sort(
    (a, b) => new Date(b.startDate) - new Date(a.startDate)
  );
  return (
    <div className="p-8">
      {isPending && "loading..."}
      <Timeline mode="left" pending={true}>
        {sortedData?.map((item) => (
          <Timeline.Item key={item._id} className="">
            <div className="bg-white text-black w-full p-8 rounded-md">
              <h3 className="text-2xl font-bold">
                Company Name : {item?.componeyName}
              </h3>
              <p className="text-xl">
                Joining Date : {format(new Date(item?.startDate), "d-MM-yyyy")}
              </p>
              <p className="text-xl">
                Exit Date : {format(new Date(item?.endDate), "d-MM-yyyy")}
              </p>
              <p className="text-xl">Duration : {item?.duration}</p>
              <p className="text-xl">Position : {item?.position}</p>
              <p className="text-xl">Skills: {item?.skills?.join(" - ")}</p>
            </div>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
};

export default PreviousWork;
