import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { USER_END_POINT } from "../../utils/constant.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();

  const OnChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(user);
    try {
      const res = await axios.post(`${USER_END_POINT}/register`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(res);
      if (res.data.success) {
        toast.success("User registered successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <form
        className="backdrop-blur-xl bg-white/3 border border-white/30 rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-md md:w-5xl flex flex-col gap-3 md:gap-4"
        onSubmit={onSubmitHandler}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-1 drop-shadow-lg">
          Sign Up
        </h2>
        <div className="flex flex-col gap-1">
          <label className="text-white font-medium text-sm">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={OnChangeHandler}
            className="input w-full input-bordered input-primary bg-white/40 text-black placeholder:text-white/80 text-sm py-2 px-3"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-white font-medium text-sm">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={OnChangeHandler}
            className="input w-full input-bordered input-primary bg-white/40 text-black placeholder:text-white/80 text-sm py-2 px-3"
            placeholder="Choose a username"
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
            placeholder="Enter password"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-white font-medium text-sm">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={OnChangeHandler}
            className="input input-bordered w-full input-primary bg-white/40 text-black placeholder:text-white/80 text-sm py-2 px-3"
            placeholder="Re-enter password"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-white font-medium mb-1 text-sm">Gender</label>
          <div className="flex gap-6 md:gap-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={user.gender === "male"}
                onChange={OnChangeHandler}
                className="radio radio-primary scale-75"
              />
              <span className="text-white text-sm">Male</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={user.gender === "female"}
                onChange={OnChangeHandler}
                className="radio radio-primary scale-75"
              />
              <span className="text-white text-sm">Female</span>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full mt-2 shadow-md text-sm py-2 font-semibold"
        >
          Sign Up
        </button>
        <div className="text-center mt-1">
          <span className="text-white text-sm">Already have an account? </span>
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline text-sm"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
