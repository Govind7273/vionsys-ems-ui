import React, { useState } from "react";
import getholidayList from "../features/holiday/useGetHolidays";
import { useQueryClient } from "@tanstack/react-query";
import { Table } from "antd";
import { format } from "date-fns";

const HolidayCalander = () => {
  const [year, setYear] = useState(2024);
  const [mode, setMode] = useState("fixed");
  const { data, isPending } = getholidayList(year);
  const fixedHolidays = data?.fixedHolidays;
  const floaterHolidays = data?.floaterHolidays;

  const columns = [
    {
      title: "Holiday Name",
      dataIndex: "holidayName",
      key: "holidayName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => (date ? format(new Date(date), "dd MMM yyyy") : ""),
    },
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "Type",
      dataIndex: "holidayType",
      key: "holidayType",
    },
  ];

  return (
    <div>
      <div className="flex justify-center gap-3 m-3">
        <div className="w-fit border-b border-black p-2">
          <button
            className={`p-3 bg-slate-200 rounded-lg ${
              mode === "fixed" ? "bg-blue-300 text-white" : ""
            }`}
            onClick={() => setMode("fixed")}
          >
            Fixed Holidays
          </button>
          {/* Button to switch to Floater Holidays mode */}
          <button
            className={`p-3 bg-slate-200 rounded-lg ${
              mode === "floater" ? "bg-blue-300 text-white" : ""
            }`}
            onClick={() => setMode("floater")}
          >
            Floater Holidays
          </button>
        </div>
      </div>
      {/* Render table based on mode */}
      {isPending ? (
        "Loading..."
      ) : (
        <Table
          dataSource={mode === "fixed" ? fixedHolidays : floaterHolidays}
          columns={columns}
          className="px-5"
        />
      )}
    </div>
  );
};

export default HolidayCalander;
