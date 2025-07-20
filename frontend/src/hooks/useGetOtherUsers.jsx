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
        const headers = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const res = await axios.get(`${USER_END_POINT}/`, {
          headers,
          withCredentials: true,
        });
        // console.log(res.data);
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
      }
    };
    fetchOtherUsers();
  }, [dispatch]);
};

export default useGetOtherUsers;
