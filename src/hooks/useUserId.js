import { useSelector } from "react-redux";

const useUserId = ()=>{
    return useSelector(
        (state)=>state?.customers?.details?.data?.user?._id  ?? ""
    ) ;
}
export default useUserId