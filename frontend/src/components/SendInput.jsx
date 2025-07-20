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
    <form
      onSubmit={onSubmitHandler}
      className="px-2 md:px-4 py-2 bg-inherit border-t border-gray-600"
    >
      <div className="w-full relative">
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="send a message..."
          className="border text-xs md:text-sm p-2 md:p-3 pr-10 md:pr-12 border-zinc-500 rounded-lg block w-full bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 items-center flex pr-2 md:pr-4 text-gray-300 hover:text-white transition-colors duration-200"
        >
          <IoSend className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>
    </form>
  );
});

export default SendInput;
