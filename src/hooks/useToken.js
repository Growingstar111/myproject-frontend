import { useSelector } from "react-redux";

const useToken = () => {
  return useSelector((state) => state.customers?.details?.data?.token ?? "");
};

export default useToken;
