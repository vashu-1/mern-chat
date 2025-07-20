import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { USER_END_POINT } from "../../utils/constant.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice.js";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const OnChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const OnSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${USER_END_POINT}/login`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Login successful");

        // Store token in localStorage for Authorization header
        if (res.data.token) {
          localStorage.setItem("authToken", res.data.token);
        }

        dispatch(setAuthUser(res.data.user));
        navigate("/home");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <form
        className="backdrop-blur-xl bg-white/3 border border-white/30 rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-md md:w-3xl lg:w-4xl flex flex-col gap-3 md:gap-4"
        onSubmit={OnSubmitHandler}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-2 drop-shadow-lg">
          Login
        </h2>
        <div className="flex flex-col gap-1">
          <label className="text-white font-medium text-sm">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={OnChangeHandler}
            className="input w-full input-bordered input-primary bg-white/40 text-black placeholder:text-white/80 text-sm py-2 px-3"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-white font-medium text-sm">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={OnChangeHandler}
            className="input w-full input-bordered input-primary bg-white/40 text-black placeholder:text-white/80 text-sm py-2 px-3"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full mt-2 shadow-md text-sm py-2 font-semibold"
        >
          Login
        </button>
        <div className="text-center mt-2">
          <span className="text-white text-sm">Don't have an account? </span>
          <Link
            to="/register"
            className="text-primary font-semibold hover:underline text-sm"
          >
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
