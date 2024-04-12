import { useQuery } from "@tanstack/react-query";
import { getWorkHistory as workHistoryApi } from "../../services/workhistoryApi";

const useGetWorkHistory = (userId) => {
  const { data, isPending } = useQuery({
    queryFn: () => workHistoryApi(userId),
    queryKey: ["getholiday", userId],
  });

  return { data, isPending };
};
export default useGetWorkHistory;
