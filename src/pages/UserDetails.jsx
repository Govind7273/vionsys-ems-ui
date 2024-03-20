import { useNavigate, useParams } from "react-router-dom";
import useGetCurrentUser from "../features/users/useGetCurrentUser";
import { HiTrash, HiPencil } from "react-icons/hi";
import { LoaderIcon } from "react-hot-toast";
import { Button, Modal } from "antd";
import { useState } from "react";
import { useDeleteUser } from "../features/users/useDeleteUser";

const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate()
  const { user, isPending } = useGetCurrentUser(userId);
  const userData = user?.data?.user;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {deleteUser, isPending: deleteLoading} = useDeleteUser();
  
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    deleteUser(userId);
    navigate('/employees')
  }

  return (
    <div className="p-4 flex justify-center items-center">
      {isPending && <LoaderIcon />}
      <Modal title="Delete User" open={isModalOpen} footer={<>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button type="primary" className="bg-blue-400 text-slate-50" disabled={deleteLoading} onClick={handleDelete}>Delete</Button>
      </>} onCancel={handleCancel}>
        <div className="flex flex-col gap-4 justify-center items-center p-3">
        <HiTrash className="text-red-400" size={40} />
        <h2 className="text-lg"> Do you really want to delete these records? This process cannot be undone. </h2>
        </div>
      </Modal>
      <div className="relative flex flex-col gap-4 bg-slate-50 p-4 w-full justify-center items-center">
        <div className="absolute top-4 right-4 flex gap-2">
            <Button className="text-red-500" onClick={showModal}><HiTrash/></Button>
            <Button className="text-blue-400"><HiPencil/></Button>
        </div>
        <div className="text-center">
          <img
            className="w-52 h-52 rounded-full object-cover shadow-md"
            src={userData?.profile}
            alt="../assets/illustration-businessman_53876-5856.jpg"
          />
          <p className="text-xl mt-4">
            {" "}
            {`${userData?.firstName} ${userData?.lastName}`}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <p className="text-lg">
            <span className="text-slate-400 block">Email : </span>
            {`${userData?.email}`}
          </p>
          <p className="text-lg">
            <span className="text-slate-400 block">Employee Id : </span>
            {`${userData?.employeeId}`}
          </p>
          <p className="text-lg">
            <span className="text-slate-400 block">Reporting Manager :</span>{" "}
            {`${userData?.reportingManager} `}
          </p>
          <p className="text-lg">
            <span className="text-slate-400 block">Team Lead : </span>
            {`${userData?.teamLead}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
