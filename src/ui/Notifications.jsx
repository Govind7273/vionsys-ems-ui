import { Avatar, Button, Card, List, Skeleton } from "antd";
import {useState } from "react";
import useGetNotification from "../features/notification/useGetNotification";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import NotificationForm from "./NotificationForm";
import useDeleteNotification from "../features/notification/useDeleteNotification";



const Notifications = () => {
  const [open, setOpen] = useState(false);
  const { data, isPending } = useGetNotification();
  const dataArray = data ? [...Object.values(data.notifications)] : [];
  const {deletes}=useDeleteNotification();
   const handleDelete=(id)=>{
     deletes(id);
   }


  return (
    <Card>
      <div className="flex justify-between items-center border-b pb-2">
        <h1 className="text-xl">Notifications</h1>
        <Button type="default" onClick={() => setOpen(!open)}>Create</Button> 
      </div>
      <List
        className="overflow-scroll max-h-80 px-1"
        itemLayout="horizontal"
        dataSource={dataArray}
        renderItem={(item, index) => (
          <List.Item className="gap-8">
            <Skeleton avatar title={false} active loading={isPending}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                }
                title={<a href="https://ant.design" className="capitalize">{item.title}</a>}
                description={item.description}

              />
              <div className="flex absolute right-0 text-sm gap-2 ">
               <Link onClick={()=>handleDelete(item._id)} ><AiOutlineDelete className="text-sm cursor-pointer text-red-600" /></Link>
              </div>
              <div className="text-[#999] relative -mb-10">~{item.username}</div>
            </Skeleton>
          </List.Item>
        )}
      />
       {/* Create Notification Modal */}
      <NotificationForm   showModal={setOpen} isShowModal={open} />
    </Card>
  );
};

export default Notifications;
