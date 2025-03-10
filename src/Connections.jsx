import React, { useEffect } from "react";
import { BASE_URL } from "./utils/Constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "./utils/connectionSlice";
const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (connections.length === 0)
    return <div className="text-center m-10">No Connections</div>;
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-black text-3xl">Connections</h1>
      {connections.map((connection) => {
        const {_id, firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div key={_id} className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + " " + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
