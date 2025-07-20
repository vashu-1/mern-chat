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
    <div className="flex items-center justify-center min-h-screen">
      <form
        className="backdrop-blur-xl bg-white/3 border border-white/30 rounded-2xl shadow-2xl p-10 w-3xl max-w-xl flex flex-col gap-8"
        onSubmit={OnSubmitHandler}
      >
        <h2 className="text-3xl font-bold text-center text-white mb-2 drop-shadow-lg">
          Login
        </h2>
        <div className="flex flex-col gap-2">
          <label className="text-white font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={OnChangeHandler}
            className="input w-full input-bordered input-primary bg-white/40 text-black placeholder:text-white/80"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={OnChangeHandler}
            className="input w-full input-bordered input-primary bg-white/40 text-black placeholder:text-white/80"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-full mt-2 shadow-md">
          Login
        </button>
        <div className="text-center mt-2">
          <span className="text-white">Don't have an account? </span>
          <Link
            to="/register"
            className="text-primary font-semibold hover:underline"
          >
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
