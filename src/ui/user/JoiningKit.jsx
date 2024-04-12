import React from "react";
import { Table } from "antd";
import getUserIdRole from "../../utils/getUserIdRole";
import useGetKitdetails from "../../features/joiningKit/useGetKitdetails";
import { format } from "date-fns";

const JoiningKit = () => {
  const { id } = getUserIdRole();
  const { data, isPending } = useGetKitdetails(id);
  const KitData = data?.kits;
  console.log(KitData);
  const KitdatColumns = [
    {
      title: "Accessorie Name",
      dataIndex: "accessorieName",
      key: "accessorieName",
    },
    {
      title: "Accessorie Company",
      dataIndex: "accessorieCompany",
      key: "accessorieCompany",
    },
    {
      title: "Accessories Id",
      dataIndex: "accessoriesId",
      key: "accessoriesId",
    },
    {
      title: "given Date",
      dataIndex: "givenDate",
      key: "givenDate",
      render: (date) => (date ? format(new Date(date), "dd MMM yyyy") : ""),
    },
    {
      title: "given By",
      dataIndex: "givenBy",
      key: "givenBy",
    },
  ];
  return (
    <main>
      <Table dataSource={KitData} columns={KitdatColumns} className="px-5" />
    </main>
  );
};

export default JoiningKit;
