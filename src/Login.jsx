import React, { useState } from "react";
import axios from "axios";
import { addUser } from "./utils/userSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "./utils/Constants";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [emailId, setEmailId] = useState("bhawna123@gmail.com");
  const [password, setPassword] = useState("Bhawna@1234");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
     // console.log(response.data);
      dispatch(addUser(response.data));
      return navigate("/");
    } catch (error) {
      setError(error.response.data || "Something went wrong");
     // console.log(error);
    }
  };
  return (
    <div className="flex   justify-center  items-center">
      <div className="card bg-base-500 w-96 shadow-2xl">
        <div className="card-body ">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs ">
              <div className="label">
                <span className="label-text ">Email</span>
              </div>
              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full max-w-xs my-2"
                onChange={(e) => {
                  setEmailId(e.target.value);
                }}
              />
            </label>
            <label className="form-control w-full max-w-xs ">
              <div className="label">
                <span className="label-text ">Password</span>
              </div>
              <input
                type="text"
                value={password}
                className="input input-bordered w-full max-w-xs my-2"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
          </div>
          <p className="text-red-600">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
