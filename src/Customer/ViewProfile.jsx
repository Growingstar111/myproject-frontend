import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { viewUSer } from "../Endpoints/endpoints";
import moment from "moment-timezone";
import CustomerHeder from "./CustomerHeder";
const ViewProfile = () => {
  const { id } = useParams();
  const [time, setTime] = useState(moment.tz.names());
  const [selectedTime, setSelectedTime] = useState("");
  console.log("ttttt", time);

  const { data, isLoading  } = useQuery({
    queryKey: "view-user",
    queryFn: async () => {
      const res = await viewUSer(id);
      console.log(data);

      return res.data;
    },
  });


  console.log(">>>>>>>>>>>>>>", selectedTime);

  return (
 <>
      <CustomerHeder />

    <div>
      My Profile
      <h2>
        <span>Name: </span>
        {data?.data?.name}
      </h2>
      <h2>
        <span>Contact Number: </span>
        {data?.data?.phone}
      </h2>
      <h2>
        <span>Email:</span> {data?.data?.email}
      </h2>
      <h2>
        <span>Profile is:</span>{" "}
        {data?.data?.profileCompleted == true ? "Compelete" : "Not Complete"}
      </h2>
      <h2>
        <span> Account is created at :</span>{" "}
        {moment(data?.data?.createdAt).format("MM-DD-YYYY h:mm a")}
      </h2>
      <input type="date" max={new Date()} />
      <hr />
<br /><br />
      selected Time : {selectedTime} <br /><br />
      <select  onChange={(e)=>
        {
console.log(e.target.value);

          setSelectedTime(e.target.value)
        }
        }>
        {time?.map((item) => {
          return (
            <>
              <option value="">{item}</option>
            </>
          );
        })}
      </select>
    </div>
 
 </>
  );
};

export default ViewProfile;
