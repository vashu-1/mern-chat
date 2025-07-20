import React, { useEffect } from "react";
import axios from "axios";
import { USER_END_POINT } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice.js";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");

        // Don't make request if no token available
        if (!token) {
          console.log("No auth token available, skipping fetchOtherUsers");
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
        // console.log(res.data);
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.log(
          "Error fetching other users:",
          error.response?.data?.message || error.message
        );
      }
    };
    fetchOtherUsers();
  }, [dispatch]);
};

export default useGetOtherUsers;
