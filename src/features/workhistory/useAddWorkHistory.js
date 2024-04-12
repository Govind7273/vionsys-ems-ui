import { addWorkHistory as addWorkHistoryApi } from "../../services/workhistoryApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddWorkHistory = () => {
  const query = useQueryClient();
  const { mutate: addwork, isPending: CreatePending } = useMutation({
    mutationFn: (data) => addWorkHistoryApi(data),
    onSuccess: () => {
      query.invalidateQueries(["getworkhistory"]);
      toast.success("");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error);
    },
  });
  return { addwork, CreatePending };
};

export default useAddWorkHistory;
