import React, { useEffect, useRef, memo, useMemo } from "react";
import { useSelector } from "react-redux";

const Message = memo(({ msg }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Memoize computed values
  const isOwnMessage = useMemo(
    () => authUser?._id === msg.senderId,
    [authUser?._id, msg.senderId]
  );

  const profilePhoto = useMemo(
    () => (isOwnMessage ? authUser?.profilePhoto : selectedUser?.profilePhoto),
    [isOwnMessage, authUser?.profilePhoto, selectedUser?.profilePhoto]
  );

  const chatClass = useMemo(
    () => `chat ${isOwnMessage ? "chat-end" : "chat-start"}`,
    [isOwnMessage]
  );

  const bubbleClass = useMemo(
    () => `chat-bubble ${isOwnMessage ? "bg-gray-200 text-black" : ""}`,
    [isOwnMessage]
  );

  return (
    <div ref={scroll} className={chatClass}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePhoto} />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50 text-white">{msg.createdAt}</time>
      </div>
      <div className={bubbleClass}>{msg.message}</div>
    </div>
  );
});

export default Message;
