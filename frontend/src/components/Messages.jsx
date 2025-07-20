import React from "react";
import Message from "./Message.jsx";
// import useGetMessages from "../hooks/useGetMessages.jsx";
import { useSelector } from "react-redux";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage.jsx";
import useGetMessages from "../hooks/useGetMessages.jsx";

const Messages = () => {
  useGetMessages();
  useGetRealTimeMessage();
  const { message } = useSelector((store) => store.message);
  if (!message) return; // early return in react
  return (
    <div className="px-4 flex-1 overflow-auto">
      {message && message?.map((msg) => <Message key={msg._id} msg={msg} />)}
    </div>
  );
};

export default Messages;
