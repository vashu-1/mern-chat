import React, { memo, useMemo } from "react";
import Message from "./Message.jsx";
import { useSelector } from "react-redux";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage.jsx";
import useGetMessages from "../hooks/useGetMessages.jsx";

const Messages = memo(() => {
  useGetMessages();
  useGetRealTimeMessage();

  const { message } = useSelector((store) => store.message);

  // Debug: Log the messages to console
  console.log("Messages component - message state:", message);
  console.log(
    "Messages component - message length:",
    Array.isArray(message) ? message.length : "Not array"
  );

  // Memoize message list to prevent unnecessary re-renders
  const messageList = useMemo(() => {
    if (!Array.isArray(message) || message.length === 0) return null;
    return message.map((msg) => <Message key={msg._id} msg={msg} />);
  }, [message]);

  // Early return if no messages
  if (!Array.isArray(message) || message.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        No messages yet. Start the conversation!
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto overflow-x-hidden messages-list-scroll">
      <div className="px-2 md:px-4 py-2 space-y-2">{messageList}</div>
    </div>
  );
});

export default Messages;
