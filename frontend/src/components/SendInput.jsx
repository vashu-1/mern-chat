import React, { useState, useCallback, memo } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { MESSAGE_END_POINT } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice.js";

const SendInput = memo(() => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { message: messages } = useSelector((store) => store.message);

  // Memoize the submit handler to prevent re-creation on each render
  const onSubmitHandler = useCallback(
    async (e) => {
      e.preventDefault();

      // Early return if no message
      if (!message.trim()) return;

      try {
        const token = localStorage.getItem("authToken");
        const headers = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const res = await axios.post(
          `${MESSAGE_END_POINT}/send/${selectedUser?._id}`,
          { message },
          {
            headers,
            withCredentials: true,
          }
        );

        const safeMessages = Array.isArray(messages) ? messages : [];
        dispatch(setMessages([...safeMessages, res.data.newMessage]));
        setMessage("");
      } catch (error) {
        console.log(error.message);
      }
    },
    [message, selectedUser?._id, messages, dispatch]
  );

  // Memoize the input change handler
  const handleInputChange = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  return (
    <form onSubmit={onSubmitHandler} className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="send a message..."
          className="border text-sm p-3 border-zinc-500 rounded-lg block w-full bg-gray-600 text-white"
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 items-center flex pr-4"
        >
          <IoSend />
        </button>
      </div>
    </form>
  );
});

export default SendInput;
