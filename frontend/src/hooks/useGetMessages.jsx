import React, { useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { MESSAGE_END_POINT } from "../../utils/constant";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice.js";

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const { message } = useSelector((store) => store.message);
  const dispatch = useDispatch();
  const lastSelectedUserId = useRef(null);

  const fetchMessages = useCallback(async () => {
    if (!selectedUser?._id) return;

    // Avoid fetching if same user is selected and messages already exist
    if (
      lastSelectedUserId.current === selectedUser._id &&
      message &&
      message.length > 0
    ) {
      console.log("Messages already loaded for this user, skipping fetch");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.log("No auth token available, skipping fetchMessages");
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      console.log(`Fetching messages for user: ${selectedUser._id}`);

      const res = await axios.get(`${MESSAGE_END_POINT}/${selectedUser._id}`, {
        headers,
        withCredentials: true,
      });

      dispatch(setMessages(res.data));
      lastSelectedUserId.current = selectedUser._id;
    } catch (error) {
      console.log("Error fetching messages:", error.message);
    }
  }, [selectedUser, message, dispatch]);

  useEffect(() => {
    // Clear messages when user changes to avoid showing old messages
    if (selectedUser?._id !== lastSelectedUserId.current) {
      dispatch(setMessages([]));
    }

    fetchMessages();
  }, [selectedUser, fetchMessages, dispatch]);
};

export default useGetMessages;
