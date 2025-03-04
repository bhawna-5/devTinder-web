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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
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
  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/signup",
        {
          emailId,
          password,
          firstName,
          lastName,
        },
        { withCredentials: true }
      );
      // console.log(response.data);
      dispatch(addUser(response.data.data));
      return navigate("/profile");
    } catch (error) {
      setError(error.response.data || "Something went wrong");
      console.log(error);
    }
  };
  return (
    <div className="flex   justify-center  items-center">
      <div className="card bg-base-500 w-96 shadow-2xl">
        <div className="card-body ">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "SignUp"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                <label className="form-control w-full max-w-xs ">
                  <div className="label">
                    <span className="label-text ">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs my-2"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </label>
                <label className="form-control w-full max-w-xs ">
                  <div className="label">
                    <span className="label-text ">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs my-2"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </label>
              </>
            )}
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
                type="password"
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
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "SignUp"}
            </button>
          </div>
          <p
            className="m-auto cursor-pointer py-2 font-semibold"
            onClick={() => setIsLoginForm(!isLoginForm)}
          >
            {isLoginForm
              ? "Don't have any account? Signup here"
              : "Already have an account?Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
