import React, { useEffect, useCallback } from "react";
import axios from "axios";
import { USER_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from "../redux/userSlice.js";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  const { authUser, otherUsers } = useSelector((store) => store.user);

  const fetchOtherUsers = useCallback(async () => {
    try {
      const token = localStorage.getItem("authToken");

      // Don't make request if no token available or no authenticated user
      if (!token || !authUser) {
        console.log(
          "No auth token or user available, skipping fetchOtherUsers"
        );
        return;
      }

      // Don't fetch if we already have users (avoid redundant calls)
      if (otherUsers && otherUsers.length > 0) {
        console.log("Other users already loaded, skipping fetch");
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      console.log("Fetching other users with token");

      const res = await axios.get(`${USER_END_POINT}/`, {
        headers,
        withCredentials: true,
      });

      dispatch(setOtherUsers(res.data));
    } catch (error) {
      console.log(
        "Error fetching other users:",
        error.response?.data?.message || error.message
      );
    }
  }, [authUser, otherUsers, dispatch]);

  useEffect(() => {
    fetchOtherUsers();
  }, [fetchOtherUsers]);
};

export default useGetOtherUsers;
