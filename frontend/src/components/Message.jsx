import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ msg }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <div
      ref={scroll}
      className={`chat ${
        authUser?._id === msg.senderId ? "chat-end" : "chat-start"
      }`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={
              msg.senderId === authUser?._id
                ? authUser?.profilePhoto
                : selectedUser?.profilePhoto
            }
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50 text-white">{msg.createdAt}</time>
      </div>
      <div
        className={`chat-bubble ${
          authUser?._id === msg.senderId ? "bg-gray-200 text-black" : ""
        }`}
      >
        {msg.message}
      </div>
    </div>
  );
};

export default Message;
