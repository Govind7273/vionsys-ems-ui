import { useMutation } from "@tanstack/react-query";
import { getExcelData as getExcelDataApi } from "../../services/attendanceApi";
import toast from "react-hot-toast";

const useGetExcel = () => {
  const {
    data,
    mutate: getExcel,
    isPending,
  } = useMutation({
    mutationKey: "getexceldata",
    mutationFn: ({ Format_startDate, Format_endDate }) =>
      getExcelDataApi( Format_startDate, Format_endDate ),
    onError: (error) => {
      toast.error(error.response.data.error);
    },
    onSuccess: (res) => {
      console.log(res);
    },
  });

  return {
    data,
    getExcel,
    isPending,
  };
};

export default useGetExcel;
