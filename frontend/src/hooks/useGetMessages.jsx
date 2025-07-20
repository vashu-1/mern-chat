import React, { useEffect } from "react";
import axios from "axios";
import { MESSAGE_END_POINT } from "../../utils/constant";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice.js";

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!selectedUser?._id) return;
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${MESSAGE_END_POINT}/${selectedUser._id}`,
          {
            withCredentials: true,
          }
        );
        // console.log(res);
        dispatch(setMessages(res.data));
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMessages();
  }, [selectedUser]);
};

export default useGetMessages;
