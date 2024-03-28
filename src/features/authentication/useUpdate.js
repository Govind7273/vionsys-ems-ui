import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser as  UpdateUserApi} from "../../services/usersApi";
import { useNavigate } from "react-router-dom";

const useUpdate = () => {
  const queryClient = useQueryClient();
  const navigate=useNavigate();
  const { mutate: update, isPending } = useMutation({
    mutationFn: (values)=>UpdateUserApi(values),
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ["users"],
        });
      toast.success("User updated successfully");
      navigate(`/employees`);
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
  return {
    update,
    isPending,
  };
};

export default useUpdate;
