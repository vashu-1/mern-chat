import React from "react";
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
import { MESSAGE_END_POINT } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice.js";

const SendInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { message: messages } = useSelector((store) => store.message);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // alert(message);
    try {
      const res = await axios.post(
        `${MESSAGE_END_POINT}/send/${selectedUser?._id}`,
        { message },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log(res);

      const safeMessages = Array.isArray(messages) ? messages : [];
      dispatch(setMessages([...safeMessages, res.data.newMessage]));
      setMessage("");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form onSubmit={onSubmitHandler} className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
};

export default SendInput;
