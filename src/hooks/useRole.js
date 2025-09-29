import { useSelector } from "react-redux";

const useRole = () => {
  return useSelector(
    (state) => state.customers?.details?.data?.user?.role ?? ""
  );
};

export default useRole;
