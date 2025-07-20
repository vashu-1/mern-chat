import React, { memo, useMemo } from "react";
import Message from "./Message.jsx";
import { useSelector } from "react-redux";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage.jsx";
import useGetMessages from "../hooks/useGetMessages.jsx";

const Messages = memo(() => {
  useGetMessages();
  useGetRealTimeMessage();

  const { message } = useSelector((store) => store.message);

  // Memoize message list to prevent unnecessary re-renders
  const messageList = useMemo(() => {
    if (!message) return null;
    return message?.map((msg) => <Message key={msg._id} msg={msg} />);
  }, [message]);

  // Early return if no messages
  if (!message) return null;

  return <div className="px-4 flex-1 overflow-auto">{messageList}</div>;
});

export default Messages;
