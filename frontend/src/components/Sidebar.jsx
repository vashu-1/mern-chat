import React, { useState, useEffect, useMemo, useCallback } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from "./OtherUsers.jsx";
import toast from "react-hot-toast";
import { USER_END_POINT } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers } from "../redux/userSlice.js";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const [allUsers, setAllUsers] = useState([]); // Store original list of users
  const { otherUsers } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Store the original users list when otherUsers changes
  useEffect(() => {
    if (otherUsers && otherUsers.length > 0 && allUsers.length === 0) {
      setAllUsers(otherUsers);
    }
  }, [otherUsers, allUsers.length]);

  // Optimized filtered users with useMemo to prevent unnecessary recalculations
  const filteredUsers = useMemo(() => {
    if (search.trim() === "") {
      return allUsers;
    }
    return allUsers.filter((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, allUsers]);

  // Update otherUsers only when filteredUsers actually changes
  useEffect(() => {
    dispatch(setOtherUsers(filteredUsers));
  }, [filteredUsers, dispatch]);

  const logoutHandler = useCallback(async () => {
    try {
      const token = localStorage.getItem("authToken");
      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await axios.post(
        `${USER_END_POINT}/logout`,
        {},
        {
          headers,
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        // Clear token and user data from localStorage
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
        navigate("/login");
      }
      dispatch(setAuthUser(null));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message || "Logout failed");
      // Clear token and user data even if logout request fails
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    }
  }, [navigate, dispatch]);

  const searchSubmitHandler = useCallback((e) => {
    e.preventDefault();
    // No need for manual search logic since useMemo handles it automatically
  }, []);

  return (
    <div className="flex w-full md:w-2/5 flex-col h-full">
      <form
        onSubmit={searchSubmitHandler}
        action=""
        className="flex items-center w-full gap-1 md:gap-2 mt-2 ml-1 md:ml-2 p-1 md:p-2"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="input w-full input-bordered rounded-md bg-zinc-200 text-black placeholder:text-gray-600 border-none focus:bg-white text-sm md:text-base px-2 md:px-3 py-2"
          placeholder="Search..."
        />
        <button
          type="submit"
          className="btn bg-blue-600 text-white border-none hover:bg-blue-700 min-h-0 h-10 px-2 md:px-3"
        >
          <BiSearchAlt2 className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </form>
      <div className="flex-1 overflow-y-auto">
        <OtherUsers />
      </div>
      <div className="mt-auto">
        <button
          onClick={logoutHandler}
          className="btn bg-blue-600 text-white m-1 md:m-2 border-none hover:bg-blue-700 w-full mx-1 md:mx-2 text-sm md:text-base py-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
