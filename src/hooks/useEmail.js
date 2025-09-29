import { useSelector } from "react-redux";

const useEmail = () => {
  return useSelector(
    (state) => state.customers?.details?.data?.user?.email ?? ""
  );
};

export default useEmail;
