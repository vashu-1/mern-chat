import React, { useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { USER_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from "../redux/userSlice.js";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  const { authUser, otherUsers } = useSelector((store) => store.user);
  const hasFetchedRef = useRef(false);
  const lastFetchTimeRef = useRef(0);
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

      // Allow refetching every 30 seconds or if no users exist
      const now = Date.now();
      const timeSinceLastFetch = now - lastFetchTimeRef.current;
      const shouldRefetch =
        !hasFetchedRef.current ||
        !otherUsersRef.current ||
        otherUsersRef.current.length === 0 ||
        timeSinceLastFetch > 30000; // 30 seconds

      if (!shouldRefetch) {
        console.log("Recent fetch detected, skipping refetch");
        return;
      }

      hasFetchedRef.current = true;
      lastFetchTimeRef.current = now;

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
