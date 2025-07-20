import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from "./OtherUsers.jsx";
import toast from "react-hot-toast";
import { USER_END_POINT } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
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

  // Filter users based on search input
  useEffect(() => {
    if (search.trim() === "") {
      // If search is empty, show all users
      if (allUsers.length > 0) {
        dispatch(setOtherUsers(allUsers));
      }
    } else {
      // Filter users based on search
      const filteredUsers = allUsers.filter((user) =>
        user.fullName.toLowerCase().includes(search.toLowerCase())
      );
      dispatch(setOtherUsers(filteredUsers));
    }
  }, [search, allUsers, dispatch]);

  const logoutHandler = async () => {
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
        // Clear token from localStorage
        localStorage.removeItem("authToken");
        navigate("/login");
      }
      dispatch(setAuthUser(null));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message || "Logout failed");
      // Clear token even if logout request fails
      localStorage.removeItem("authToken");
    }
  };

  const searchSubmitHandler = async (e) => {
    e.preventDefault();
    // No need for manual search logic since useEffect handles it automatically
  };

  return (
    <div className="flex w-2/5 flex-col h-full">
      <form
        onSubmit={searchSubmitHandler}
        action=""
        className="flex items-center w-full gap-2 mt-2 ml-2 p-2"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="input w-full input-bordered rounded-md bg-zinc-200 text-black placeholder:text-gray-600 border-none focus:bg-white"
          placeholder="Search..."
        />
        <button
          type="submit"
          className="btn bg-blue-600 text-white border-none hover:bg-blue-700"
        >
          <BiSearchAlt2 size="24px" />
        </button>
      </form>
      <div className="flex-1 overflow-y-auto">
        <OtherUsers />
      </div>
      <div className="mt-auto">
        <button
          onClick={logoutHandler}
          className="btn bg-blue-600 text-white m-2 border-none hover:bg-blue-700 w-full mx-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
