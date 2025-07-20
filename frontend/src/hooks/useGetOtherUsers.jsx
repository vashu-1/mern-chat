import React, { useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { USER_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from "../redux/userSlice.js";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  const { authUser, otherUsers } = useSelector((store) => store.user);
  const hasFetchedRef = useRef(false);
  const otherUsersRef = useRef(otherUsers);

  // Update ref when otherUsers changes
  useEffect(() => {
    otherUsersRef.current = otherUsers;
  }, [otherUsers]);

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

      // Don't fetch if we already have users or have already fetched (avoid redundant calls)
      if (
        (otherUsersRef.current && otherUsersRef.current.length > 0) ||
        hasFetchedRef.current
      ) {
        console.log("Other users already loaded, skipping fetch");
        return;
      }

      hasFetchedRef.current = true;

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
      hasFetchedRef.current = false; // Reset on error so we can retry
    }
  }, [authUser, dispatch]);

  useEffect(() => {
    fetchOtherUsers();
  }, [fetchOtherUsers]);
};

export default useGetOtherUsers;
