import React, { useState } from "react";
import { Table } from "antd";
import getUserIdRole from "../../utils/getUserIdRole";
import useGetKitdetails from "../../features/joiningKit/useGetKitdetails";
import { format } from "date-fns";
import { useParams } from "react-router";
import { IoIosLaptop } from "react-icons/io";
import { CiGift } from "react-icons/ci";
import AddWelcomeKit from "../Employees/AddWelcomeKit";
import { Tooltip } from "antd";
import { Button } from "antd";

const JoiningKitOfEmpForAdmin = () => {
    const { userId } = useParams();
    const [isWelcomeKitModalOpen, setIsWelcomeKitModalOpen] = useState(false);
    const { data, isPending } = useGetKitdetails(userId);
    const KitData = data?.kits;
    console.log(KitData);
    const KitdatColumns = [
        {
            title: "Accessory Name",
            dataIndex: "accessoryName",
            key: "accessoryName",
        },
        {
            title: "Accessory Company",
            dataIndex: "accessoryCompany",
            key: "accessoryCompany",
        },
        {
            title: "Accessory Id",
            dataIndex: "accessoryId",
            key: "accessoryId",
        },
        {
            title: "Assigned Date",
            dataIndex: "assignDate",
            key: "assignDate",
            render: (date) => (date ? format(new Date(date), "dd MMM yyyy") : ""),
        },
        {
            title: "Assigned By",
            dataIndex: "assignBy",
            key: "assignBy",
        },
    ];
    return (
        <main className="flex flex-col gap-4">
            {/* Add welcome kit for the user */}
            <AddWelcomeKit isModalOpen={isWelcomeKitModalOpen} setIsModalOpen={setIsWelcomeKitModalOpen} userId={userId} />
            <div className="flex gap-2 flex-col justify-center items-center">
                <Tooltip placement="top" title="Joining Kit">
                    <Button type="default" onClick={() => setIsWelcomeKitModalOpen(!isWelcomeKitModalOpen)} className="text-white bg-blue-400 flex justify-center items-center gap-2"><CiGift size={20} /> <span>Add Accessory</span></Button>
                </Tooltip>
            </div>
            <Table dataSource={KitData} columns={KitdatColumns} className=" px-5" />
        </main>
    );
};

export default JoiningKitOfEmpForAdmin;
